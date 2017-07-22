#!/usr/bin/env node
const program = require('commander')
const mwc = require('./index.js')

const CategoryLoader = mwc.CategoryLoader;

// use commander to describe and parse the command (arguments and options)
program
  .version('1.2.0')
  .arguments('<url> <title>')
  .action( function(url, title, env) {
    // process category
    let loader = CategoryLoader.createFromUrl(url)
    // we are trying to load the category members here and just
    // print the title of it
    // if an error occurs we print a generic error
    loader.loadMembers(title)
      .then(
        (members) => {
          members.forEach(
            (item) => console.log(item.title)
          )
        }
      )
      .catch(
        () => console.log("error", "program was unable to load category members")
      );
  })
  .parse(process.argv);
