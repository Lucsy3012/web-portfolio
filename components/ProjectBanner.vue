<template>
  <section class="project-banner section--xl pt0 dynamic-bg--container animate--js" :class="headlinePositionClass">
    <div class="inner">
      <!-- Mobile -->
      <div class="row mb2 container-mobile">
        <div class="col col-12">
          <NuxtLink :to="localePath({ name: 'projects-slug', params: { slug: slug }})" :title="title">
            <div class="headline headline--xs">
              <h2 class="primary tf4 tf5-xs mt1 mb1">
                {{ title }}
              </h2>
              <h3 v-if="subline" class="tertiary">
                {{ subline }}
              </h3>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Desktop -->
      <div class="row dynamic-bg--offset--33 container-desktop">
        <div class="col col-12 headline--container">
          <NuxtLink :to="localePath({ name: 'projects-slug', params: { slug: slug }})" :title="title">
            <div class="headline tb5 tb6-m tb7-xl">
              <span class="secondary">{{ title }}</span>

              <!-- Accent Color -->
              <template v-if="showsAccentColor">
                <h2 class="primary" :style="{ 'color': accentColor }">
                  {{ title }}
                </h2>
                <h3 v-if="subline" class="tertiary" :style="{ 'color': accentColor }">
                  {{ subline }}
                </h3>
              </template>

              <!-- Regular Site Color -->
              <template v-else>
                <h2 class="primary">
                  {{ title }}
                </h2>
                <h3 v-if="subline" class="tertiary">
                  {{ subline }}
                </h3>
              </template>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Image or Video -->
    <section v-if="img && !webGL" class="p0 project-image">
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <NuxtLink :to="localePath({ name: 'projects-slug', params: { slug: slug }})" :title="title">
              <!-- Video -->
              <video
                v-if="video"
                loop
                autoplay
                muted
                playsinline
                :poster="resizeImageSrc(img, 1920, 'jpg', 85)"
                class="dynamic-bg--image"
              >
                <source :src="video.fields.file.url" :type="video.fields.file.contentType">
                <img
                  :src="img.fields.file.url"
                  :title="img.fields.description"
                  :alt="img.fields.description"
                  :width="img.fields.file.details.image.width"
                  :height="img.fields.file.details.image.height"
                  class="dynamic-bg--image"
                  loading="lazy"
                >
              </video>

              <!-- Image only -->
              <picture v-else>
                <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(img, 1920, 'webp', 90)" type="image/webp">
                <source media="(min-width: 1680px)" :srcset="resizeImageSrcSet(img, 1920, 'jpg', 90)">
                <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(img, 1440, 'webp', 90)" type="image/webp">
                <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(img, 1440, 'jpg', 90)">
                <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(img, 1280, 'webp', 90)" type="image/webp">
                <source media="(min-width: 768px)" :srcset="resizeImageSrcSet(img, 1280, 'jpg', 90)">
                <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(img, 768, 'webp', 85)" type="image/webp">
                <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(img, 768, 'jpg', 85)">
                <source :srcset="resizeImageSrcSet(img, 480, 'webp', 85)" type="image/webp">
                <source :srcset="resizeImageSrcSet(img, 480, 'jpg', 85)">
                <img
                  :src="img.fields.file.url"
                  :title="img.fields.description"
                  :alt="img.fields.description"
                  :width="img.fields.file.details.image.width"
                  :height="img.fields.file.details.image.height"
                  class="dynamic-bg--image"
                >
              </picture>
            </NuxtLink>
            <div class="release-date --eyebrow --site-color t-1 t-l display--none display--block-s">
              <span class="display--none display--inline-block-l">{{ t.releaseDate }}</span>
              <span v-if="formattedDate">{{ formattedDate }}</span>
              <span v-else>{{ t.inProgress }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experiment -->
    <section v-if="webGL" class="p0 project-image">
      <div class="inner">
        <div class="row">
          <div class="col col-12 position--relative">
            <div class="tag hint-interactive">
              <span>{{ t.interactiveElement }}</span>
              <img
                src="/icon-lightning.svg"
                alt="Interactive"
                width="18"
                height="18"
              >
            </div>
            <slot name="experiment" />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "ProjectBanner",
  props: {
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "Title",
    },
    subline: {
      type: String,
      required: false,
    },
    img: {
      type: Object,
      required: false,
    },
    video: {
      type: Object,
      required: false,
    },
    webGL: {
      type: Boolean,
      required: false,
    },
    releaseDate: {
      type: String,
      required: false,
    },
    headlinePosition: {
      type: String,
      required: false,
      default: "center",
    },
    accentColor: {
      type: String,
      required: false,
    },
  },
  computed: {
    t() {
      return this.$t('projects')
    },
    formattedDate() {
      if (!this?.releaseDate) {
        return false
      }
      const {iso} = this.$i18n.localeProperties;
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
      return new Date(this.releaseDate).toLocaleDateString(iso, options);
    },
    headlinePositionClass() {
      return 'headline-position--' + this.headlinePosition.toLowerCase();
    },
    showsAccentColor() {
      return this?.accentColor && this?.video
    },
    accentColorAttr() {
      return this?.accentColor
    }
  },
  methods: {
    resizeImageSrc(img, width, format, quality = 100) {
      return `${img.fields.file.url}?w=${width}&fm=${format}&q=${quality}`
    },
    resizeImageSrcSet(img, width, format, quality = 100) {
      return `${img.fields.file.url}?w=${width}&fm=${format}&q=${quality} 1x, ${img.fields.file.url}?w=${width * 2}&fm=${format}&q=${quality} 2x`
    },
  }
}
</script>

<style lang="less" scoped>
@import (reference) "@/assets/less/global";

.project-banner {
  .dynamic-bg--offset--33 {
    pointer-events: none;
  }
  a * {
    pointer-events: initial;
    cursor: pointer;
  }
}

// Images
img, video {
  display: block;
  width: 100%;
  height: auto;
}
.project-image {
  .col {
    position: relative;
    padding-top: 0;
    padding-bottom: 0;
  }
}

// Release Date
.release-date {
  position: absolute;
  left: ~'calc(var(--gap-column) / 2)';
  bottom: 100%;
  margin-bottom: 2em;
  line-height: 1;
}
.headline-position--left {
  .release-date {
    left: 0;
    right: ~'calc(var(--gap-column) / 2)';
    text-align: right;
  }
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
:root {
  --btn-padding-top-bottom: 0.66em;
  --btn-padding-left-right: 1.66em;
}

.hint-interactive {
  position: absolute;
  right: ~'calc(2.5em + (var(--gap-column, 80px) / 2))';
  bottom: 2.5em;

  img {
    width: 14px;
    height: 14px;
  }
}

.container-mobile   { display: none; }
.container-desktop  { display: flex; }

@media screen and (max-width: @vw-min-tablet) {
  .container-mobile   { display: flex; }
  .container-desktop  { display: none; }
}
</style>
