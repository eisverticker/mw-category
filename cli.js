#!/usr/bin/env node

/* eslint-disable no-console */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { program } from 'commander'
import { CategoryLoader } from './index.js'

const packageJsonPath = path.join(fileURLToPath(import.meta.url), '../package.json')
const { version } = JSON.parse(readFileSync(packageJsonPath))

program
  .version(version)
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
