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
      <section class="section--xl dynamic-bg dynamic-bg--green">
        <div class="background"></div>
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
        font-weight: 800;
      }
    }
  }
}
</style>
