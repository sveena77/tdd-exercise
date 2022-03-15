import makeWord from './Word'

describe('a word', () => {
  const empty = ''
  const someWords = 'two words'
  const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const sane = 'word'
  const insane = 'word-2'
  const insaneSanitized = 'word'
  const totallyInsane = '^word²$'
  const totallyInsaneSanitized = 'word'
  const allowedWordPattern = /^[a-zA-Z]+$/

  it('must be a string', () => {
    const errorMessage = 'Word must be a string'
    expect(() => makeWord(sane)).not.toThrow(errorMessage)
    expect(() => makeWord([])).toThrow(errorMessage)
    expect(() => makeWord(123)).toThrow(errorMessage)
  })

  it('must not be empty', () => {
    const errorMessage = 'Word must not be empty'
    expect(() => makeWord(empty)).toThrow(errorMessage)
  })

  it('must not contain whitespaces', () => {
    const errorMessage = 'Word must not contain whitespaces'
    expect(() => makeWord(sane)).not.toThrow(errorMessage)
    expect(() => makeWord(someWords)).toThrow(errorMessage)
  })
  
  it('sanitize itself to contain allowed characters only', () => {
    expect(makeWord(sane).getWord()).toBe(sane)
    expect(makeWord(sane).getWord()).toMatch(allowedWordPattern)
    
    expect(insane).not.toMatch(allowedWordPattern)
    expect(makeWord(insane).getWord()).toMatch(allowedWordPattern)
    expect(makeWord(insane).getWord()).toBe(insaneSanitized)

    expect(totallyInsane).not.toMatch(allowedWordPattern)
    expect(makeWord(totallyInsane).getWord()).toMatch(allowedWordPattern)
    expect(makeWord(totallyInsane).getWord()).toBe(totallyInsaneSanitized)
  })

})