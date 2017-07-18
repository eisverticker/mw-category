# mw-category
This library enables users to access members of a category
from a mediawiki-compatible source.

## Installation
```
npm install mw-category
```

## Usage
```javascript
const MwCategory = require('mw-category');
const CategoryLoader = MwCategory.CategoryLoader;
const buildSourceUrl = MwCategory.buildSourceUrl;
const MwSources = MwCategory.MwSources;

let sourceUrl = buildSourceUrl(MwSources.Wiktionary, 'en');
let wiktionaryCategoryLoader = new CategoryLoader(sourceUrl);

wiktionaryCategoryLoader.loadMembers('Category:Spanish basic words')
  .then(
    (members) => {
      members.forEach(
        (page) => {
          console.log("page id", page.id);
          console.log("page title", page.title);
        }
      );
    }
  );

```
