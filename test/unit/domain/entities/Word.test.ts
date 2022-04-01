import Word from '../../../../src/domain/entities/Word'
import { EmptyError, IllegalCharacterError } from '../../../../src/domain/errors'

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

  it('must not be empty', () => {
    expect(() => new Word(empty)).toThrow(EmptyError)
  })

  it('must not contain whitespaces', () => {
    expect(() => new Word(sane)).not.toThrow(IllegalCharacterError)
    expect(() => new Word(someWords)).toThrow(IllegalCharacterError)
  })
  
  it('sanitize itself to contain allowed characters only', () => {
    expect(new Word(sane).text).toBe(sane)
    expect(new Word(sane).text).toMatch(allowedWordPattern)
    
    expect(insane).not.toMatch(allowedWordPattern)
    expect(new Word(insane).text).toMatch(allowedWordPattern)
    expect(new Word(insane).text).toBe(insaneSanitized)

    expect(totallyInsane).not.toMatch(allowedWordPattern)
    expect(new Word(totallyInsane).text).toMatch(allowedWordPattern)
    expect(new Word(totallyInsane).text).toBe(totallyInsaneSanitized)
  })

})