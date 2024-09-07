<template>
  <div class="container">
    <section class="animate--js in">
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <!-- Headline -->
            <div class="headline tb5 tb6-m tb7-xl --site-color text--center simulate-offset-33 offset-overflow">
              <h1 class="secondary">
                {{ t.title }}
              </h1>
              <span class="primary">{{ t.titlePrimary }}</span>
            </div>

            <!-- Background Object Animation -->
            <ThreejsTriangle
              class="background behind-headline"
              colorMaterial="#FE95C1"
              colorLight="#FFF8F3"
              :orbitControls="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Person -->
    <section class="static-bg static-bg--solar mt3 mt4-l section--about-me animate--js">
      <div class="inner">
        <div class="row justify-content--space-evenly">
          <div class="col col-10 col-s-8 col-m-5 col--about-me mb0 mb4-m">
            <h2 class="tf3 tf4-s tf5-xl --site-color animate headlineAppearFromBottom pt2">
              {{ t.about.me.title }}
            </h2>
            <p class="mt1 mt2-m --site-color-66 animate appearFromBottomTransform">
              {{ t.about.me.desc }}
            </p>
            <dl class="mt3 mt4-xl --site-color animate appearFromBottomTransform">
              <template v-for="(item, index) in t.about.me.list">
                <dt :key="index" class="tf3 mt2 mt3-l --line-height-normal animate headlineAppearFromBottom">
                  {{ item.title }}
                </dt>
                <dd class="tm">
                  {{ item.desc }}
                </dd>
              </template>
            </dl>
          </div>
          <div class="col col-10 col-s-8 col-m-5 col--about-me mt4-m">
            <picture>
              <source media="(min-width: 1580px)" :srcset="resizeImageSrcSet(images.aboutMe, 560, 'webp')" type="image/webp">
              <source media="(min-width: 1580px)" :srcset="resizeImageSrcSet(images.aboutMe, 560, 'jpg')">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutMe, 540, 'webp')" type="image/webp">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutMe, 540, 'jpg')">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutMe, 420, 'webp')" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutMe, 420, 'jpg')">
              <source :srcset="resizeImageSrcSet(images.aboutMe, 420, 'webp')" type="image/webp">
              <source :srcset="resizeImageSrcSet(images.aboutMe, 420, 'jpg')">
              <img
                class="mt4 mt3-m mt4-l image--about-me animate appearFromBottomTransform"
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

    <!-- Work -->
    <section class="static-bg static-bg--accent mt4 mt5-l section--about-me animate--js">
      <div class="inner">
        <div class="row justify-content--space-evenly">
          <div class="col col-10 col-s-8 col-m-5 col--about-work mb0 mb4-m">
            <h2 class="tf3 tf4-s tf5-xl --site-color animate headlineAppearFromBottom pt2">
              {{ t.about.work.title }}
            </h2>
            <p class="mt1 mt2-m --site-color-66 animate appearFromBottomTransform">
              {{ t.about.work.desc }}
            </p>
            <dl class="mt3 mt4-xl --site-color animate appearFromBottomTransform">
              <template v-for="(item, index) in t.about.work.list">
                <dt :key="index" class="tf3 mt2 mt3-l --line-height-normal animate headlineAppearFromBottom">
                  {{ item.title }}
                </dt>
                <dd class="tm">
                  {{ item.desc }}
                </dd>
              </template>
            </dl>
          </div>
          <div class="col col-10 col-s-8 col-m-5 col--about-work mt4-m">
            <picture>
              <source media="(min-width: 1580px)" :srcset="resizeImageSrcSet(images.aboutWork, 560, 'webp')" type="image/webp">
              <source media="(min-width: 1580px)" :srcset="resizeImageSrcSet(images.aboutWork, 560, 'jpg')">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutWork, 540, 'webp')" type="image/webp">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutWork, 540, 'jpg')">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutWork, 420, 'webp')" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutWork, 420, 'jpg')">
              <source :srcset="resizeImageSrcSet(images.aboutWork, 420, 'webp')" type="image/webp">
              <source :srcset="resizeImageSrcSet(images.aboutWork, 420, 'jpg')">
              <img
                class="mt4 mt3-m mt4-l image--about-work animate appearFromBottomTransform"
                :src="resizeImageSrcSet(images.aboutWork, 420, 'jpg')"
                :title="t.about.work.title"
                :alt="t.about.work.title"
                :width="540"
                :height="684"
                loading="lazy"
              >
            </picture>
          </div>
        </div>
      </div>
    </section>

    <!-- Career -->
    <section id="career" class="dynamic-bg--container mt4 mt5-l pb0 animate--js">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl --site-color text--center">
            <span class="secondary">{{ t.career.title }}</span>
            <h2 class="primary">
              {{ t.career.title }}
            </h2>
          </div>
        </div>
      </div>
      <section class="section--xl dynamic-bg">
        <ThreejsConeBackground
          class="background"
          materialTexture="texture-pink.png"
          :colorBackground="'#FE95C1'"
          :orbitControls="false"
        />
        <div class="inner">
          <div class="row justify-content--center">
            <div class="col col-12 col-s-11">
              <ul>
                <li
                  v-for="(item, index) in t.career.list"
                  :key="index"
                  class="--site-color"
                  :class="{ 'mt2 mt3-l': index !== 0 }"
                >
                  <div class="time tm">
                    {{ item.time }}
                  </div>
                  <h3 class="title mt1 tf4 tf3-m --line-height-normal">
                    {{ item.title }}
                  </h3>
                  <h4 class="company mt1 tm1 tf3-m --line-height-normal">
                    <span v-if="item.hasAt" class="display--inline-block display--none-xs">@</span>
                    {{ item.company }}
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: {
        aboutMe: "https://images.ctfassets.net/rlw7c1gzufpy/5wK2hatwH6hTyDYXceLuJX/29e03c15127285d5520e7cde1e6f0762/about-me.jpg",
        aboutWork: "https://images.ctfassets.net/rlw7c1gzufpy/bnLGLKEkp3FfScQbAWgPS/dd59972bc054e7033189903c9b7442ef/about-workspace.jpg",
      }
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
        { hid: 'favicon', rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon-magenta.ico' },
        { hid: 'favicon-apple', rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-magenta.ico' },
        { hid: 'favicon-32x32', rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32-magenta.ico' },
        { hid: 'favicon-16x16', rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16-magenta.ico' }
      ]
    }
  },
  computed: {
    t() {
      return this.$t('about')
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

.headline {
  position: relative;
  z-index: 1;
}
.behind-headline {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.section--about-me {
  --about-col-size: 540px;

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

  .col--about-me, .col--about-work {
    max-width: ~'min(var(--about-col-size), 100% / var(--columns, 12) * var(--column-fraction, 12))';
  }

  // Col sizes
  @media screen and (min-width: @vw-max-grid) {
    --about-col-size: 580px;
  }
  @media screen and (min-width: @vw-max-desktop) {
    --about-col-size: 600px;
  }
  @media screen and (min-width: @vw-min-desktop-large) {
    --about-col-size: 640px;
  }
}
dl {
  dd {
    margin: 0;

    @media screen and (min-width: @vw-min-desktop-large) {
      margin-top: 10px;
    }
  }
}

// Career
#career {
  li {
    @media screen and (max-width: @vw-max-grid) {
      + li {
        margin-top: 40px;
        padding-top: 40px;
        border-top: 2px solid var(--site-color, @color-black);
      }
    }
    @media screen and (min-width: @vw-min-grid) {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;

      .time {
        grid-column: span 2;
        grid-row: 1;
      }
      .title {
        grid-column: 1;
        grid-row: 2;
      }
      .company {
        grid-column: 2;
        grid-row: 2;
        text-align: right;
      }
    }
    @media screen and (min-width: @vw-min-desktop-large) {
      grid-gap: 10px;
    }
  }
}
</style>
