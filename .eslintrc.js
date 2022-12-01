module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:nuxt/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['nuxt'],
  globals: {
    $nuxt: true,
  },
  rules: {
    indent: ['error', 2],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'only-multiline',
      }
    ],
    'prefer-destructuring': ['warn', { object: true, array: false }],
    'no-unused-vars': ['warn'],
    'vue/require-default-prop': 0,
    'vue/html-indent': [
      'error',
      2,
      {
        alignAttributesVertically: true,
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3,
        multiline: 1,
      }
    ],
    'vue/multi-word-component-names': ['error', {
      ignores: ['story'],
    }],
    'vue/attribute-hyphenation': ['error', 'never', {
      ignore: []
    }],
    'no-const-assign': ['warn'],
    'no-this-before-super': ['warn'],
  },
}
