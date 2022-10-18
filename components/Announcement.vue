<template>
  <section class="announcement">
    <NuxtLink class="tm-2 --site-contrast" :to="localePath({ name: t.linkInternal })">
      {{ t.message }}
    </NuxtLink>
  </section>
</template>

<script>
export default {
  name: 'Announcement',
  computed: {
    t() {
      return this.$t('announcement')
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) "@/assets/less/global";

section.announcement {
  padding: 0;

  p, a {
    display: block;
    padding: 12px 30px;
    background: var(--site-color, @color-black);
    text-align: center;
  }
  a:hover {
    color: var(--site-contrast-75, @color-white-75)
  }
}
</style>
