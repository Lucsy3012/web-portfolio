<template>
  <footer>

    <!-- Primary -->
    <section class="footer-primary p0">
      <div class="inner">
        <div class="row text--center justify-content--center align-items--center">
          <div class="col grid">
            <div class="grid-item-1">
              <LangSwitch />
            </div>
            <div class="grid-item-2 display--none display--block-s">
              <Logo />
            </div>
            <div class="grid-item-3 display--none display--block-s">
              <FooterNavigation />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Secondary -->
    <section class="footer-secondary p0">
      <div class="inner">
        <div class="row text--center justify-content--center align-items--center">
          <div class="col grid">
            <div class="grid-item-1">
              <div class="separator--display">
                <span>{{ t.footer.copyright.text }}</span>
                <span class="separator"></span>
                <a :href="`mailto:${t.footer.copyright.email}`">{{ t.footer.copyright.email }}</a>
              </div>
            </div>
            <div class="grid-item-2">
              <FooterSocial />
            </div>
            <div class="grid-item-3">
              <FooterLegal />
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    t() {
      return {
        footer: this.$t('footer')
      }
    }
  }
}
</script>

<style lang="less">
@import (reference) "../assets/less/global";

footer {
  --link-color: var(--site-color-50, @color-black-50);
  --link-color-active: var(--site-color, @color-black);

  position: relative;
  z-index: 5;

  .logo {
    display: flex;
    height: 26px;
  }

  // Link Defaults
  a {
    --transition-property: color;
    color: var(--link-color);
    .transit();

    // Hover
    &:hover {
      color: var(--link-color-active);
    }

    // Active
    &.nuxt-link-active {
      font-weight: 500;
      color: var(--link-color-active);
    }
  }

  // Navigation Defaults
  nav {
    --transition-property: background;
    --navigation-gap: 10px;
    .transit();

    ul {
      .flex();
      justify-content: center;
      list-style: none;

      li {
        padding: 0 var(--navigation-gap, 10px);

        a {
          --transition-property: color;
          position: relative;
          display: inline-block;
          padding: var(--navigation-gap, 10px);
        }
      }
    }
  }

  // Grid Defaults
  .grid {
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    .grid-item-1,
    .grid-item-2,
    .grid-item-3 {
      justify-items: center;
    }

    @media screen and (min-width: @vw-min-tablet) {
      grid-template-columns: 1fr auto 1fr;

      .grid-item-1 {
        justify-self: flex-start;
      }
      .grid-item-2 {
        justify-self: center;
      }
      .grid-item-3 {
        justify-self: flex-end;
      }
    }
  }

  .footer-primary {
    .row {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: ~'calc(var(--gap-column) / 2)';
        right: ~'calc(var(--gap-column) / 2)';
        border-top: 3px solid var(--site-color, @color-black);
      }
    }
  }

  .footer-secondary {
    --link-color: var(--site-contrast-75, @color-white-75);
    --link-color-active: var(--site-contrast, @color-white);

    background-color: var(--site-color, @color-black);
    color: var(--site-contrast, @color-white);
    font-size: clamp(12px, 4.0vw, 14px); // 14px

    nav {
      --navigation-gap: 8px;
    }
  }

  .footer-primary,
  .footer-secondary {
    .row {
      padding: 10px 0;
    }
  }

  // Separators
  .separator--display {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;

    .separator {
      width: 14px;
      height: 1px;
      margin: 0 10px;
      border-top: 2px solid var(--link-color-active);
      opacity: .33;
    }
  }

  // Media Queries
  @media screen and (max-width: @vw-max-desktop-large) {
    .logo {
      height: 20px
    }
  }
  @media screen and (max-width: @vw-max-desktop) {
    .logo {
      display: none;
    }
    nav {
      --navigation-gap: 6px;
    }
  }
  @media screen and (max-width: @vw-max-tablet) {
    .footer-primary,
    .footer-secondary {
      .row {
        padding: 20px 0;
      }
    }

    // Footer Secondary
    .footer-secondary {
      .grid {
        grid-gap: 10px;

        .grid-item-1 {
          margin-top: 10px;
          padding-top: 24px;
          border-top: 1px solid var(--site-contrast-25);
          order: 3;
        }
      }
    }
  }
}

</style>
