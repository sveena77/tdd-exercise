import buildMakeWord from './word'
import sanitizeText from '../sanitizeText'

const makeWord = buildMakeWord({ sanitize })

function sanitize (text) {
  return sanitizeText(text)
}

export default makeWord
