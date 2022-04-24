import CategoryItem from './lib/category-item.js'
import MwSources from './lib/mw-sources.js'
import CategoryLoader from './lib/category-loader.js'
import buildSourceUrl from './lib/build-source-url.js'

/**
 * Retrieve category content from mediawiki source.
 * This library is promise based.
 * @module mw-category
 * @license MIT
 * @author eisverticker <eisverticker@gmail.com>
 * @example
 * const { CategoryLoader, MwSources } = require('mw-category')
 */
export { CategoryItem, MwSources, CategoryLoader, buildSourceUrl }
