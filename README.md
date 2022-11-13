# mw-category

Tool for displaying members of a category from a mediawiki-compatible source.

## Resources

[API Reference](https://eisverticker.github.io/mw-category/)

## Usage

### CLI

There are several ways to provide the source platform of the category.

By using a [preset](./lib/mw-sources.js):

```shell
npx mw-category wikipedia:en Category:Punctuation
```

Or by using a custom url:

```shell
npx mw-category https://en.wikipedia.org/w/api.php Category:Punctuation
```

If the `--csv` option is given then the resulting member strings will be wrapped in double quotes.

### Programmatic

Install as dependency:

```shell
npm install mw-category
```

And use the module like this:

```javascript
import { CategoryLoader, MwSources } from 'mw-category'

let loader = CategoryLoader.createFromTemplate(MwSources.wiktionary, 'en')
//  let loader = CategoryLoader.createFromUrl('https://en.wikipedia.org/w/api.php')

try {
  const members = await loader.loadMembers('Category:Spanish basic words')
  members.forEach(
    (page) => {
      console.log('page id', page.id)
      console.log('page title', page.title)
    }
  )
} catch (error) {
  (error) => console.log("error: could not load members", error)
}
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

Make sure to [catch errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

## Global Installation (CLI)

```shell
npm install -g mw-category
```

## License

[MIT](LICENSE)
