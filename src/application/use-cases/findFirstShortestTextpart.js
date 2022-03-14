import makeParagraph from '../entities/paragraph'
import makeWord from '../entities/word'

export default function makeFindFirstShortestTextpart () {
  return function findFirstShortestTextpart (text, searchList) {
    const paragraph = generateParagraph(text)
    const searchWords = generateSearchWords(searchList)
    
    if (paragraph.getNumberOfWords() < searchWords.length) {
      throw new Error('search list must not contain more words than the paragraph')
    }
    return findTextpart(paragraph, searchWords)
  }

  function generateParagraph (text) {
    if (typeof text !== 'string') {
      throw new TypeError('Paragraph has to be a string')
    }
    try {
      const paragraph = makeParagraph(text)
      return paragraph
    } catch (error) {
      throw new Error('Paragraph is not valid')
    }    
  }

  function generateSearchWords (searchList) {
    if (!Array.isArray(searchList)) {
      throw new TypeError('Search list has to be an array')
    }
    const searchWords = []
    try {
      searchList.forEach((searchItem) => {
        const searchWord = makeWord(searchItem).getWord()
        searchWords.push(searchWord)
      })
    } catch (error) {
      throw new Error('search list contains an invalid word')
    }
    if (searchWords.length < 1) {
      throw new Error('search list must not be empty')
    }
    return searchWords
  }

  function findTextpart (paragraph, searchWords) {
    for (let textpartLength = searchWords.length; textpartLength <= paragraph.getNumberOfWords(); textpartLength++) {
      for (let textpartPosition = 0; textpartPosition <= (paragraph.getNumberOfWords() - textpartLength); textpartPosition++) {
        const textpart = paragraph.getWords().slice(textpartPosition, textpartPosition + textpartLength)
        if (containsAllWords(textpart, searchWords)) {
          return textpart.join(' ')
        }
      }
    }
    return ''
  }

  function containsAllWords (textpart, searchWords) {
    const wordList = [...searchWords]
    textpart.forEach((word) => {
      const index = wordList.findIndex((searchWord) => searchWord.toLowerCase() === word.toLowerCase())
      if (index !== -1) {
        wordList.splice(index, 1)
      }
    })
    return wordList.length === 0
  }
}