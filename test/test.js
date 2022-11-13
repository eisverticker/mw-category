import { use, expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
use(chaiAsPromised)

import { loadJsonTestResource } from './test-utils.js'
import { CategoryLoader, MwSources } from '../index.js'

const citiesInLuxembourg = loadJsonTestResource('en-wikipedia-citites-in-luxembourg.json')

describe('#loadMembers()', () => {
  it('should load category members from wikipedia without an error', async () => {
    const loader = CategoryLoader.createFromTemplate(MwSources.wikipedia, 'en')
    const actualMembers = await loader.loadMembers('Category:Cities_in_Luxembourg')
    expect(actualMembers).to.deep.equal(citiesInLuxembourg)
  })

  it('should load cities of luxembourg by using createFromUrl', async () => {
    const loader = CategoryLoader.createFromUrl('https://en.wikipedia.org/w/api.php')
    const actualMembers = await loader.loadMembers('Category:Cities_in_Luxembourg')
    expect(actualMembers).to.be.an('array')
    expect(actualMembers).to.have.length(16)
    expect(actualMembers.some((item) => item.title === 'Differdange')).to.be.true
  })

  it('should load category members from wiktionary without an error', async () => {
    const loader = CategoryLoader.createFromTemplate(MwSources.wiktionary, 'en')
    const actualMembers = await loader.loadMembers('Category:Spanish_given_names')
    expect(actualMembers).to.be.an('array')
    expect(actualMembers).to.have.length.greaterThan(0)
    expect(actualMembers.some((item) => item.title === 'Fernando')).to.be.true
  })

  it('should throw an error because it is no category', function() {
    const loader = CategoryLoader.createFromTemplate(MwSources.wikipedia, 'en')
    return expect(
      loader.loadMembers('Luxembourg')
    ).to.be.rejectedWith('response-body-invalid')
  })

  it('should throw an error because remote server does not exist', () => {
    const loader = CategoryLoader.createFromUrl('https://ef.xzsdad.org/w/apdi.php')
    return expect(
      loader.loadMembers('Luxembourg')
    ).to.be.rejected
  })
})

