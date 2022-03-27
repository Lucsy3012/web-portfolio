<template>
  <div id="footer-contact">

    <!-- Address -->
    <address class="icon-label">
      <a :href="$t('footer.address.link.href')" :title="$t('footer.address.link.title')">
        <span class="street">{{ $t('footer.address.street') }}</span>
        <span class="city">{{ $t('footer.address.zip') }} {{ $t('footer.address.city') }}</span>
      </a>
    </address>

    <!-- Mail -->
    <div class="icon-label mail">
      <a :href="`tel:${$t('footer.contact.phone')}`" :title="$t('footer.contact.phoneTitle')">
        <span>{{ $t('footer.contact.phone') }}</span>
      </a>
    </div>

    <!-- Phone -->
    <div class="icon-label phone">
      <a :href="`mailto:${$t('footer.contact.email')}`" :title="$t('footer.contact.emailTitle')">
        <span>{{ $t('footer.contact.email') }}</span>
      </a>
    </div>
  </div>
</template>
