<template>
  <nav id="footer-navigation">
    <ul class="tm-1 t-s justify-content--center justify-content--end-s">
      <li>
        <NuxtLink :to="localePath('news')">{{ $t('footer.navigation.privacy') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('legal')">{{ $t('footer.navigation.legal') }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="less">
  #footer-navigation {

  }
</style>