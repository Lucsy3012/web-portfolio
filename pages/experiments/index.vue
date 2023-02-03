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
              colorMaterial="#51B79E"
              colorLight="#9EFFCB"
              :orbitControls="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed experiments -->
    <div id="experiments">
      <!-- Coin -->
      <ProjectBanner
        :key="t.detailedExperiments.coin.slug"
        :slug="t.detailedExperiments.coin.slug"
        :title="t.detailedExperiments.coin.title"
        :subline="t.detailedExperiments.coin.subline"
        :webGL="true"
        :headlinePosition="'left'"
      >
        <template #experiment>
          <ThreejsCoin
            colorBackground="#F3EFDD"
            colorAmbientLight="#D6C78C"
            colorMaterial="#AF9434"
            :gui="true"
            :debug="false"
          />
        </template>
      </ProjectBanner>

      <!-- Tetrahedron -->
      <ProjectBanner
        :key="t.detailedExperiments.tetrahedron.slug"
        :slug="t.detailedExperiments.tetrahedron.slug"
        :title="t.detailedExperiments.tetrahedron.title"
        :subline="t.detailedExperiments.tetrahedron.subline"
        :webGL="true"
        :headlinePosition="'left'"
      >
        <template #experiment>
          <ThreejsTriangle
            colorBackground="#D2FFE7"
            colorMaterial="#51B79E"
            colorLight="#9EFFCB"
            :orbitControls="false"
            :gui="true"
            :debug="false"
          />
        </template>
      </ProjectBanner>

      <!-- Cone Background
      <ProjectBanner
        :key="t.detailedExperiments.angularGradient.slug"
        :slug="t.detailedExperiments.angularGradient.slug"
        :title="t.detailedExperiments.angularGradient.title"
        :subline="t.detailedExperiments.angularGradient.subline"
        :webGL="true"
        :headlinePosition="'left'"
      >
        <template #experiment>
          <ThreejsConeBackground
            class="background"
            materialTexture="texture-cyan.png"
            :colorBackground="'#95EBFE'"
            :orbitControls="false"
          />
        </template>
      </ProjectBanner>
       -->
    </div>

    <!-- More -->
    <section>
      <div class="inner">
        <div class="row">
          <div class="col col-12 text--center">
            <h2 class="tf3 tf4-s tf5-xl cta">
              {{ t.moreExperimentsTitle }}
            </h2>
          </div>
        </div>
      </div>
    </section>
    <section id="more-experiments">
      <div class="inner">
        <div class="row justify-content--center">
          <div class="col col-12">
            <ul class="experiments-table">
              <li v-for="experiment in t.moreExperiments" :key="experiment.slug">
                <!-- External Link -->
                <a
                  v-if="experiment.link"
                  :href="experiment.link"
                  class="tf2 tf3-m"
                  target="_blank"
                >
                  <span>{{ experiment.title }}</span>
                  <img
                    src="/icon-arrow-top-right.svg"
                    class="hover-icon"
                    alt=""
                    width="32"
                    height="32"
                  >
                </a>

                <!-- Tags -->
                <ul class="tags">
                  <li v-for="(tag, index) in experiment.tags" :key="index" class="tag tag--border">
                    <span>{{ t.tags[tag].text }}</span>
                    <span v-if="!!t.tags[tag].tooltip" class="tag-tooltip">{{ t.tags[tag].tooltip }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ExperimentsIndex',
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
        { hid: 'favicon', rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon-jade.ico' },
        { hid: 'favicon-apple', rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-jade.ico' },
        { hid: 'favicon-32x32', rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32-jade.ico' },
        { hid: 'favicon-16x16', rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16-jade.ico' }
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

#more-experiments {
  .experiments-table {
    > li {
      .flex();
      justify-content: space-between;
      align-items: center;
      gap: 12px 24px;
      grid-gap: 12px 24px;

      + li {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 2px solid var(--site-color, @color-black);
      }

      // Tags
      .tags {
        .flex();
        justify-content: flex-end;
        align-items: center;
        gap: 16px;
        grid-gap: 16px;
      }
    }

    // Link
    a {
      .flex();
      align-items: center;
      grid-gap: 8px;
      gap: 8px;

      .hover-icon {
        opacity: 0;
        transform-origin: center left;
        scale: 0.9;
        .transit();
      }

      &:hover {
        padding-left: 8px;

        .hover-icon {
          opacity: 1;
          translate: 8px;
          scale: 1;
        }
      }
    }

    @media screen and (max-width: @vw-max-tablet) {
      > li {

        // Tags
        .tags {
          justify-content: flex-start;
          gap: 12px;
          grid-gap: 12px;
        }
      }
    }

    @media screen and (max-width: @vw-max-mobile) {
      > li {
        + li {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--site-color, @color-black);
        }

        // Tags
        .tags {
          display: none;
        }
      }

      // Link
      a {
        .hover-icon {
          display: none;
        }
      }
    }
  }
}
</style>
