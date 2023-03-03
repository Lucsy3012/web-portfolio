export default [

  // Resolve Open Redirect Issue
  { from: '\\\\.*', to: '/', statusCode: 301, }
]
