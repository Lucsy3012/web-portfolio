export default (context, inject) => {
  const contentful = require('contentful')

  // Importing runtime config
  const runtimeConfig = context.$config

  // Creating client
  const client = contentful.createClient({
    space: runtimeConfig.contentfulSpaceId,
    accessToken: runtimeConfig.contentfulAccessToken,
    environment: runtimeConfig.contentfulEnvironment,
    host: runtimeConfig.contentfulHost,
  })

  inject('contentfulClient', client)
}
