const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const citiesInLuxembourg = require('./resources/en-wikipedia-citites-in-luxembourg.json')
chai.use(chaiAsPromised)
const expect = chai.expect

const MwCategory = require('../index.js')

const CategoryLoader = MwCategory.CategoryLoader
const MwSources = MwCategory.MwSources

describe('#loadMembers()', function() {
  it('should load category members from wikipedia without an error', function() {
    let loader = CategoryLoader.createFromTemplate(MwSources.Wikipedia, 'en');
    return expect(
      loader.loadMembers('Category:Cities_in_Luxembourg')
    ).to.eventually.deep.equal(citiesInLuxembourg);
  });

  it('should do the same for createFromUrl', function() {
    let loader = CategoryLoader.createFromUrl('https://en.wikipedia.org/w/api.php');
    return expect(
      loader.loadMembers('Category:Cities_in_Luxembourg')
    ).to.be.fulfilled;
  });

  it('should load the category members from wiktionary without an error', function() {
    let loader = CategoryLoader.createFromTemplate(MwSources.Wiktionary, 'en');
    return expect(
      loader.loadMembers('Category:Spanish basic words')
    ).to.be.fulfilled;
  });

  it('should throw an error because it is no category', function() {
    let loader = CategoryLoader.createFromTemplate(MwSources.Wikipedia, 'en');
    return expect(
      loader.loadMembers('Luxembourg')
    ).to.be.rejectedWith('response-body-invalid');
  });

  it('should throw an error because remote server does not exist', function() {
    let loader = CategoryLoader.createFromUrl('https://ef.xzsdad.org/w/apdi.php');
    return expect(
      loader.loadMembers('Luxembourg')
    ).to.be.rejected;
  });
});
