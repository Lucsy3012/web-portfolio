<template>
  <div class="container">
    <section class="animate--js in">
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <!-- Headline -->
            <div class="headline tb5 tb6-m tb7-xl --site-color text--center simulate-offset-33">
              <span class="secondary">{{ t.title }}</span>
              <h1 class="primary">
                {{ t.title }}
              </h1>
            </div>

            <!-- Background Object Animation -->
            <ThreejsTriangle
              class="background behind-headline"
              colorMaterial="#95EBFE"
              colorLight="#F3FCFF"
              :orbitControls="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Projects filter -->
    <section id="filter" class="pt0 animate--js in">
      <div class="inner">
        <div class="row">
          <div class="col col-12 text--center">
            <ul class="filter-btn--holder m">
              <li
                v-for="(service, index) in servicesPrepared"
                :key="`${index}-${slugify(service.name)}`"
                class="filter-btn"
                :class="{ 'filter-btn--active': propertyExists(filter, service.type, service.name)}"
                @click="updateFilters(service.name, service.type)"
              >
                {{ service.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <div id="projects">
      <template v-for="project in projects">
        <ProjectBanner
          :key="project.fields.slug"
          :class="{ 'hidden': !project.visible }"
          :slug="project.fields.slug"
          :title="project.fields.title"
          :subline="project.fields.subline"
          :img="project.fields.mainImage"
          :video="project.fields.mainVideo"
          :releaseDate="project.fields.releaseDate"
          :headlinePosition="project.fields.headlinePosition"
          :accentColor="project.fields.accentColor"
        />
      </template>

      <!-- Empty State -->
      <section v-if="!projectsVisible" ref="empty-state" class="animate--js">
        <div class="inner">
          <div class="row justify-content--center">
            <div class="col col-10 col-s-8 col-m-5 mb0 mb4-m text--center">
              <h2 class="tf3 tf4-s tf5-xl --site-color animate headlineAppearFromBottom pt2">
                {{ t.emptyState.title }}
              </h2>
              <p class="mt1 mt2-m --site-color-66 animate appearFromBottomTransform">
                {{ t.emptyState.description }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import services from '~/assets/js/services'

export default {
  name: 'ProjectsIndex',
  asyncData({ route, i18n, $contentfulClient }) {
    const filter = route.query;

    let apiParams = {
      content_type: 'project',
      order: '-fields.releaseDate',
      select: 'fields,sys.id,sys.createdAt',
      limit: 100,
      locale: i18n.locale
    }

    // Add tags if exist in the URL
    /*
    if (!!route.query.tools) {
      apiParams['fields.tools[all]'] = route.query.tools
    }
    if (!!route.query.technologies) {
      apiParams['fields.technologies[all]'] = route.query.technologies
    }
    if (!!route.query.responsibilities) {
      apiParams['fields.responsibilities[all]'] = route.query.responsibilities
    }
     */

    return $contentfulClient.getEntries(apiParams)
      .then(entries => {

        entries.items.forEach(entry => {
          entry.visible = true

          if (Object.keys(filter).length > 0) {
            for (const [prop, value] of Object.entries(filter)) {
              const field = entry.fields?.[prop]

              if (!!field) {
                entry.visible = entry.fields?.[prop].includes(value)
              } else {
                entry.visible = false
              }
            }
          }
        })

        // Get if any project is visible
        const entriesCheckArray = entries.items.map(entry => entry.visible);
        const projectsVisible = entriesCheckArray.includes(true)

        return {
          filter,
          projectsVisible,
          projects: entries.items,
        }
      })
      .catch(e => console.error(e))
  },
  data() {
    return {
      filter: {},
      projectsVisible: true,
      projects: []
    }
  },
  head() {
    return {
      title: this.t.title,
      meta: [

        // Meta
        { hid: 'description', name: 'description', content: this.t.seoDescription },
        { hid: 'image', itemprop: 'image', content: this.t.seoImage },

        // Open Graph
        { hid: 'og:description', property: 'og:description', content: this.t.seoDescription },
        { hid: 'og:image', property: 'og:image', content: this.t.seoImage },

        // Twitter
        { hid: 'twitter:description', name: 'twitter:description', content: this.t.seoDescription },
        { hid: 'twitter:image', name: 'twitter:image', content: this.t.seoImage }
      ],
      link: [
        { hid: 'favicon', rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon-cyan.ico' },
        { hid: 'favicon-apple', rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-cyan.ico' },
        { hid: 'favicon-32x32', rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32-cyan.ico' },
        { hid: 'favicon-16x16', rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16-cyan.ico' }
      ]
    }
  },
  computed: {
    t() {
      return this.$t('projects')
    },
    services() {
      return services
    },
    servicesPrepared() {
      let filtered = []

      for (let i = 0; i < this.services.length; i++) {
        for (let j = 0; j < this.services[i].services.length; j++) {
          filtered.push({
            name: this.services[i].services[j],
            type: this.services[i].type
          })
        }
      }

      const jsonObject = filtered.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

      return uniqueArray
    },
  },
  watch: {
    projectsVisible(newVal, oldVal) {
      if (newVal === false) {
        this.$nextTick(() => {
          this.$refs["empty-state"].classList.add('in')
        })
      }
    }
  },
  watchQuery: ['filter'],
  methods: {
    updateFilters(filterName, type) {
      this.$router.push({ query: { [type]: filterName } })

      // Determine if project has filtered property & value
      if (type && filterName) {
        this.projectsVisible = true
        this.projects.forEach(project => {
          const field = project.fields?.[type]

          if (!!field) {
            project.visible = project.fields?.[type].includes(filterName)
          } else {
            project.visible = false
          }
        })

        // Get if any project is visible
        const entriesCheckArray = this.projects.map(project => project.visible);
        this.projectsVisible = entriesCheckArray.includes(true)
      }
    },
    slugify(str) {
      return this.$slugify(str)
    },
    propertyExists(obj, prop, value) {
      return obj?.[prop] === value
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "@/assets/less/global";

.headline {
  position: relative;
  z-index: 1;
}
.behind-headline {
  position: absolute;
  inset: 0;
  z-index: 0;
}

#projects {
  img {
    width: 100%;
    display: block;
  }
}

.hidden {
  visibility: hidden;
  opacity: 0;
  height: 0;
  padding: 0;
  max-height: 0;
}
</style>
