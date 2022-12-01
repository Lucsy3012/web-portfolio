<template>
  <nav id="footer-navigation">
    <ul>
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink :to="localePath({ name: item })">
          {{ $t('footer.navFooter.' + item) }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    navItems() {
      return Object.keys(this.$t('footer.navFooter'));
    }
  }
}
</script>
