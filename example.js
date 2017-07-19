const MwCategory = require('./index.js')
const CategoryLoader = MwCategory.CategoryLoader
const buildSourceUrl = MwCategory.buildSourceUrl
const MwSources = MwCategory.MwSources

let sourceUrl = buildSourceUrl(MwSources.Wiktionary, 'en')
let wiktionaryCategoryLoader = new CategoryLoader(sourceUrl)

wiktionaryCategoryLoader.loadMembers('Category:Spanish basic words')
  .then(
    (members) => {
      members.forEach(
        (page) => {
          console.log('page id', page.id)
          console.log('page title', page.title)
        }
      )
    }
  )
