/*
 * # Dependencies
 */
// ## simple http get requests
const got = require('got')
// ## build urls for the requests
const urlAssembler = require('url-assembler')
// template engine for small templates (insert language e.g.)
const mustache = require('mustache')

/**
 * Define common remote sources with MediaWiki-API
 */
const MwSources = {
  Wikipedia: 'https://{{language}}.wikipedia.org/w/api.php',
  Wiktionary: 'https://{{language}}.wiktionary.org/w/api.php'
}

/**
 * Builds source urls for common mediawiki projects
 * NOTE: the urls may change and thus they might be outdated
 * @param {string} urlMustacheTemplate
 * @param {string} mwLanguageCode
 * @return {string}
 */
function buildSourceUrl (urlMustacheTemplate, mwLanguageCode) {
  return mustache.render(urlMustacheTemplate, {
    language: mwLanguageCode
  })
}

/**
 * Represents a mediawiki category entry
 */
class CategoryItem {
  /**
   * Initializes class members
   * @param {number} id
   * @param {string} title
   */
  constructor (id, title) {
    this.id = id
    this.title = title
  }
}

/**
 * Loads category members from the given MediaWiki-Source
 *  Category items cannot always be retrieved all at once (500 at most)
 *  so we have to make multiple requests to the server
 * @private
 * @param {string} source
 * @param {string} categoryTitle
 * @param {CategoryItem[]} previousItems
 * @param {string} continueTerm
 * @return {Promise<CategoryItem[]>}
 */
function getCategoryItems (source, categoryTitle, previousItems, continueTerm) {
  // # parameters which will be present in the url (query)
  let urlParams = {
    action: 'query',
    format: 'json',
    list: 'categorymembers',
    cmtitle: categoryTitle,
    cmlimit: 500 // maximum (2017)
  }
  // ## continue term is being used by mediawiki to identify
  //     the current page of the category we want to retrieve
  if (continueTerm && continueTerm !== '') {
    urlParams.cmcontinue = continueTerm
  }

  let url = urlAssembler(source)
    .param(urlParams)
    .toString()

  return got(url)
    .then(
      (response) => {
        // traverse wikitionary data down to the content
        let bodyJson = JSON.parse(response.body)
        let categories = bodyJson.query.categorymembers.map(
          (item) => new CategoryItem(item.pageid, item.title)
        )

        // Do we have reached the last category page?
        //  if so then return all items
        //  else fetch more (recursive call)
        if (bodyJson.continue === undefined) {
          return Promise.resolve(previousItems.concat(categories))
        } else {
          return getCategoryItems(
            source,
            categoryTitle,
            previousItems.concat(categories),
            bodyJson.continue.cmcontinue
          )
        }
      }
    )
}

/**
 * Encapsulates utility methods for a given mediawiki-compatible source
 */
class CategoryLoader {
  /**
   * Initalizes CategoryLoader class
   * @deprecated [please use static create methods to create an object]
   * @param {string} sourceUrl
   */
  constructor (sourceUrl) {
    this.sourceUrl = sourceUrl
  }

  /**
   * Creates a CategoryLoader object from an complete url to the api
   * @deprecated
   * @param {string} sourceUrl
   * @example
   * CategoryLoader.createFromUrl('https://en.wikipedia.org/w/api.php')
   * @return {CategoryLoader}
   */
  static createFromUrl (sourceUrl) {
    return new CategoryLoader(sourceUrl)
  }

  /**
   * Creates a CategoryLoader object from an language-independent
   * url-template (mustache style).
   * Common templates are available in exported member MwSources
   * @deprecated
   * @param {string} urlTemplate mustache syntax
   * @param {string} languageCode mediawiki compatible language code
   * @example
   * CategoryLoader.createFromTemplate(
   *   'https://{{language}}.wikipedia.org/w/api.php',
   *   'en'
   * )
   * @return {CategoryLoader}
   */
  static createFromTemplate (urlTemplate, languageCode) {
    return CategoryLoader.createFromUrl(
      buildSourceUrl(urlTemplate, languageCode)
    )
  }

  /**
   * Retrieves all category members (but not from their subcategories)
   * @param {string} categoryTitle
   * @return {Promise} Array of type CategoryItem
   */
  loadMembers (categoryTitle) {
    return getCategoryItems(this.sourceUrl, categoryTitle, [], '')
  }
}

/**
 * Get Category content from mediawiki source.
 * This library is promise based.
 * @module mw-category
 * @license MIT
 * @author eisverticker <eisverticker@gmail.com>
 * @todo consider magic terms: "Appendix:", "Category:"
 */
// npm module export (namespace style)
module.exports = {
  'CategoryItem': CategoryItem,
  'buildSourceUrl': buildSourceUrl,
  'CategoryLoader': CategoryLoader,
  'MwSources': MwSources
}
