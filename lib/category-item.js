/**
 * Represents a mediawiki category entry
 */
class CategoryItem {
  /**
   * Initializes class members
   * @param {number} id
   * @param {string} title
   */
  constructor (id, title) {
    this.id = id
    this.title = title
  }
}

module.exports = CategoryItem;
