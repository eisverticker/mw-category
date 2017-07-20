const CategoryItem = require('./lib/category-item.js')
const MwSources = require('./lib/mw-sources.js')
const CategoryLoader = require('./lib/category-loader.js')
const buildSourceUrl = require('./lib/build-source-url.js')

/**
 * Retrieve category content from mediawiki source.
 * This library is promise based.
 * @module mw-category
 * @license MIT
 * @author eisverticker <eisverticker@gmail.com>
 */
// npm module export (namespace style)
module.exports = {
  'CategoryItem': CategoryItem,
  'buildSourceUrl': buildSourceUrl,
  'CategoryLoader': CategoryLoader,
  'MwSources': MwSources
}
