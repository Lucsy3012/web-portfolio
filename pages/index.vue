<template>
  <div class="container">
    <section>
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <div class="headline tb5 tb6-m tb7-xl --site-color simulate-offset-33">
              <span class="secondary">{{ t.firstname }}</span>
              <span class="primary">{{ t.lastname }}</span>
              <h1 class="tertiary">{{ t.jobTitle }}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="static-bg static-bg--gray static-bg--offset-bottom--33 mt3 mt4-l" id="about">
      <div class="inner">
        <div class="row justify-content--space-around">
          <div class="col col-10 col-s-8 col-m-5 col--about-me">
            <h2 class="tf3 tf4-s tf5-xl --site-color headlineAppearFromBottom pt2">{{ t.about.me.title }}</h2>
            <p class="mt1 mt2-m --site-color-66 appearFromTop">{{ t.about.me.desc }}</p>
            <picture>
              <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(images.aboutMe, 604, 'webp')" type="image/webp">
              <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(images.aboutMe, 604, 'jpg')">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutMe, 540, 'webp')" type="image/webp">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutMe, 540, 'jpg')">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutMe, 420, 'webp')" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutMe, 420, 'jpg')">
              <source :srcset="resizeImageSrcSet(images.aboutMe, 420, 'webp')" type="image/webp">
              <source :srcset="resizeImageSrcSet(images.aboutMe, 420, 'jpg')">
              <img
                class="mt4 mt3-m mt4-l image--about-me"
                :src="resizeImageSrcSet(images.aboutMe, 420, 'jpg')"
                :title="t.about.me.title"
                :alt="t.about.me.title"
                :width="540"
                :height="684"
                loading="lazy"
              >
            </picture>
          </div>
          <div class="col col-10 col-s-8 col-m-5 col--about-work">
            <h2 class="tf3 tf4-s tf5-xl --site-color headlineAppearFromBottom">{{ t.about.work.title }}</h2>
            <p class="mt1 mt2-m --site-color-66 appearFromTop">{{ t.about.work.desc }}</p>
            <picture>
              <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(images.aboutWork, 604, 'webp')" type="image/webp">
              <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(images.aboutWork, 604, 'jpg')">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutWork, 540, 'webp')" type="image/webp">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutWork, 540, 'jpg')">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutWork, 420, 'webp')" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutWork, 420, 'jpg')">
              <source :srcset="resizeImageSrcSet(images.aboutWork, 420, 'webp')" type="image/webp">
              <source :srcset="resizeImageSrcSet(images.aboutWork, 420, 'jpg')">
              <img
                class="mt4 mt3-m mt4-l image--about-work"
                :src="resizeImageSrcSet(images.aboutMe, 420, 'jpg')"
                :title="t.about.me.title"
                :alt="t.about.me.title"
                :width="540"
                :height="684"
                loading="lazy"
              >
            </picture>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import client from '~/plugins/contentful'

export default {
  data() {
    return {
      images: {
        aboutMe: "https://images.ctfassets.net/rlw7c1gzufpy/5wK2hatwH6hTyDYXceLuJX/0cbbc598dd4bb6c318b11c06a6872090/about-me.jpg",
        aboutWork: "https://images.ctfassets.net/rlw7c1gzufpy/bnLGLKEkp3FfScQbAWgPS/dd59972bc054e7033189903c9b7442ef/about-workspace.jpg",
      }
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
      return this.$t('home')
    },
  },
  methods: {
    resizeImageSrcSet(img, width, format) {
      return `${img}?w=${width}&fm=${format} 1x, ${img}?w=${width * 2}&fm=${format} 2x`
    },
  }
}
</script>

<style lang="less" scoped>
@import (reference) "@/assets/less/global";

#about {
  img {
    width: 100%;
    height: auto;
    display: block;

    &.image--about-me {
      box-shadow: 20px -20px 0 @color-project-solar;
    }
    &.image--about-work {
      box-shadow: 20px -20px 0 var(--site-accent);
    }
  }

  .col--about-work {
    margin-top: ~'calc(var(--section-padding) * 3.5)';
  }
}
</style>
