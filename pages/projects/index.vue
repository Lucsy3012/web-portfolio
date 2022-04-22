<template>
  <div class="container">
    <section class="animate--js in">
      <div class="inner">
        <div class="row">
          <div class="col col-12">

            <!-- Headline -->
            <div class="headline tb5 tb6-m tb7-xl --site-color text--center simulate-offset-33">
              <span class="secondary">{{ t.title }}</span>
              <h1 class="primary">{{ t.title }}</h1>
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

    <!-- Projects -->
    <div id="projects">
      <template v-for="project in projects">
        <ProjectBanner
          :slug="project.fields.slug"
          :title="project.fields.title"
          :subline="project.fields.subline"
          :img="project.fields.mainImage"
          :video="project.fields.mainVideo"
          :releaseDate="project.fields.releaseDate"
          :headlinePosition="project.fields.headlinePosition"
          :accentColor="project.fields.accentColor"
          :key="project.fields.slug"
        />
      </template>
    </div>
  </div>
</template>

<script>
import client from '~/plugins/contentful'

export default {
  data() {
    return {
      projects: [],
    }
  },
  asyncData({ i18n }) {
    return client.getEntries({
      content_type: 'project',
      order: '-fields.releaseDate',
      limit: 6,
      locale: i18n.locale
    })
      .then(entries => {
        return {
          projects: entries.items
        }
      })
      .catch(e => console.error(e))
  },
  computed: {
    t() {
      return this.$t('projects')
    }
  },
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
</style>
