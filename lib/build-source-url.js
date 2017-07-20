// template engine for small templates (insert language e.g.)
const mustache = require('mustache')

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

module.exports = buildSourceUrl;
