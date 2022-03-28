<template>
  <div class="container">
    <section>
      <div class="inner">
        <div class="row">
          <div class="col col-12">
            <h1 class="tb6 tb7-m">{{ t.projects.title }}</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import client from '~/plugins/contentful'
export default {
  asyncData({ i18n }) {
    return client.getEntries({
      content_type: 'projects',
      order: '-sys.createdAt',
      locale: i18n.locale
    })
      .then(entries => {
        return {
          projects: entries.items
        }
      })
      .catch(e => console.error(e))
  },
  computed: {
    t() {
      return {
        projects: this.$t('projects')
      }
    }
  }
}
</script>
