const contentful = require('contentful')

// Get all API information
let accessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN
let space = process.env.CONTENTFUL_SPACE_ID
let host = process.env.CONTENTFUL_DELIVERY_HOST

// Development environment
if (process.env.NODE_ENV === 'development') {
  accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
  host = process.env.CONTENTFUL_PREVIEW_HOST
}

// Client
const client = contentful.createClient({
  space,
  accessToken,
  host,
})

function redirectMap (items) {
  const rearrangedItems = items.map((item) => {
    const obj = {}

    obj.from = '^' + item.fields.oldUrl + '$' // the ^ and $ will prevent it from acting as a wildcard
    obj.to = item.fields.newUrl
    obj.statusCode = item.fields.statusCode

    return obj
  })

  return rearrangedItems
}

export default async function contentfulRedirects() {
  return await client.getEntries({
    content_type: 'redirects',
    limit: 1000,
    select: 'fields'
  }).then((entries) => {
    return redirectMap(entries.items)
  }).catch(error => console.error)
}
