/* eslint-disable no-console */

import { CategoryLoader, MwSources } from './index.js'

const loader = CategoryLoader.createFromTemplate(MwSources.wiktionary, 'en')
// const loader = CategoryLoader.createFromUrl('https://en.wikipedia.org/w/api.php')

/**
 * @return {void}
 */
async function printSpanishGivenNames() {
  try {
    const members = await loader.loadMembers('Category:Spanish_given_names')
    members.filter(
      (member) => !member.title.startsWith('Category:')
    ).forEach(
      (member) => {
        console.log(`${member.title} (${member.id})`)
      }
    )
  } catch (error) {
    console.log('error: could not load members', error)
  }
}

printSpanishGivenNames()
