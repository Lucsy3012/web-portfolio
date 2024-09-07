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

    <!-- Book -->
    <section class="static-bg static-bg--solar mt3 mt4-l section--book animate--js">
      <div class="inner">
        <div class="row justify-content--space-evenly">
          <div class="col col-10 col-s-8 col-m-5 col--about-me mb0 mb4-m">
            <h2 class="tf3 tf4-s tf5-xl --site-color animate headlineAppearFromBottom pt2">
              {{ t.about.book.title }}
            </h2>
            <p class="mt1 mt2-m --site-color-66 animate appearFromBottomTransform">
              {{ t.about.book.desc }}
            </p>
            <dl class="mt3 mt4-xl --site-color animate appearFromBottomTransform">
              <template v-for="(item, index) in t.about.book.list">
                <dt :key="index" class="tf3 mt2 mt3-l --line-height-normal animate headlineAppearFromBottom">
                  {{ item.title }}
                </dt>
                <dd class="tm">
                  {{ item.desc }}
                </dd>
              </template>
            </dl>
          </div>
          <div class="col col-10 col-s-8 col-m-5 col--book mt4-m">
            <picture>
              <source media="(min-width: 1580px)" :srcset="resizeImageSrcSet(images.aboutBook, 560, 'webp')" type="image/webp">
              <source media="(min-width: 1580px)" :srcset="resizeImageSrcSet(images.aboutBook, 560, 'jpg')">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutBook, 540, 'webp')" type="image/webp">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(images.aboutBook, 540, 'jpg')">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutBook, 420, 'webp')" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutBook, 420, 'jpg')">
              <source :srcset="resizeImageSrcSet(images.aboutBook, 420, 'webp')" type="image/webp">
              <source :srcset="resizeImageSrcSet(images.aboutBook, 420, 'jpg')">
              <img
                class="mt4 mt3-m mt4-l image--book animate appearFromBottomTransform"
                :src="resizeImageSrcSet(images.aboutBook, 420, 'jpg')"
                :title="t.about.book.title"
                :alt="t.about.book.title"
                :width="540"
                :height="684"
                loading="lazy"
              >
            </picture>
          </div>
        </div>
      </div>
    </section>

    <section class="dynamic-bg--container project-image">
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <picture>
              <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(images.bookImpression, 1920, 'webp', 100)" type="image/webp">
              <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(images.bookImpression, 1920, 'jpg', 100)">
              <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(images.bookImpression, 1440, 'webp', 100)" type="image/webp">
              <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(images.bookImpression, 1440, 'jpg', 100)">
              <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(images.bookImpression, 1280, 'webp', 95)" type="image/webp">
              <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(images.bookImpression, 1280, 'jpg', 95)">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.bookImpression, 768, 'webp', 90)" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.bookImpression, 768, 'jpg', 90)">
              <source :srcset="resizeImageSrcSet(images.bookImpression, 480, 'webp', 85)" type="image/webp">
              <source :srcset="resizeImageSrcSet(images.bookImpression, 480, 'jpg', 85)">
              <img
                :src="images.bookImpression"
                :width="3100"
                :height="1970"
                class="dynamic-bg--image"
              >
            </picture>
          </div>
        </div>
      </div>
    </section>


    <!-- Links -->
    <section id="links" class="dynamic-bg--container pb0 animate--js in">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl --site-color text--center">
            <span class="secondary">{{ t.links.title }}</span>
            <h3 class="primary">
              {{ t.links.title }}
            </h3>
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
            <div class="col col-12 col-s-11 text--center">
              <!-- Regular color -->
              <ul>
                <li v-for="(item, index) in t.links.items" :key="index">
                  <a
                    :href="item.href"
                    :title="item.name"
                    target="_blank"
                    class="tb4 tb5-s tb6-l"
                  >{{ item.name }}</a>
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
        aboutBook: "https://images.ctfassets.net/rlw7c1gzufpy/65xMY5Dix8QuKlq6LuXAb4/465636392b2355313d9a8df2078f4b3d/patron-of-the-anxious.jpg",
        bookImpression: "https://images.ctfassets.net/rlw7c1gzufpy/4FtEto20KJYYN5Oy85y1ZI/b887ece1d9c26be4e0bb089a72cebf43/impression-02-patron-en.png",
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
      return this.$t('book')
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

.section--book {
  --about-col-size: 540px;

  img {
    width: 100%;
    height: auto;
    display: block;

    &.image--book {
      box-shadow: 20px -20px 0 @color-project-solar;
    }
  }

  .col--book {
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

// Impressions
.project-image {
  .col {
    position: relative;
    padding-top: 0;
    padding-bottom: 0;

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
}

// Links
#links {
  ul {
    li {
      padding: 0;
      line-height: 1.2;

      a {
        --transition-duration: 0s;
        color: var(--site-color, @color-black);

        &:hover {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
