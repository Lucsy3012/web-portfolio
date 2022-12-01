module.exports = {
  env: {
    es2021: true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    quotes: [2, "double", "avoid-escape"],
    indent: ["error", 2],
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "only-multiline"
      }
    ]
  }
}
