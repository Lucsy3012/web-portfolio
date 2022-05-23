<template>
  <section class="announcement">
    <p class="tm-2 --site-contrast text--center">
      {{ t.message }}
    </p>
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
  padding: 12px 30px;
  background: var(--site-color, @color-black);
}
</style>
