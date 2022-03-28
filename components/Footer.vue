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
            <div class="grid-item-2">
              <Logo height="40" />
            </div>
            <div class="grid-item-3">
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
              <div>
                Alle Rechte vorbehalten
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

<style lang="less" scoped>
@import (reference) "../assets/less/global";

.grid {
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr;

  .grid-item-1,
  .grid-item-2,
  .grid-item-3 {
    justify-items: center;
  }

  @media screen and (min-width: @vw-min-tablet) {
    .grid-item-1 {
      justify-self: flex-start;
    }
    .grid-item-3 {
      justify-self: flex-end;
    }
  }
}

.footer-primary {
  .row {
    position: relative;
    padding: 10px 0;

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
  background-color: var(--site-color, @color-black);
  color: var(--site-contrast, @color-white);
}
</style>
