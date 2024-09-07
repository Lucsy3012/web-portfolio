# nuxt-starter

## Requirements
* npm
* node v16

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Troubleshooting

#### On Crypto module error
`Error: error:0308010C:digital envelope routines::unsupported`

```bash
# change node version to 16
$ nvm use 16
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Contentful setup

```bash
# install contentful-cli
$ npm install -g contentful-cli
```

For detailed explanation on how things work, check out [Contentful JS SDK Documentation](https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/).

## Export Contentful data

```bash
# install contentful-cli
$ contentful space export
```

## Import Contentful data to new project

```bash
# configure the contentful account (also in .env file)
# https://github.com/contentful/contentful-cli/tree/master/docs/space/export
$ contentful config list
$ contentful config add --management-token <management-token>
$ contentful config add --space-id <space-id>
$ contentful config add --environment-id <environment-id>

# import contentful data from export data
# https://github.com/contentful/contentful-import
$ contentful space import --space-id <space-id>
```

# Scripts

## Compress images in folder

```bash
# Images to .webp
npx @squoosh/cli --webp '{quality:80}' -d .\static\og-image-reduced .\static\og-image

# Images to .webp and resize to 1200 x 630
npx @squoosh/cli --resize '{width:1200,height:630}' --webp '{quality:80}' -d .\static\og-image-reduced .\static\og-image

# Images to .webp and .jpg and resize to 1200 x 630
npx @squoosh/cli --resize '{width:1200,height:630}' --webp '{quality:80}' --mozjpeg '{quality:80}' -d .\static\og-image-reduced .\static\og-image

# Images to .webp and .jpg and resize to 1200 x 630 (half size) and 2400 x 1260 (full size) with suffix
npx @squoosh/cli --resize '{width:2400,height:1260}' --webp '{quality:80}' --mozjpeg '{quality:80}' -d .\static\og-image-reduced .\static\og-image -s "-2x"
npx @squoosh/cli --resize '{width:1200,height:630}' --webp '{quality:80}' --mozjpeg '{quality:80}' -d .\static\og-image-reduced .\static\og-image
```
