// template engine for small templates (insert language e.g.)
import mustache from 'mustache'

/**
 * Builds source urls for common mediawiki projects
 * NOTE: the urls may change and thus they might be outdated
 * @param {string} urlMustacheTemplate
 * @param {string} mwLanguageCode
 * @return {string}
 */
export default function buildSourceUrl(urlMustacheTemplate, mwLanguageCode) {
  return mustache.render(urlMustacheTemplate, {
    language: mwLanguageCode
  })
}
