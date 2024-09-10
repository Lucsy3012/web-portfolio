import getRedirects from './utils/redirects';
require('dotenv').config()

// Date variables
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// Sitemap
const sitemapRoutes = require('./utils/sitemapRoutes');

// Redirects
const allRedirects = getRedirects();

// Add dev specific plugins
let devPlugins = [];

if (process.env.NODE_ENV !== 'production') {
  devPlugins = [
    { src: '~/plugins/perf', mode: 'client', ssr: false }
  ]
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Runtime Config
  publicRuntimeConfig: {
    baseURL: process.env.HOSTNAME || 'https://lucasdietrich.de',
    contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
    contentfulEnvironment: process.env.CONTENTFUL_ENVIRONMENT,
    contentfulHost: process.env.CONTENTFUL_HOST,
    contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
  privateRuntimeConfig: {
    // Nothing here yet
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s ▹ Lucas Dietrich ▸ Portfolio',
    meta: [
      { charset: 'utf-8', hid: 'charset' },
      { name: 'author', content: 'Lucas Dietrich' },
      { name: 'robots', content: 'index, follow' },
      { name: 'application-name', content: 'Lucas Dietrich - Portfolio' },
      { name: 'theme-color', content: '#FFFFFF' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover' },
      { itemprop: 'copyrightHolder', content: 'Lucas Dietrich' },
      { itemprop: 'copyrightYear', content: currentYear },
      { itemprop: 'isFamilyFriendly', content: 'true' },

      // Meta
      { hid: 'description', name: 'description', content: 'Creative Developer based in Münster' },
      { hid: 'image', itemprop: 'image', content: '/og-image/og-image-home.jpg' },

      // Open Graph
      { hid: 'og:site_name', property: 'og:site_name', content: 'Lucas Dietrich - Portfolio' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: 'Creative Developer based in Münster' },
      { hid: 'og:image', property: 'og:image', content: '/og-image/og-image-home.jpg' },

      // Twitter
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@lucsy3012' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Creative Developer based in Münster' },
      { hid: 'twitter:image', name: 'twitter:image', content: '/og-image/og-image-home.jpg' },

      // Apple
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'Lucas Dietrich - Portfolio' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#000000' }
    ],
    link: [
      // https://favicon.io/favicon-converter/
      { hid: 'favicon', rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon/favicon-magenta.ico' },
      { hid: 'favicon-apple', rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-magenta.ico' },
      { hid: 'favicon-32x32', rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32-magenta.ico' },
      { hid: 'favicon-16x16', rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16-magenta.ico' }
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
    { src: '~/plugins/slugify' },
    { src: '~/plugins/animate.js', mode: 'client', ssr: false },
    { src: '~/plugins/vendor.client.js' },
    ...devPlugins
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
    '@nuxtjs/redirect-module'
  ],

  // Redirects
  redirect: async () => await allRedirects,

  // Localization
  i18n: {
    locales: [
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.js' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.js' }
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
        en: '/legal-notice'
      },
      'about': {
        de: '/ueber-mich',
        en: '/about-me'
      },
      'projects/index': {
        de: '/projekte',
        en: '/projects'
      },
      'projects/_slug': {
        de: '/projekte/:slug',
        en: '/projects/:slug'
      },
      'experiments/index': {
        de: '/experimente',
        en: '/experiments'
      },
      'book': {
        de: '/buch',
        en: '/book'
      },
      'contact': {
        de: '/kontakt',
        en: '/contact'
      }
    }
  },

  sitemap: {
    hostname: process.env.HOSTNAME,
    path: '/sitemap.xml',
    gzip: true,
    routes() {
      return sitemapRoutes()
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three',
      'gsap'
    ],
    optimization: {
      minimize: true
    }
  },
}
