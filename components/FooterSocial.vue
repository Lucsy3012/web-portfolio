<template>
  <nav id="footer-social">
    <ul>
      <li v-for="(item, index) in navItems" :key="index">
        <a :href="$t('footer.navSocial.' + item + '.href')" target="_blank" :class="$t('footer.navSocial.' + item + 'name')"></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    navItems() {
      return Object.keys(this.$t('footer.navSocial'));
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "../assets/less/global";

#footer-social {
  ul {
    display: grid;
    align-items: center;
    grid-auto-columns: 1fr;
    grid-gap: 24px;

    li {
      grid-row: 1;
    }
  }
  a {
    width: 22px;
    height: 22px;
    .transit();

    &:hover {
      opacity: .5;
    }
  }
}
</style>
