<template>
  <div class="container">
    <section class="animate--js in">
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <!-- Headline -->
            <div class="headline tb5 tb6-m tb7-xl --site-color text--center simulate-offset-33">
              <span class="secondary">{{ t.firstname }}</span>
              <span class="primary">{{ t.lastname }}</span>
              <h1 class="tertiary">
                {{ t.jobTitle }}
              </h1>
            </div>

            <!-- Background Object Animation -->
            <ThreejsTriangle
              class="background behind-headline"
              colorMaterial="#AA95FE"
              colorLight="#F7FFF3"
              :orbitControls="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <!-- <section class="static-bg static-bg--gray static-bg--offset-bottom--33 mt3 mt4-l" id="about"> -->
    <section id="about" class="mt3 mt4-l">
      <div class="inner">
        <div class="row justify-content--space-evenly">
          <div class="col col-10 col-s-9 col-m-5 col-l-6 col--about-me">
            <h2 class="tf3 tf4-s tf5-xl --site-color animate headlineAppearFromBottom pt2">
              {{ t.about.me.title }}
            </h2>
            <p class="mt1 mt2-m --site-color-66 animate appearFromTop">
              {{ t.about.me.desc }}
            </p>
            <picture>
              <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(images.aboutMe, 1440, 'webp')" type="image/webp">
              <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(images.aboutMe, 1440, 'jpg')">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutMe, 540, 'webp')" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutMe, 540, 'jpg')">
              <source :srcset="resizeImageSrcSet(images.aboutMe, 420, 'webp')" type="image/webp">
              <source :srcset="resizeImageSrcSet(images.aboutMe, 420, 'jpg')">
              <img
                class="mt4 mt3-m mt4-l image--about-me"
                :src="resizeImageSrcSet(images.aboutMe, 420, 'jpg')"
                :title="t.about.me.title"
                :alt="t.about.me.title"
                :width="540"
                :height="684"
              >
            </picture>
          </div>
          <div class="col col-10 col-s-9 col-m-5 col-l-6 col--about-work">
            <h2 class="tf3 tf4-s tf5-xl --site-color animate headlineAppearFromBottom">
              {{ t.about.work.title }}
            </h2>
            <p class="mt1 mt2-m --site-color-66 animate appearFromTop">
              {{ t.about.work.desc }}
            </p>
            <picture>
              <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(images.aboutWork, 1440, 'webp')" type="image/webp">
              <source media="(min-width: 1280px)" :srcset="resizeImageSrcSet(images.aboutWork, 1440, 'jpg')">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutWork, 540, 'webp')" type="image/webp">
              <source media="(min-width: 480px)" :srcset="resizeImageSrcSet(images.aboutWork, 540, 'jpg')">
              <source :srcset="resizeImageSrcSet(images.aboutWork, 420, 'webp')" type="image/webp">
              <source :srcset="resizeImageSrcSet(images.aboutWork, 420, 'jpg')">
              <img
                class="mt4 mt3-m mt4-l image--about-work"
                :src="resizeImageSrcSet(images.aboutMe, 420, 'jpg')"
                :title="t.about.me.title"
                :alt="t.about.me.title"
                :width="540"
                :height="684"
                fetchpriority="high"
              >
            </picture>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <div id="projects">
      <section class="section--xl overflow--hidden">
        <div class="tb3 tb4-s tb5-xl --site-color rolling-title">
          <h2 class="tf3 tf4-s tf5-xl">
            {{ t.projects.title }}
          </h2>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="tf3 tf4-s tf5-xl">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
          <span class="--site-color-33">{{ t.projects.title }}</span>
        </div>
      </section>
      <template v-for="project in projects">
        <ProjectBanner
          :key="project.fields.slug"
          :slug="project.fields.slug"
          :title="project.fields.title"
          :subline="project.fields.subline"
          :img="project.fields.mainImage"
          :video="project.fields.mainVideo"
          :releaseDate="project.fields.releaseDate"
          :headlinePosition="project.fields.headlinePosition"
          :accentColor="project.fields.accentColor"
        />
      </template>

      <!-- CTA -->
      <section>
        <div class="inner">
          <div class="row">
            <div class="col col-12 text--center">
              <h3 class="--eyebrow --site-color mb1">
                {{ t.projects.cta.eyebrow }}
              </h3>
              <NuxtLink :to="localePath('projects')" class="tb3 tb4-s tb5-xl cta">
                <span>{{ t.projects.cta.btn[0] }}</span>
                <span>{{ t.projects.cta.btn[1] }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Services -->
    <section id="services" class="dynamic-bg--container pb0 animate--js">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl --site-color text--center">
            <span class="secondary">{{ t.services.title }}</span>
            <h2 class="primary">
              {{ t.services.title }}
            </h2>
          </div>
        </div>
      </div>
      <section class="section--xl dynamic-bg">
        <ThreejsConeBackground
          class="background"
          materialTexture="texture-cyan.png"
          :colorBackground="'#95EBFE'"
          :orbitControls="false"
        />
        <div class="inner">
          <div class="row justify-content--center">
            <div class="col col-12 col-s-11">
              <ul class="services--overview">
                <li v-for="(service, index) in services" :key="index">
                  <div class="topic tm --eyebrow">
                    {{ service.title }}
                  </div>
                  <ul class="mt1">
                    <li v-for="singleService in service.services" :key="`${index}-${slugify(singleService)}`" class="title tf2 tf3-xl --line-height-normal">
                      <NuxtLink :to="localePath({ name: 'projects', query: { [service.type]: singleService }})">
                        {{ singleService }}
                      </NuxtLink>
                    </li>
                  </ul>
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
import services from '~/assets/js/services'
import date from '@/mixins/date'

export default {
  name: 'HomePage',
  mixins: [date],
  asyncData({ i18n, $contentfulClient }) {
    return $contentfulClient.getEntries({
      content_type: 'project',
      order: 'fields.highlightOrder',
      select: 'fields,sys.id,sys.createdAt',
      limit: 10,
      locale: i18n.locale,
      'fields.highlightOrder[exists]': true,
    })
      .then(entries => {
        return {
          projects: entries.items
        }
      })
      .catch(e => console.error(e))
  },
  data() {
    return {
      images: {
        // aboutMe: "https://images.ctfassets.net/rlw7c1gzufpy/5wK2hatwH6hTyDYXceLuJX/0cbbc598dd4bb6c318b11c06a6872090/about-me.jpg",
        aboutMe: "https://images.ctfassets.net/rlw7c1gzufpy/6jsGA8FqgzP8mMBMTRw4b1/336ce75b09f2d650e0dee5b9426c087f/about-me-landscape.jpg",
        // aboutWork: "https://images.ctfassets.net/rlw7c1gzufpy/bnLGLKEkp3FfScQbAWgPS/dd59972bc054e7033189903c9b7442ef/about-workspace.jpg",
        aboutWork: "https://images.ctfassets.net/rlw7c1gzufpy/1FkJ5qrcXS6vtb7iZXTcSb/d787ca456362aa45afd1876a02aca625/about-workspace-landscape.jpg",
      }
    }
  },
  head() {
    return {
      title: 'Home',
      link: [
        { hid: 'favicon', rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon-purple.ico' },
        { hid: 'favicon-apple', rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-purple.ico' },
        { hid: 'favicon-32x32', rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32-purple.ico' },
        { hid: 'favicon-16x16', rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16-purple.ico' }
      ]
    }
  },
  computed: {
    t() {
      return this.$t('home')
    },
    isoCode() {
      return this.$i18n.localeProperties.code
    },
    listFormat() {
      return new Intl.ListFormat(this.isoCode, { style: 'long', type: 'conjunction' });
    },
    services() {
      return services
    },
  },
  methods: {
    resizeImageSrcSet(img, width, format) {
      return `${img}?w=${width}&fm=${format} 1x, ${img}?w=${width * 2}&fm=${format} 2x`
    },
    listOf(arr) {
      return this.listFormat.format(arr)
    },
    slugify(str) {
      return this.$slugify(str)
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
.tertiary {
  left: 0;
  right: 0;
  margin-left: 0;
  margin-right: 0;
}

// About
#about {
  --about-col-size: 540px;

  img {
    width: 100%;
    height: auto;
    display: block;

    &.image--about-me {
      box-shadow: 14px -14px 0 @color-project-solar;
    }
    &.image--about-work {
      box-shadow: 14px -14px 0 var(--site-accent);
    }
  }

  .col--about-me,
  .col--about-work {
    max-width: ~'min(var(--about-col-size), 100% / var(--columns, 12) * var(--column-fraction, 12))';
  }
  .col--about-work {
    margin-top: ~'calc(var(--section-padding) * 3.5)';
  }

  // Col sizes
  @media screen and (min-width: @vw-max-grid) {
    --about-col-size: 560px;
  }
  @media screen and (min-width: @vw-max-desktop) {
    --about-col-size: 640px;
  }
  @media screen and (min-width: @vw-min-desktop-large) {
    --about-col-size: 720px;
  }
}

// Projects
.rolling-title {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  text-indent: 0.5em;
  max-width: 100vw;
  text-shadow: 0 0 var(--site-color-50, @color-black-50);

  > * {
    animation: rollingTitle 20s linear infinite;
  }
}

@keyframes rollingTitle {
  0% { transform: translateX(-700%); }
  100% { transform: translateX(0%); }
}

.cta {
  > span:nth-child(1) { font-weight: 700; }
  > span:nth-child(2) { font-weight: 600; }

  &:hover {
    > span:nth-child(1) { font-weight: 600; }
    > span:nth-child(2) { font-weight: 700; }
  }
}

// Services
#services {
  ul.services--overview {
    .flex();
    grid-column-gap: 32px;
    grid-row-gap: 48px;

    li {
      flex: 500px 1 1;

      h3 {
        width: 100%;
      }
      .topic {
        display: block;
        width: 100%;
      }
      a {
        --transition-duration: 0.15s;
        --transition-timing-function: ease;

        &:hover {
          padding-left: 0.15em;
          text-decoration: underline;
        }
      }

      ul li {
        + li {
          margin-top: var(--list-margin, 10px);
        }
      }
    }

    // max. 959px
    @media screen and (max-width: @vw-max-grid) {
      --list-margin: 6px;
      grid-row-gap: 38px;
    }
  }
}

.container-mobile   { display: none; }
.container-desktop  { display: flex; }

@media screen and (max-width: @vw-min-tablet) {
  .container-mobile   { display: flex; }
  .container-desktop  { display: none; }
}

</style>
