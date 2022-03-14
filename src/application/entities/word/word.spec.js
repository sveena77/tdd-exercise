import buildMakeWord from './word'
import wordFixtures from '../../../../__test__/fixtures/words'

describe('a word', () => {
  const allowedWordPattern = /^[a-zA-Z]+$/
  const spySanitize = jest.fn((text) => {
    return text
  })
  const makeWord = buildMakeWord({
    sanitize: spySanitize
  })

  it('must be a string', () => {
    const errorMessage = 'Word must be a string'
    expect(() => makeWord(wordFixtures.sane)).not.toThrow(errorMessage)
    expect(() => makeWord([])).toThrow(errorMessage)
    expect(() => makeWord(123)).toThrow(errorMessage)
  })

  it('must not be empty', () => {
    const errorMessage = 'Word must not be empty'
    expect(() => makeWord(wordFixtures.empty)).toThrow(errorMessage)
  })

  it('must not contain whitespaces', () => {
    const errorMessage = 'Word must not contain whitespaces'
    expect(() => makeWord(wordFixtures.sane)).not.toThrow(errorMessage)
    expect(() => makeWord(wordFixtures.someWords)).toThrow(errorMessage)
  })
  
  it('must consist of allowed characters only', () => {
    expect(makeWord(wordFixtures.sane).getWord()).toBe(wordFixtures.sane)
    expect(makeWord(wordFixtures.sane).getWord()).toMatch(allowedWordPattern)
    expect(makeWord(wordFixtures.insane).getWord()).not.toMatch(allowedWordPattern)
    expect(makeWord(wordFixtures.totallyInsane).getWord()).not.toMatch(allowedWordPattern)
  })
  
  it('should sanitize itself', () => {
    makeWord(wordFixtures.sane)
    expect(spySanitize).toHaveBeenCalled()
  })

  it('must consist of allowed characters only', () => {
    expect(makeWord(wordFixtures.sane).getWord()).toBe(wordFixtures.sane)
    expect(makeWord(wordFixtures.sane).getWord()).toMatch(allowedWordPattern)
    expect(makeWord(wordFixtures.insane).getWord()).not.toMatch(allowedWordPattern)
    expect(makeWord(wordFixtures.totallyInsane).getWord()).not.toMatch(allowedWordPattern)
  })
})