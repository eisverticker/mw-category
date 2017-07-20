const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const MwCategory = require('./index.js')

const CategoryLoader = MwCategory.CategoryLoader
const MwSources = MwCategory.MwSources

describe('#loadMembers()', function() {
  it('should load the category members from wikipedia without an error', function() {
    let loader = CategoryLoader.createFromTemplate(MwSources.Wikipedia, 'en');
    return loader.loadMembers('Category:Cirties_in_Luxembourg');
  });

  it('should load the category members from wiktionary without an error', function() {
    let loader = CategoryLoader.createFromTemplate(MwSources.Wiktionary, 'en');
    return loader.loadMembers('Category:Spanish basic words');
  });

  it('should throw an error because it is no category', function() {
    let loader = CategoryLoader.createFromTemplate(MwSources.Wikipedia, 'en');
    return expect(loader.loadMembers('Luxembourg'))
      .to.be.rejectedWith('response-body-invalid');
  });
});
