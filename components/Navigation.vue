<template>
  <div class="row navigation-holder" :active="this.active">
    <nav>
      <ul>
        <li v-for="item in navItems" :key="item.key">
          <NuxtLink :to="localePath({ name: item.key })" :class="{ 'btn btn-border': item.button }">
            <span @click="navigationDeactivate()">{{ item.name }}</span>
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
      return this.$t('navigation');
    }
  }
}
</script>
