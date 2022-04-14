require('dotenv').config()

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const sitemapRoutes = require('./utils/sitemapRoutes');

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Nuxt Starter',
    meta: [
      { charset: 'utf-8', hid: 'charset' },
      { name: 'author', content: 'Lucas Dietrich' },
      { name: 'robots', content: 'index, follow' },
      { name: 'application-name', content: 'Nuxt Starter' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover' },
      { itemprop: 'copyrightYear', content: currentYear },
      { itemprop: 'isFamilyFriendly', content: 'true' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '@assets/less/global.less',
      lang: 'less'
    }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/contentful' },
    { src: '~/plugins/animate.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
  ],

  i18n: {
    locales: [
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.js' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.js' },
    ],
    baseUrl: process.env.HOSTNAME,
    defaultLocale: 'de',
    langDir: '~/locales/',
    strategy: 'prefix',
    parsePages: false,
    seo: true,
    pages: {
      'legal': {
        de: '/impressum',
        en: '/legal-notice',
      },
      'about': {
        de: '/ueber-mich',
        en: '/about-me',
      },
      'projects': {
        de: '/projekte',
        en: '/projects',
      },
      'projects/_slug': {
        de: '/projekte/:slug',
        en: '/projects/:slug',
      },
      'contact': {
        de: '/kontakt',
        en: '/contact',
      },
    }
  },

  sitemap: {
    hostname: process.env.HOSTNAME,
    path: '/sitemap.xml',
    gzip: true,
    routes() {
      return sitemapRoutes()
    },
    exclude: [
      '/news',
      '/legal',
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three',
      'dat.gui',
    ],
    optimization: {
      minimize: true
    }
  },
}
