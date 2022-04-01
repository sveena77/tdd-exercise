import { EmptyError, ValidationError } from '../../../../src/domain/errors'
import OneTimeParagraphAnalyser from '../../../../src/domain/usecases/OneTimeParagraphAnalyser'

describe('find first shortest textpart', () => {
  const otpa = new OneTimeParagraphAnalyser()

  it('needs a non empty valid paragraph', () => {
    const paragraph = 'a simple paragraph'
    const searchList = ['a', 'simple']
    expect(() => otpa.findFirstShortestTextpart('paragraph', ['paragraph'])).not.toThrow()
    expect(() => otpa.findFirstShortestTextpart('', searchList)).toThrow(ValidationError)
    expect(() => otpa.findFirstShortestTextpart(paragraph, searchList)).not.toThrow(ValidationError)
  })

  it('needs a non empty list of valid words to search for', () => {
    const paragraph = 'a simple paragraph'
    const searchList = ['a', 'paragraph']
    expect(() => otpa.findFirstShortestTextpart(paragraph, searchList)).not.toThrow()
    expect(() => otpa.findFirstShortestTextpart(paragraph, [])).toThrow(EmptyError)
    expect(() => otpa.findFirstShortestTextpart(paragraph, searchList)).not.toThrow(EmptyError)
    expect(() => otpa.findFirstShortestTextpart(paragraph, ['invalid word'])).toThrow(ValidationError)
  })

  it('list of words must no exceed the number of words in the paragraph', () => {
    const paragraph = 'one two'
    const searchList = ['one', 'two', 'three']
    expect(() => otpa.findFirstShortestTextpart(paragraph, searchList)).toThrow(ValidationError)
  })
  
  it('returns a textpart which contains all given words', () => {
    const tests = {
      fullMatch: {
        paragraph: 'a simple paragraph',
        searchList: ['a', 'simple', 'paragraph'],
        result: 'a simple paragraph'
      },
      partialMatch: {
        paragraph: 'a simple paragraph',
        searchList: ['simple', 'paragraph'],
        result: 'simple paragraph'
      },
      withWordInbetween: {
        paragraph: 'a simple paragraph',
        searchList: ['a', 'paragraph'],
        result: 'a simple paragraph'
      }
    }

    Object.values(tests).forEach((test) => {
      expect(otpa.findFirstShortestTextpart(test.paragraph, test.searchList)).toBe(test.result)
    })
  })

  it('matches textpart with search words in any order', () => {
    const tests = {
      fullMatch: {
        paragraph: 'a simple paragraph',
        searchList: ['simple', 'paragraph', 'a'],
        result: 'a simple paragraph'
      },
      partialMatch: {
        paragraph: 'a simple paragraph',
        searchList: ['paragraph', 'simple'],
        result: 'simple paragraph'
      },
      withWordInbetween: {
        paragraph: 'a simple paragraph',
        searchList: ['paragraph', 'a'],
        result: 'a simple paragraph'
      }
    }

    Object.values(tests).forEach((test) => {
      expect(otpa.findFirstShortestTextpart(test.paragraph, test.searchList)).toBe(test.result)
    })
  })

  it('searches case insensitive', () => {
    const tests = {
      uppercaseInParagraph: {
        paragraph: 'a SIMPLE paragraph',
        searchList: ['simple', 'paragraph', 'a'],
        result: 'a SIMPLE paragraph'
      },
      uppercaseInSearchList: {
        paragraph: 'a simple paragraph',
        searchList: ['PARAGRAPH', 'simple'],
        result: 'simple paragraph'
      },
      uppercaseInBoth: {
        paragraph: 'A simple paragraph',
        searchList: ['PARAGRAPH', 'a'],
        result: 'A simple paragraph'
      }
    }

    Object.values(tests).forEach((test) => {
      expect(otpa.findFirstShortestTextpart(test.paragraph, test.searchList)).toBe(test.result)
    })
  })

  it('uses lowercase and uppercase letters from a to z only', () => {
    const tests = {
      punctuationAndVowelMutation: {
        paragraph: 'Text, mit Wörtern!',
        searchList: ['text', 'mit', 'wörtern'],
        result: 'Text mit Wrtern'
      },
      specialCharsPlusDigit: {
        paragraph: 'Text, mit 3 Wörtern!',
        searchList: ['Wörtern', 'mit'],
        result: 'mit Wrtern'
      }
    }

    Object.values(tests).forEach((test) => {
      expect(otpa.findFirstShortestTextpart(test.paragraph, test.searchList)).toBe(test.result)
    })
  })

  it('returns an empty string when there is no matching textpart in the paragraph', () => {
    expect(otpa.findFirstShortestTextpart('a simple Text', ['some', 'words'])).toBe('')
  })

  it('returns the shortest matching textpart', () => {
    const tests = {
      shortBeforeLong: {
        paragraph: 'a simple text and a longer simple text',
        searchList: ['a', 'simple', 'text'],
        result: 'a simple text'
      },
      longBeforeShort: {
        paragraph: 'a longer simple text and a simple text',
        searchList: ['a', 'simple', 'text'],
        result: 'a simple text'
      },
      shortInbetweenLong: {
        paragraph: 'Here is a little simple text inbetween an other simple text',
        searchList: ['a', 'simple', 'text'],
        result: 'a little simple text'
      },
    }

    Object.values(tests).forEach((test) => {
      expect(otpa.findFirstShortestTextpart(test.paragraph, test.searchList)).toBe(test.result)
    })    
  })

  it('returns the first matching textpart when there are more than one of the same length', () => {
    const tests = {
      firstShortest: {
        paragraph: 'a simple text and a short text',
        searchList: ['a', 'text'],
        result: 'a simple text'
      },
      firstShortestAfterLong: {
        paragraph: 'a longer simple text and a simple text plus a short text',
        searchList: ['a', 'text'],
        result: 'text and a'
      }
    }

    Object.values(tests).forEach((test) => {
      expect(otpa.findFirstShortestTextpart(test.paragraph, test.searchList)).toBe(test.result)
    })
  })
})