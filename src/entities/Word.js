export default function makeWord(word = '') {
  if (typeof word !== 'string') {
    throw new TypeError('Word must be a string')
  }

  if (word.match(/\s/)) {
    throw new Error ('Word must not contain whitespaces')
  }

  word = sanitize(word)

  if (!word) {
    throw new Error('Word must not be empty')
  }

  return Object.freeze({
    getWord: () => word
  })
}

function sanitize (word) {
  return word.replaceAll(/[^a-zA-Z]/g, '')
}
