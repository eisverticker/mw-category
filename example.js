const MwCategory = require('./index.js')

const CategoryLoader = MwCategory.CategoryLoader
const MwSources = MwCategory.MwSources

let loader = CategoryLoader.createFromTemplate(MwSources.Wiktionary, 'en')
//let loader = CategoryLoader.createFromUrl('https://en.wikipedia.org/w/api.php')

loader.loadMembers('Category:Spanish basic words')
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
  .catch(
    (error) => console.log("error: could not load members", error)
  )
