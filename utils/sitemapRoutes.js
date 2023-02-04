const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
})

module.exports = async function sitemapRoutes() {

  // Get all API information
  // --------------------------------------
  const projectsDE = await client.getEntries({ content_type: 'project',  locale: 'de' }).then(entries => entries.items)
  const projectsEN = await client.getEntries({ content_type: 'project',  locale: 'en' }).then(entries => entries.items)

  // Compose routes
  // --------------------------------------

  const projectsRoutesDE = projectsDE.map(i => {
    return {
      url: `/de/projekte/${i.fields.slug}`,
      changefreq: 'monthly',
      priority: 1,
      lastmod: i.sys.updatedAt,
    }
  });

  const projectsRoutesEN = projectsEN.map(i => {
    return {
      url: `/en/projects/${i.fields.slug}`,
      changefreq: 'monthly',
      priority: 1,
      lastmod: i.sys.updatedAt
    }
  });

  // Combine routes
  // --------------------------------------
  const routes = [
    projectsRoutesDE,
    projectsRoutesEN
  ]

  return routes.flat();
}
