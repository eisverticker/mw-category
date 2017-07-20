/**
 * Define common remote sources which provide the MediaWiki-API
 */
const MwSources = {
  Wikipedia: 'https://{{language}}.wikipedia.org/w/api.php',
  Wiktionary: 'https://{{language}}.wiktionary.org/w/api.php'
}

module.exports = MwSources;
