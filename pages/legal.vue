<template>
  <div class="container">
    <section class="dynamic-bg--container pb0 animate--js in">
      <div class="row dynamic-bg--offset--33">
        <div class="col col-12">
          <div class="headline tb5 tb6-m tb7-xl --site-color text--center">
            <span class="secondary">{{ t.title }}</span>
            <h1 class="primary">{{ t.title }}</h1>
          </div>
        </div>
      </div>
      <section class="section--xl dynamic-bg">
        <ThreejsConeBackground
          class="background"
          materialTexture="texture-yellow.png"
          :orbitControls="false"
        />
        <div class="inner">
          <div class="row justify-content--center">
            <div class="col col-12 col-s-11">
              <h2 class="tf1 tf2-s tf3-l">{{ t.address.title }}</h2>
              <p class="tm-1 tm-s mt2">
                {{ t.address.name }}<br/>
                {{ t.address.street }}<br/>
                {{ t.address.city }} {{ t.address.zip }}<br/>
              </p>
            </div>
            <div class="col col-12 col-s-11">
              <h2 class="tf1 tf2-s tf3-l">{{ t.representative.title }}</h2>
              <p class="tm-1 tm-s mt2">
                {{ t.representative.name }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "Legal notice",
  computed: {
    t() {
      return this.$t('legal')
    }
  }
}
</script>
