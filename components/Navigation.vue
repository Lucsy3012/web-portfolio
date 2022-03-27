<template>
  <div class="row navigation-holder" :active="this.active">
    <nav>
      <ul>
        <li v-for="(item, index) in navItems" :key="index">
          <NuxtLink :to="localePath({ name: item })">
            <span @click="navigationDeactivate()">{{ $t('navigation.' + item) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="menu-opener" @click="navigationToggle()">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
  methods: {
    navigationToggle() {
      return this.active = !this.active;
    },
    navigationDeactivate() {
      return this.active = false;
    }
  },
  computed: {
    navItems() {
      return Object.keys(this.$t('navigation'));
    }
  }
}
</script>
