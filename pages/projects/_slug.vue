<template>
  <div class="container">
    <section class="dynamic-bg--container p0 animate--js in">
      <section class="section--xl section--filled dynamic-bg">
        <!-- Video -->
        <video
          v-if="mainVideo && mainImage"
          loop
          autoplay
          muted
          playsinline
          :poster="resizeImageSrc(mainImage, 1920, 'jpg', 85)"
          class="background"
        >
          <source :src="mainVideo.fields.file.url" :type="mainVideo.fields.file.contentType">
          <img
            :src="mainImage.fields.file.url"
            :title="mainImage.fields.description"
            :alt="mainImage.fields.description"
            :width="mainImage.fields.file.details.image.width"
            :height="mainImage.fields.file.details.image.height"
            loading="lazy"
          >
        </video>

        <!-- ThreeJS Animation -->
        <ThreejsConeBackground
          v-else
          class="background"
          :customID="'links'"
          :materialTexture="urlMaterialTexture"
          :materialTextureExternal="true"
          :orbitControls="false"
        />
        <div class="inner">
          <div class="row">
            <div class="col col-12">
              <!-- Headline -->

              <!-- Color on Texture -->
              <template v-if="showsColorOnTexture">
                <div class="headline tb5 tb6-m tb7-xl --site-color text--center simulate-offset-33" :style="{ '--site-color': colorOnTexture }">
                  <span class="secondary">{{ title }}</span>
                  <h1 class="primary">
                    {{ title }}
                  </h1>
                  <h2 v-if="subline" class="tertiary">
                    {{ subline }}
                  </h2>
                </div>
              </template>

              <!-- Regular color -->
              <template v-else>
                <div class="headline tb5 tb6-m tb7-xl --site-color text--center simulate-offset-33">
                  <span class="secondary">{{ title }}</span>
                  <h1 class="primary">
                    {{ title }}
                  </h1>
                  <h2 v-if="subline" class="tertiary">
                    {{ subline }}
                  </h2>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>
    </section>

    <!-- Keyfacts -->
    <section class="static-bg static-bg--accent mt3 mt4-l section--keyfacts animate--js" :style="`--site-accent: ${accentColor}`">
      <div class="inner">
        <div class="row" :class="{ 'justify-content--space-evenly': !!urlSideImage }">
          <div class="col col-10 col-s-8 col-m-5 col--keyfacts mb0 mb4-m">
            <h2 class="tf3 tf4-s tf5-xl --site-color animate headlineAppearFromBottom pt2">
              {{ t.keyfacts }}
            </h2>
            <p class="mt1 mt2-m --site-color-66 animate appearFromBottomTransform">
              {{ description }}
            </p>
            <div v-if="link" class="mt2 mt3-m animate appearFromBottomTransform">
              <a :href="link" class="btn" target="_blank">
                {{ t.toLink }}
              </a>
            </div>
            <dl class="mt3 mt4-xl --site-color animate appearFromBottomTransform">
              <template v-for="(keyfact, index) in keyfactsList">
                <dt :key="index" class="tf3 mt2 mt3-l --line-height-normal animate headlineAppearFromBottom">
                  {{ keyfact.definition }}
                </dt>
                <dd class="tm">
                  {{ keyfact.term }}
                </dd>
              </template>
            </dl>
          </div>
          <div v-if="urlSideImage" class="col col-10 col-s-8 col-m-5 col--keyfacts mt4-m">
            <picture>
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(urlSideImage, 400, 'webp')" type="image/webp">
              <source media="(min-width: 960px)" :srcset="resizeImageSrcSet(urlSideImage, 400, 'png')">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(urlSideImage, 400, 'webp')" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(urlSideImage, 400, 'png')">
              <source :srcset="resizeImageSrcSet(urlSideImage, 400, 'webp')" type="image/webp">
              <source :srcset="resizeImageSrcSet(urlSideImage, 400, 'png')">
              <img
                class="m mt4 mt0-m animate appearFromBottomTransform"
                :src="resizeImageSrc(urlSideImage, 400, 'png')"
                :title="title"
                :alt="title"
                :width="sideImage.fields.file.details.image.width"
                :height="sideImage.fields.file.details.image.height"
                loading="lazy"
              >
            </picture>
          </div>
        </div>
      </div>
    </section>

    <!-- Todo Description Title
    <section class="pt0 dynamic-bg--container animate--js headline-position--center mt5" id="description" v-if="hasDescription">
      <div class="inner">
        <div class="row dynamic-bg--offset--33">
          <div class="col col-12 headline--container">
            <div class="headline tb4 tb5-xs tb6-m tb7-xl">
              <span class="secondary">{{ t.description }}</span>
              <h3 class="primary">{{ t.description }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt0 dynamic-bg--container animate--js" v-if="hasDescription">
      <div class="inner">
        <div class="row justify-content--center">
          <div class="col col-12 col-s-8 col-max">
            <div v-html="longDescriptionRendered"></div>
          </div>
        </div>
      </div>
    </section>
    -->

    <!-- Impressions Title -->
    <section id="impressions" class="pt0 dynamic-bg--container animate--js headline-position--center mt5">
      <div class="inner">
        <div class="row dynamic-bg--offset--33">
          <div class="col col-12 headline--container">
            <div class="headline tb4 tb5-xs tb6-m tb7-xl">
              <span class="secondary">{{ t.impressions }}</span>
              <h3 class="primary">
                {{ t.impressions }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Impressions First -->
      <section v-if="impressionsFirst" class="p0 project-image">
        <div class="inner">
          <div class="row">
            <div class="col col-12">
              <picture>
                <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 1920, 'webp', 100)" type="image/webp">
                <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 1920, 'jpg', 100)">
                <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 1440, 'webp', 100)" type="image/webp">
                <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 1440, 'jpg', 100)">
                <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 1280, 'webp', 95)" type="image/webp">
                <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 1280, 'jpg', 95)">
                <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 768, 'webp', 90)" type="image/webp">
                <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 768, 'jpg', 90)">
                <source :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 480, 'webp', 85)" type="image/webp">
                <source :srcset="resizeImageSrcSet(impressionsFirst.fields.file.url, 480, 'jpg', 85)">
                <img
                  :src="impressionsFirst.fields.file.url"
                  :title="impressionsFirst.fields.description"
                  :alt="impressionsFirst.fields.description"
                  :width="impressionsFirst.fields.file.details.image.width"
                  :height="impressionsFirst.fields.file.details.image.height"
                  class="dynamic-bg--image"
                >
              </picture>
            </div>
          </div>
        </div>
      </section>
    </section>

    <section v-for="impression in impressionsRest" :key="impression.sys.id" class="pt0 dynamic-bg--container animate--js project-image">
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <picture>
              <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(impression.fields.file.url, 1920, 'webp', 100)" type="image/webp">
              <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(impression.fields.file.url, 1920, 'jpg', 100)">
              <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(impression.fields.file.url, 1440, 'webp', 100)" type="image/webp">
              <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(impression.fields.file.url, 1440, 'jpg', 100)">
              <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(impression.fields.file.url, 1280, 'webp', 95)" type="image/webp">
              <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(impression.fields.file.url, 1280, 'jpg', 95)">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(impression.fields.file.url, 768, 'webp', 90)" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(impression.fields.file.url, 768, 'jpg', 90)">
              <source :srcset="resizeImageSrcSet(impression.fields.file.url, 480, 'webp', 85)" type="image/webp">
              <source :srcset="resizeImageSrcSet(impression.fields.file.url, 480, 'jpg', 85)">
              <img
                :src="impression.fields.file.url"
                :title="impression.fields.description"
                :alt="impression.fields.description"
                :width="impression.fields.file.details.image.width"
                :height="impression.fields.file.details.image.height"
                class="dynamic-bg--image"
              >
            </picture>
          </div>
        </div>
      </div>
    </section>

    <!-- Links -->
    <section v-if="!!links" id="links" class="dynamic-bg--container pb0 animate--js in">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl --site-color text--center">
            <span class="secondary">{{ t.links }}</span>
            <h3 class="primary">
              {{ t.links }}
            </h3>
          </div>
        </div>
      </div>
      <section class="section--xl dynamic-bg">
        <ThreejsConeBackground
          class="background"
          :materialTexture="urlMaterialTexture"
          :materialTextureExternal="true"
          :colorBackground="accentColor"
          :orbitControls="false"
        />
        <div class="inner">
          <div class="row justify-content--center">
            <div class="col col-12 col-s-11 text--center">
              <!-- Color on Texture -->
              <template v-if="showsColorOnTexture">
                <ul :style="{ '--site-color': colorOnTexture }">
                  <li v-for="(item, index) in linksList" :key="index">
                    <a
                      v-if="showsColorOnTexture"
                      :href="item.href"
                      :title="item.name"
                      target="_blank"
                      class="tb4 tb5-s tb6-l"
                      :style="{ '--site-color': colorOnTexture }"
                    >{{ item.name }}</a>
                    <a
                      v-else
                      :href="item.href"
                      :title="item.name"
                      target="_blank"
                      class="tb4 tb5-s tb6-l"
                    >{{ item.name }}</a>
                  </li>
                </ul>
              </template>

              <!-- Regular color -->
              <template v-else>
                <ul>
                  <li v-for="(item, index) in linksList" :key="index">
                    <a
                      v-if="showsColorOnTexture"
                      :href="item.href"
                      :title="item.name"
                      target="_blank"
                      class="tb4 tb5-s tb6-l"
                      :style="{ '--site-color': colorOnTexture }"
                    >{{ item.name }}</a>
                    <a
                      v-else
                      :href="item.href"
                      :title="item.name"
                      target="_blank"
                      class="tb4 tb5-s tb6-l"
                    >{{ item.name }}</a>
                  </li>
                </ul>
              </template>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  asyncData({ i18n, params, $contentfulClient }) {
    const {slug} = params;

    return $contentfulClient.getEntries({
      content_type: 'project',
      order: '-sys.createdAt',
      'fields.slug[in]': slug,
      select: 'fields,sys.id,sys.createdAt',
      limit: 1,
      locale: i18n.locale
    })
      .then(entries => {
        const entry = entries.items[0].fields;

        return {
          slug,
          title: entry?.title,
          subline: entry?.subline,
          metaDescription: entry?.metaDescription,
          description: entry?.description,
          longDescription: entry?.longDescription,
          keyfacts: entry?.keyfacts,
          accentColor: entry?.accentColor,
          colorOnTexture: entry?.colorOnTexture,
          link: entry?.link,
          links: entry?.links,
          releaseDate: entry?.releaseDate,
          materialTexture: entry?.texture,
          mainImage: entry?.mainImage,
          mainVideo: entry?.mainVideo,
          sideImage: entry?.sideImage,
          impressions: entry?.impressions,
        }
      })
      .catch(e => console.error(e))
  },
  data() {
    return {
      title: '',
      subline: '',
      metaDescription: '',
      description: '',
      longDescription: {},
      keyfacts: [],
      accentColor: '',
      link: '',
      links: [],
      releaseDate: '',
      mainImage: '',
      mainVideo: '',
      sideImage: '',
      impressions: [],
      materialTexture: 'texture-cyan.png',
      materialTextureExternal: false,
      colorOnTexture: '',
    }
  },
  head() {
    return {
      title: this.title,
      meta: [

        // Meta
        { hid: 'description', name: 'description', content: this.seoDescription },
        { hid: 'image', itemprop: 'image', content: this.seoImage },

        // Open Graph
        { hid: 'og:description', property: 'og:description', content: this.seoDescription },
        { hid: 'og:image', property: 'og:image', content: this.seoImage },

        // Twitter
        { hid: 'twitter:description', name: 'twitter:description', content: this.seoDescription },
        { hid: 'twitter:image', name: 'twitter:image', content: this.seoImage }
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
    seoDescription() {
      if (this?.metaDescription) {
        return this?.metaDescription
      } else if (this?.description) {
        return this?.description
      } else {
        return this.t.seoDescription
      }
    },
    seoImage() {
      return !!this?.mainImage ? this.resizeImageSrc(this.urlMainImage, 2400, 'jpg', 90) : this.t.seoImage
    },
    showsColorOnTexture() {
      return !!this?.colorOnTexture
    },
    keyfactsList() {
      let arr = []

      if (!!this.keyfacts) {
        for (let i = 0; i < this.keyfacts.length; i++) {
          let obj = {}
          const keyfactsTexts = this.keyfacts[i].split(': ')

          obj.term = keyfactsTexts[0]
          obj.definition = keyfactsTexts[1]

          arr[i] = obj
        }
      }

      return arr
    },
    linksList() {
      let arr = []

      if (!!this.links) {
        for (let i = 0; i < this.links.length; i++) {
          let obj = {}
          const link = this.links[i].split(': ')

          obj.name = link[0]
          obj.href = link[1]

          arr[i] = obj
        }
      }

      return arr
    },
    urlMaterialTexture() {
      return this.contentfulImage(this?.materialTexture?.fields?.file?.url) || '';
    },
    urlMainImage() {
      return this.contentfulImage(this?.mainImage?.fields?.file?.url) || '';
    },
    urlSideImage() {
      return this.contentfulImage(this?.sideImage?.fields?.file?.url) || '';
    },
    impressionsFirst() {
      return this.impressions[0]
    },
    impressionsRest() {
      return this.impressions.slice(1)
    },
    hasDescription() {
      return !!this.longDescription
    },
    longDescriptionRendered() {
      const options = {
        renderMark: {
          [MARKS.BOLD]: text => `<b>${text}</b>`,
          [MARKS.ITALIC]: text => `<i>${text}</i>`
        },
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`
        }
      }
      if (this.hasDescription) {
        return documentToHtmlString(this.longDescription, options)
      }
    }
  },
  methods: {
    resizeImageSrc(img, width, format, quality = 100) {
      return `${img}?w=${width}&fm=${format}&q=${quality}`
    },
    resizeImageSrcSet(img, width, format, quality = 100) {
      return `${img}?w=${width}&fm=${format}&q=${quality} 1x, ${img}?w=${width * 2}&fm=${format}&q=${quality} 2x`
    },
    contentfulImage(img) {
      if (img === undefined) {
        return undefined
      } else {
        return `https:${img}`
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import (reference) "@/assets/less/global";

.tertiary {
  position: relative;
  top: auto;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.section--keyfacts {
  --keyfacts-col-size: 540px;

  img {
    width: 100%;
    margin-bottom: -5rem;
    max-width: ~'clamp(320px, 50vw, 400px)';
    height: auto;
    display: block;
  }

  .col--keyfacts {
    max-width: ~'min(var(--keyfacts-col-size), 100% / var(--columns, 12) * var(--column-fraction, 12))';
  }

  // Col sizes
  @media screen and (min-width: @vw-min-grid) {
    --keyfacts-col-size: 580px;
  }
  @media screen and (min-width: @vw-min-desktop) {
    --keyfacts-col-size: 600px;

    img {
      max-width: ~'clamp(320px, 30vw, 400px)';
    }
  }
  @media screen and (min-width: @vw-min-desktop-large) {
    --keyfacts-col-size: 640px;
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

// Description Button
.btn--description {
  position: absolute;
  bottom: ~'calc(var(--section-padding, 120px) * 2)';
  transform: translateY(50%);
}
</style>
