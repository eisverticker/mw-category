/**
 * Define common remote sources which provide the MediaWiki-API
 */
const MwSources = {
  wikipedia: 'https://{{language}}.wikipedia.org/w/api.php',
  wiktionary: 'https://{{language}}.wiktionary.org/w/api.php',
  wikibooks: 'https://{{language}}.wikibooks.org/w/api.php',
  wikiquote: 'https://{{language}}.wikiquote.org/w/api.php',
  wikisource: 'https://{{language}}.wikisource.org/w/api.php',
  wikivoyage: 'https://{{language}}.wikivoyage.org/w/api.php',
  wikiversity: 'https://{{language}}.wikiversity.org/w/api.php',
  wikimedia: 'https://commons.wikimedia.org/w/api.php',
  wikispecies: 'https://species.wikimedia.org/w/api.php',
  wikinews: 'https://{{language}}.wikinews.org/w/api.php',
  mediawiki: 'https://mediawiki.org/w/api.php'
}

export default MwSources
