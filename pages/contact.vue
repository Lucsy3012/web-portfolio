<template>
  <div class="container">
    <section class="dynamic-bg--container pb0 animate--js in">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl --site-color text--center">
            <span class="secondary">{{ t.title }}</span>
            <h1 class="primary">{{ t.title }}</h1>
          </div>
        </div>
      </div>
      <section class="section--xl dynamic-bg">
        <ThreejsConeBackground
          class="background"
          materialTexture="texture-green.png"
          :orbitControls="false"
        />
        <div class="inner">
          <div class="row justify-content--center">
            <div class="col col-12 col-s-11 text--center">
              <ul>
                <li v-for="(item, index) in t.links" :key="index">
                  <a :href="item.href" :title="item.name" target="_blank" class="tb4 tb5-s tb6-l">{{ item.name }}</a>
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
  name: "Contact",
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
        { hid: 'favicon', rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon-green.ico' },
        { hid: 'favicon-apple', rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-green.ico' },
        { hid: 'favicon-32x32', rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32-green.ico' },
        { hid: 'favicon-16x16', rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16-green.ico' },
      ]
    }
  },
  computed: {
    t() {
      return this.$t('contact')
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "../assets/less/global";

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
</style>
