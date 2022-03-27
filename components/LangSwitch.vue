<template>
  <div id="language-switch" class="language-switch">
    <div class="language--display">
      <span>{{ this.$i18n.locale.toUpperCase() }}</span>
      <span class="separator"></span>
      <span>{{ this.$i18n.localeProperties.name }}</span>
    </div>
    <div class="language--tooltip">
      <ul>
        <li v-for="locale in availableLocales" :key="locale.code">
          <!-- <NuxtLink :to="switchLocalePath(locale.code)">{{ locale.name }}</NuxtLink> -->
          <NuxtLink :to="`/${locale.code}`">{{ locale.name }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLocale: this.$i18n.locale,
      availableLocales: this.$i18n.locales
    }
  },
  mounted() {
    console.log(this.$i18n)
  }
}
</script>