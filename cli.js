#!/usr/bin/env node
const program = require('commander')
const mwc = require('./index.js')

const CategoryLoader = mwc.CategoryLoader

// use commander to describe and parse the command (arguments and options)
program
  .version('1.2.2')
  .arguments('<url> <title>')
  .option( '-c, --csv', 'Make output csv compatible')
  .action( function(url, title, env) {
    // process category
    const loader = CategoryLoader.createFromUrl(url)
    // we are trying to load the category members here and just
    // print the title of it
    // if an error occurs we print a generic error
    loader.loadMembers(title)
      .then(
        (members) => {
          members.forEach(
            (item) => {
              // csv mode --> add quotation marks
              if (env.csv) {
                item.title = '"' + item.title + '"'
              }
              console.log(item.title)
            }
          )
        }
      )
      .catch(
        () => console.error('error', 'program was unable to load category members')
      )
  })
  .parse(process.argv)
