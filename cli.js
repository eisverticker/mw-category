#!/usr/bin/env node

/* eslint-disable no-console */

import { program } from 'commander'
import { CategoryLoader } from './index.js'

program
  .version('2.0.0')
  .arguments('<url> <title>')
  .option( '-c, --csv', 'Make output csv compatible')
  .action( async (url, title, env) => {
    const loader = CategoryLoader.createFromUrl(url)

    let members
    try {
      members = await loader.loadMembers(title)
    } catch (error) {
      console.error('error', 'program was unable to load category members')
      return
    }

    members.forEach(
      (item) => {
        // add quotation marks in csv mode
        if (env.csv) {
          console.log(`"${item.title}"`)
          return
        }

        console.log(item.title)
      }
    )
  })
  .parse(process.argv)
