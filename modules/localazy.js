import url from 'url'
import safeStringify from 'safe-json-stringify'
import { export404, unwrap } from '../utils/fetch'

export default function () {
  const token = this.options.privateRuntimeConfig.localazyToken
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  // APIs
  this.nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api/translations/get-translation', getTranslation)
  })

  async function getTranslation (req, res) {
    try {
      const { file, langCode } = url.parse(req.url, true).query
      const requestUrl = 'https://api.localazy.com/projects/portfolio-website/files/' + file + '/keys/' + langCode

      const { json } = await unwrap(await fetch(requestUrl, { headers }))

      // Restructure the translations
      const restructuredTranslations = restructureArrayOfObjects(json.keys)
      const translations = convertObjectToNested(restructuredTranslations)

      // Send response from Localazy
      sendJson(translations, res)
    } catch (error) {
      export404(res, error)
    }
  }

  function sendJson (data, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(safeStringify(data))
  }

  // Helpers
  // ---------------------

  // Combine nested keys into one string in camelCase
  // Example: ['shopware', 'storefront', 'general', 'home'] => shopware.storefront.general.home
  function combineNestedKeys (key) {
    return key.join('.')
  }

  // Create new object just with the keys and values; scrap the rest
  // Example: { key: 'shopwareStorefrontGeneralHome', value: 'Home' } => { shopwareStorefrontGeneralHome: 'Home' }
  function restructureArrayOfObjects (arr) {
    const obj = {}
    arr.forEach((element) => {
      obj[combineNestedKeys(element.key)] = element.value
    })
    return obj
  }

  // Convert and array with objects structures in it to a singular nested object
  // Example: [{ 'shopware.storefront.general.home': 'Home' }] => { shopware: { storefront: { general: { home: 'Home' } } } }
  function convertObjectToNested (obj) {
    const result = {}
    for (const key in obj) {
      const keys = key.split('.')
      let nestedObj = result
      keys.forEach((nestedKey, index) => {
        if (!nestedObj.hasOwnProperty(nestedKey)) {
          nestedObj[nestedKey] = {}
        }
        if (index === keys.length - 1) {
          nestedObj[nestedKey] = obj[key]
        } else {
          nestedObj = nestedObj[nestedKey]
        }
      })
    }
    return result
  }
}
