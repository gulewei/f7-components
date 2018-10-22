var ghpages = require('gh-pages')

console.log('gh-pages start')
ghpages.publish('site', function (err) { 
  console.log('gh-pages published')
})
