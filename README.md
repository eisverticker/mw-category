# mw-category
This library enables users to access members of a category
from a mediawiki-compatible source.

## Resources
* [API Reference](https://eisverticker.github.io/mw-category/)

## Installation
```
npm install mw-category
```

## Usage
### Example
```javascript
const MwCategory = require('mw-category')

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
```

### loadMembers-Method
Returns an Array of _CategoryItem_ as a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises):
```json
[
  {
    "id": 43130,
    "title": "vino"
  },
  {
    "id": 43709,
    "title": "tortilla"
  }
]
```

If an error occurs then you can [catch it](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).


## License

[MIT](LICENSE)
