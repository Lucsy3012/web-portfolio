export default ({ app }, inject) => {
  const slugify = require('slugify')
  const isoCode = app.i18n.localeProperties.code;

  inject('slugify', str => slugify(str ?? '', {
    lower: true,
    locale: isoCode
  }))
}
