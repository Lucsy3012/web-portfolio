<template>
  <div class="container">
    <section class="animate--js in">
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <div class="headline tb5 tb6-m tb7-xl --site-color text--center simulate-offset-33">
              <span class="secondary">{{ t.title }}</span>
              <h1 class="primary">{{ t.title }}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <div id="projects">
      <section
        v-for="project in projects"
        class="dynamic-bg--container p0 animate--js"
        :class="`headline-position--${project.fields.headlinePosition.toLowerCase()}`"
        :key="project.fields.slug"
      >
        <div class="inner">
          <div class="row dynamic-bg--offset--33">
            <div class="col col-12 headline--container">
              <NuxtLink :to="{ name: 'projects-slug', params: { slug: project.fields.slug }}">
                <div class="headline tb5 tb6-m tb7-xl">
                  <span class="secondary">{{ project.fields.title }}</span>
                  <h2 class="primary">{{ project.fields.title }}</h2>
                  <h3 class="tertiary" v-if="project.fields.subline">{{ project.fields.subline }}</h3>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <section class="p0 project-image" v-if="project.fields.mainImage">
          <div class="inner">
            <div class="row">
              <div class="col col-12">
                <NuxtLink :to="{ name: 'projects-slug', params: { slug: project.fields.slug }}">
                  <picture>
                    <source media="(min-width: 1920px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 2560, 'webp')" type="image/webp">
                    <source media="(min-width: 1920px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 2560, 'jpg')">
                    <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 1920, 'webp')" type="image/webp">
                    <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 1920, 'jpg')">
                    <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 1280, 'webp')" type="image/webp">
                    <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 1280, 'jpg')">
                    <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 768, 'webp')" type="image/webp">
                    <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 768, 'jpg')">
                    <source :srcset="resizeImageSrcSet(project.fields.mainImage, 480, 'webp')" type="image/webp">
                    <source :srcset="resizeImageSrcSet(project.fields.mainImage, 480, 'jpg')">
                    <img
                      :src="project.fields.mainImage.fields.file.url"
                      :title="project.fields.mainImage.fields.description"
                      :alt="project.fields.mainImage.fields.description"
                      :width="project.fields.mainImage.fields.file.details.image.width"
                      :height="project.fields.mainImage.fields.file.details.image.height"
                      class="dynamic-bg--image"
                      loading="lazy"
                    >
                  </picture>
                </NuxtLink>
                <div class="release-date --eyebrow --site-color t-1 t-l" v-if="project.fields.releaseDate">
                  <span class="display--none display--inline-block-s">{{ t.releaseDate }}</span> {{ date(project.fields.releaseDate) }}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
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
      order: '-sys.createdAt',
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
  methods: {
    resizeImageSrcSet(img, width, format) {
      return `${img.fields.file.url}?w=${width}&fm=${format} 1x, ${img.fields.file.url}?w=${width * 2}&fm=${format} 2x`
    },
    date(dateString) {
      const iso = this.$i18n.localeProperties.iso;
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }

      return new Date(dateString).toLocaleDateString(iso, options);
    },
    tagsCategories(project) {
      const tags = project.metadata.tags;

      for (let i = 0; i < tags.length; i++) {
        console.log(tags[i].sys.id)
      }

      return tags
    },
  }
}
</script>

<style lang="less" scoped>
@import (reference) "@/assets/less/global";

#projects {
  img {
    width: 100%;
    display: block;
  }
  .project-image {
    .col {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .release-date {
    position: absolute;
    bottom: 100%;
    margin-bottom: 2em;
    line-height: 1;
  }

  .animate--js {
    .release-date {
      animation-name: headlineAppearFromBottom2;
      animation-delay: 0.5s;
      animation-duration: 1.66s;
      animation-timing-function: @bezier-push;
      animation-play-state: var(--animation-play-state, paused);
      animation-fill-mode: both;
    }
  }
}
</style>
