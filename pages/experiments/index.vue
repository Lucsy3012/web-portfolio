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
              colorMaterial="#51B79E"
              colorLight="#ECFDF4"
              :orbitControls="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <div id="experiments">

      <!-- Coin -->
      <ProjectBanner
        :slug="t.experiments.coin.slug"
        :title="t.experiments.coin.title"
        :subline="t.experiments.coin.subline"
        :webGL="true"
        :headlinePosition="'left'"
        :key="t.experiments.coin.slug"
      >
        <template #experiment>
          <ThreejsCoin
            colorBackground="#f3efdd"
            debug="false"
          />
        </template>
      </ProjectBanner>
    </div>
  </div>
</template>

<script>
export default {
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
        { hid: 'twitter:image', name: 'twitter:image', content: this.t.seoImage },
      ],
      link: [
        { hid: 'favicon', rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon-jade.ico' },
        { hid: 'favicon-apple', rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-jade.ico' },
        { hid: 'favicon-32x32', rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32-jade.ico' },
        { hid: 'favicon-16x16', rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16-jade.ico' },
      ]
    }
  },
  computed: {
    t() {
      return this.$t('experiments')
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
