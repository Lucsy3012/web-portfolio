const contentful = require('contentful')

console.log('process', process)
console.log('process.env', process.env)
console.log('CONTENTFUL_DELIVERY_ACCESS_TOKEN', process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN)

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
})

module.exports = client
