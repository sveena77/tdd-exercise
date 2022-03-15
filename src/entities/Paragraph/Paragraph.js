export default function buildMakeParagraph({ makeWord }) {
  return function makeParapraph(text = '') {
    const separator = ' '
    const maxParapraphLength = 200000
    
    if (typeof text !== 'string') {
      throw new TypeError('Paragraph must be a string')
    }
    if (text.length > maxParapraphLength) {
      throw new Error('Paragraph exceeded the maximum length')
    }

    const sanitizedText = sanitize(text)

    const words = generateWordList(sanitizedText)

    if (words.length < 1) {
      throw new Error('Paragraph must contain at least one word')
    }

    return Object.freeze({
      getText: () => sanitizedText,
      getWords: () => words,
      getNumberOfWords: () => words.length
    })

    function generateWordList (text) {
      const words = []
      text.split(separator).forEach((word) => {
        try {
          const wordInstance = makeWord(word)
          words.push(wordInstance.getWord())
        } catch (error) {
          if (error.message !== 'Word must not be empty') {
            throw new Error('Paragraph contains an invalid word')
          }
        }
      })
      return words
    }
  }

  function sanitize (text) {
    return text
      .replaceAll(/[^\w\s]/g, '') // removes all non word characters and keeps whitespaces
      .replaceAll(/\s{2,}/g, ' ') // removes multiple whitespaces
  }
}
