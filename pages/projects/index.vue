<template>
  <div class="container">
    <section>
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <div class="headline tb5 tb6-m tb7-xl text--center simulate-offset-33">
              <span class="secondary">{{ t.title }}</span>
              <h1 class="primary">{{ t.title }}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section class="dynamic-bg--container p0" v-for="(project, index) in projects" id="projects">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl text--center">
            <span class="secondary">{{ project.fields.title }}</span>
            <h2 class="primary">{{ project.fields.title }}</h2>
          </div>
        </div>
      </div>
      <section class="p0 project-image">
        <div class="inner">
          <div class="row">
            <div class="col col-12">
              <picture>
                <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 1920, 'webp')" type="image/webp">
                <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 1920, 'jpg')">
                <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 1280, 'webp')" type="image/webp">
                <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(project.fields.mainImage, 1280, 'jpg')">
                <img
                  :src="project.fields.mainImage.fields.file.url"
                  :title="project.fields.mainImage.fields.description"
                  loading="lazy">
              </picture>
            </div>
          </div>
        </div>
      </section>
    </section>
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
      select: 'fields',
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
    }
  }
}
</script>

<style lang="less" scoped>
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
}
</style>
