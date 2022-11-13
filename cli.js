#!/usr/bin/env node

/* eslint-disable no-console */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { program } from 'commander'
import { CategoryLoader, MwSources } from './index.js'

const packageJsonPath = path.join(fileURLToPath(import.meta.url), '../package.json')
const { version } = JSON.parse(readFileSync(packageJsonPath))

/**
 * @param {string} source
 * @return {boolean}
 */
function isTemplateSource(source) {
  return !source.startsWith('http')
}

program
  .version(version)
  .arguments('<source> <title>')
  .option( '-c, --csv', 'Make output csv compatible')
  .action( async (source, title, env) => {
    let members
    let loader

    if (isTemplateSource(source)) {
      const sourceParts = source.split(':')
      const mwSourceId = sourceParts.shift()
      const languageCode = sourceParts.shift() || 'en'
      const url = MwSources[mwSourceId]
      if (!url) {
        console.error('error', `could not find a template for '${mwSourceId}'`)
        return
      }
      loader = CategoryLoader.createFromTemplate(url, languageCode)
    } else {
      loader = CategoryLoader.createFromUrl(source)
    }

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
