const contentful = require('contentful')

// Get all API information
let space = process.env.CONTENTFUL_SPACE_ID
let accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
let environment = process.env.CONTENTFUL_ENVIRONMENT
let host = process.env.CONTENTFUL_HOST

// Client
const client = contentful.createClient({
  space,
  accessToken,
  environment,
  host
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
