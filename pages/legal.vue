<template>
  <div class="container">
    <section v-animate-in-view class="dynamic-bg--container pb0 in">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl --site-color text--center">
            <span class="secondary">{{ t.title }}</span>
            <h1 class="primary">
              {{ t.title }}
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
                {{ t.address.title }}
              </h2>
              <p class="tm-1 tm-s">
                {{ t.address.name }}<br>
                {{ t.address.street }}<br>
                {{ t.address.city }} {{ t.address.zip }}<br>
              </p>
            </div>
            <div class="col col-12 col-s-11">
              <h2 class="tf1 tf2-s tf3-l">
                {{ t.representative.title }}
              </h2>
              <p class="tm-1 tm-s">
                {{ t.representative.name }}
              </p>
            </div>
            <div class="col col-12 col-s-11">
              <h2 class="tf1 tf2-s tf3-l">
                {{ t.contact.title }}
              </h2>
              <p class="tm-1 tm-s">
                {{ t.contact.phone.label }}: <a :href="`tel:${ t.contact.phone.value }`">{{ t.contact.phone.value }}</a>
              </p>
              <p class="tm-1 tm-s">
                {{ t.contact.email.label }}: <a :href="`mailto:${ t.contact.email.value }`">{{ t.contact.email.value }}</a>
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
          v-for="(section, index) in t.disclaimers"
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
            {{ t.createdBy.desc }}: <a :href="t.createdBy.href" target="_blank">{{ t.createdBy.href }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LegalNotice",
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
