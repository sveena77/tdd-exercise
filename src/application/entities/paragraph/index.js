import buildMakeParagraph from "./paragraph"
import makeWord from '../word'

const makeParagraph = buildMakeParagraph({ sanitize, makeWord })

export default makeParagraph

function sanitize (text) {
  return text
    .replaceAll(/[^\w\s]/g, '') // removes all non word characters and keeps whitespaces
    .replaceAll(/\s{2,}/g, ' ') // removes multiple whitespaces
}
