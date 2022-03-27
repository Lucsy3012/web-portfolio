const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
})

module.exports = async function sitemapRoutes() {

  // Get all API information
  // --------------------------------------
  const newsDE = await client.getEntries({ content_type: 'news',  locale: 'de' }).then(entries => entries.items)
  const newsEN = await client.getEntries({ content_type: 'news',  locale: 'en' }).then(entries => entries.items)

  // Compose routes
  // --------------------------------------
  const newsRouteDE = {
    url: `/de/neuigkeiten`,
    changefreq: 'weekly',
    priority: 1
  };
  const newsRouteEN = {
    url: `/en/news`,
    changefreq: 'weekly',
    priority: 1
  };

  const newsRoutesDE = newsDE.map(i => {
    return {
      url: `/de/neuigkeiten/${i.fields.slug}`,
      changefreq: 'monthly',
      // priority: 1,
      lastmod: i.sys.updatedAt
    }
  });

  const newsRoutesEN = newsEN.map(i => {
    return {
      url: `/en/news/${i.fields.slug}`,
      changefreq: 'monthly',
      // priority: 1,
      lastmod: i.sys.updatedAt
    }
  });

  const legalRouteDE = {
    url: `/de/impressum`,
    changefreq: 'monthly',
    priority: 0.1
  };
  const legalRouteEN = {
    url: `/en/legal-notice`,
    changefreq: 'monthly',
    priority: 0.1
  };

  // Combine routes
  // --------------------------------------
  const routes = [
    newsRouteDE,
    newsRoutesDE,
    newsRouteEN,
    newsRoutesEN,
    legalRouteDE,
    legalRouteEN,
  ]

  return routes.flat();
}