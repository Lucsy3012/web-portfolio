<template>
  <nav id="footer-legal">
    <ul>
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink :to="localePath({ name: item })">{{ $t('footer.navLegal.' + item) }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    navItems() {
      return Object.keys(this.$t('footer.navLegal'));
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "../assets/less/global";

a {
  color: @color-white-75;

  &:hover,
  &.nuxt-link-active {
    color: @color-white;
  }
}
</style>
