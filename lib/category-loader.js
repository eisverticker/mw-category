// ## build urls for the requests
const urlAssembler = require('url-assembler')
// ## simple http get requests
const got = require('got')
// data structure for a single category member
const CategoryItem = require('./category-item.js')
// helper function to build urls from template
const buildSourceUrl = require('./build-source-url.js')
/**
 * Loads category members recursively from the given MediaWiki-Source
 *  Category items cannot always be retrieved all at once (500 at most)
 *  so we have to make multiple requests to the server
 * @private
 * @param {string} source
 * @param {string} categoryTitle
 * @param {CategoryItem[]} previousItems
 * @param {string} continueTerm
 * @return {Promise<CategoryItem[]>}
 */
async function getCategoryItems(source, categoryTitle, previousItems, continueTerm) {
  // # parameters which will be present in the url (query)
  const urlParams = {
    action: 'query',
    format: 'json',
    list: 'categorymembers',
    cmtitle: categoryTitle,
    cmlimit: 500 // maximum as of 2022
  }
  // ## continue term is being used by mediawiki to identify
  //     the current page of the category we want to retrieve
  if (continueTerm && continueTerm !== '') {
    urlParams.cmcontinue = continueTerm
  }

  const url = urlAssembler(source)
    .param(urlParams)
    .toString()

  const response = await got(url, {
    retry: 1
  })

  // # traverse wikitionary data down to the content
  // the following might throw a syntax error if response.body
  // is no valid json
  let body
  try {
    body = JSON.parse(response.body)
  } catch (e) {
    return Promise.reject(new Error('response-body-invalid'))
  }

  // check if json format is ok
  if (body.query === undefined || body.query.categorymembers === undefined) {
    throw new Error('response-body-invalid')
  }

  // map to CategoryItem
  const categories = body.query.categorymembers.map(
    (item) => new CategoryItem(item.pageid, item.title)
  )

  // Do we have reached the last category page?
  //  if so then return all items
  //  else fetch more (recursive call)
  if (body.continue === undefined) {
    return Promise.resolve(previousItems.concat(categories))
  } else {
    return getCategoryItems(
      source,
      categoryTitle,
      previousItems.concat(categories),
      body.continue.cmcontinue
    )
  }
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
  constructor(sourceUrl) {
    this.sourceUrl = sourceUrl
  }

  /**
   * Creates a CategoryLoader object from an complete url to the api
   * @param {string} sourceUrl
   * @example
   * CategoryLoader.createFromUrl('https://en.wikipedia.org/w/api.php')
   * @return {CategoryLoader}
   */
  static createFromUrl(sourceUrl) {
    return new CategoryLoader(sourceUrl)
  }

  /**
   * Creates a CategoryLoader object from an language-independent
   * url-template (mustache style).
   * Common templates are available in exported member MwSources
   * @param {string} urlTemplate mustache syntax
   * @param {string} languageCode mediawiki compatible language code
   * @example
   * CategoryLoader.createFromTemplate(
   *   'https://{{language}}.wikipedia.org/w/api.php',
   *   'en'
   * )
   * @return {CategoryLoader}
   */
  static createFromTemplate(urlTemplate, languageCode) {
    return CategoryLoader.createFromUrl(
      buildSourceUrl(urlTemplate, languageCode)
    )
  }

  /**
   * Retrieves all category members (but not from their subcategories)
   * @param {string} categoryTitle
   * @return {Promise} Array of type CategoryItem
   */
  loadMembers(categoryTitle) {
    return getCategoryItems(this.sourceUrl, categoryTitle, [], '')
  }
}

module.exports = CategoryLoader
