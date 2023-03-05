<template>
  <div class="container">
    <section v-animate-in-view class="dynamic-bg--container pb0 in">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl --site-color text--center">
            <span class="secondary">{{ translations.title }}</span>
            <h1 class="primary">
              {{ translations.title }}
            </h1>
          </div>
        </div>
      </div>
      <section class="section--xl dynamic-bg">
        <ThreejsConeBackground
          class="background"
          materialTexture="texture-yellow.png"
          :colorBackground="'#FEE195'"
          :orbitControls="false"
        />
        <div class="inner">
          <div class="row justify-content--center">
            <div class="col col-12 col-s-11">
              <h2 class="tf1 tf2-s tf3-l">
                {{ translations.address.title }}
              </h2>
              <p class="tm-1 tm-s">
                {{ translations.address.name }}<br>
                {{ translations.address.street }}<br>
                {{ translations.address.city }} {{ translations.address.zip }}<br>
              </p>
            </div>
            <div class="col col-12 col-s-11">
              <h2 class="tf1 tf2-s tf3-l">
                {{ translations.representative.title }}
              </h2>
              <p class="tm-1 tm-s">
                {{ translations.representative.name }}
              </p>
            </div>
            <div class="col col-12 col-s-11">
              <h2 class="tf1 tf2-s tf3-l">
                {{ translations.contact.title }}
              </h2>
              <p class="tm-1 tm-s">
                {{ translations.contact.phone.label }}: <a :href="`tel:${ translations.contact.phone.value }`">{{ translations.contact.phone.value }}</a>
              </p>
              <p class="tm-1 tm-s">
                {{ translations.contact.email.label }}: <a :href="`mailto:${ translations.contact.email.value }`">{{ translations.contact.email.value }}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>

    <!-- Disclaimer -->
    <section id="disclaimers">
      <div class="inner">
        <div
          v-for="(section, index) in translations.disclaimers"
          :key="index"
          class="row justify-content--center"
          :class="{ 'mt4': index !== 0 }"
        >
          <div class="col col-12 col-s-11">
            <h2 class="tf1 tf2-s tf3-xl --site-color animate headlineAppearFromBottom pt2">
              {{ section.title }}
            </h2>
            <p class="t-2 t-1-s --line-height-2">
              {{ section.desc }}
            </p>
          </div>
        </div>
        <div class="row justify-content--center">
          <div class="col col-12 col-s-11">
            {{ translations.createdBy.desc }}: <a :href="translations.createdBy.href" target="_blank">{{ translations.createdBy.href }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LegalNotice",
  async asyncData({ i18n, $axios }) {
    const langCode = i18n.localeProperties.code
    const translations = await $axios.$get(`api/translations/get-translation`, {
      params: {
        file: '_e1153340100901', // https://localazy.com/p/portfolio-website/files/15334/901
        langCode
      }
    })

    return {
      translations
    }
  },
  data () {
    return {
      translations: {}
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
        { hid: 'favicon', rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon-yellow.ico' },
        { hid: 'favicon-apple', rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-yellow.ico' },
        { hid: 'favicon-32x32', rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32-yellow.ico' },
        { hid: 'favicon-16x16', rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16-yellow.ico' }
      ]
    }
  },
  computed: {
    t() {
      return this.$t('legal')
    }
  }
}
</script>

<style lang="less" scoped>
h2 + p {
  margin-top: 20px;
}
p {
  margin-bottom: 0;

  + p {
    margin-top: 0;
  }
}
#disclaimers {
  p {
    max-width: 840px;
  }
}
</style>
