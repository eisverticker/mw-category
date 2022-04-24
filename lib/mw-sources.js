/**
 * Define common remote sources which provide the MediaWiki-API
 */
const MwSources = {
  Wikipedia: 'https://{{language}}.wikipedia.org/w/api.php',
  Wiktionary: 'https://{{language}}.wiktionary.org/w/api.php',
  Wikibooks: 'https://{{language}}.wikibooks.org/w/api.php',
  Wikiquote: 'https://{{language}}.wikiquote.org/w/api.php',
  Wikisource: 'https://{{language}}.wikisource.org/w/api.php',
  Wikivoyage: 'https://{{language}}.wikivoyage.org/w/api.php',
  Wikiversity: 'https://{{language}}.wikiversity.org/w/api.php',
  Wikimedia: 'https://commons.wikimedia.org/w/api.php',
  Wikispecies: 'https://species.wikimedia.org/w/api.php',
  Wikinews: 'https://{{language}}.wikinews.org/w/api.php',
  Mediawiki: 'https://mediawiki.org/w/api.php'
}

export default MwSources
