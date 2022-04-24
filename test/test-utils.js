import { readFileSync } from 'fs'

/**
 * @param {string} fileName
 * @return {object}
 */
export function loadJsonTestResource(fileName) {
  return JSON.parse(readFileSync(
    'test/resources/' + fileName,
    { encoding: 'utf-8' }
  ))
}

