/**
 * Get Category content from mediawiki source
 * NOTE: This library is promise based
 * @author eisverticker<eisverticker@gmail.com>
 */

/*
 * # Dependencies
 */
 // ## simple http get requests
 const got = require('got');
 // ## build urls for the requests
 const urlAssembler = require('url-assembler');
 // ## template engine for small templates (insert language e.g.)
 const mustache = require('mustache');

/**
 * Represents a mediawiki category entry
 */
class CategoryItem {
  constructor(id, title){
    this.id = id;
    this.title = title;
  }
}

/**
 * Loads Category Entries from MediaWiki-Source
 *  Category items cannot always be retrieved all at once (500 at most)
 *  so we have to make multiple requests to the server
 * @return Promise<CategoryItem[]>
 */
function getCategoryItems(source, categoryTitle, previousItems, continueTerm){
  // # parameters which will be present in the url (query)
  let urlParams = {
    action: 'query',
    format: 'json',
    list: 'categorymembers',
    cmtitle: 'Category:' + categoryTitle,
    cmlimit: 500 // maximum (2017)
  };
  // ## continue term is being used by mediawiki to identify
  //     the current page of the category we want to retrieve
  if(continueTerm && continueTerm != ""){
    params.cmcontinue = continueTerm
  }

  let url = urlAssembler(source)
  .param(params)
  .toString();

  return got(url)
   .then(
     (response) => {
       // traverse wikitionary data down to the content
       let bodyJson = JSON.parse(response.body);
       let categories = bodyJson.query.categorymembers.map(
         (item) => new CategoryItem(item.pageid, item.title)
       );

       // Do we have reached the last category page?
       //  if so then return all items
       //  else fetch more (recursive call)
       if(bodyJson.continue === undefined){
         return Promise.resolve(previousItems.concat(categories));
       }else{
         return getCategoryItems(
           previousItems.concat(categories),
           bodyJson.continue.cmcontinue
         )
       }

     }
   );

}

// npm module export (namespace style)
module.exports = {
  CategoryItem: CategoryItem,
  get: getCategoryItems
};
