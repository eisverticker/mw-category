# mw-category

This library enables users to access members of a category from a mediawiki-compatible source.

## Resources

[API Reference](https://eisverticker.github.io/mw-category/)

## Installation

### Default

```
npm install mw-category
```

### Global (CLI)

```
npm install -g mw-category
```

## Usage

### CLI example

```
mw-category https://en.wikipedia.org/w/api.php Category:Punctuation
```

If the --csv option is given then the resulting member strings will be quoted.

### Javascript example

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
