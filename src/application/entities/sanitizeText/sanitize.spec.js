import sanitizeText from '.'

const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const vowelMutations = 'äöüÄÖÜ'
const ligatures = 'ß'
const punctuations = '.:,;!?'
const digits = '0123456789'
const someSpecialCharacters = '!"§$%&/()=?`´^°<>|~*#\''

describe('sanitizeText', () => {
  it('should remove all disallowed characters from text', () => {
    expect(sanitizeText(vowelMutations)).toBe('')
    expect(sanitizeText(ligatures)).toBe('')
    expect(sanitizeText(punctuations)).toBe('')
    expect(sanitizeText(digits)).toBe('')
    expect(sanitizeText(someSpecialCharacters)).toBe('')
    expect(sanitizeText(ligatures)).toBe('')
  })

  it('should keep lowercase and uppercase letters from a to z and whitespaces', () => {
    expect(sanitizeText(lowercaseLetters)).toBe(lowercaseLetters)
    expect(sanitizeText(uppercaseLetters)).toBe(uppercaseLetters)
    expect(sanitizeText(lowercaseLetters + ' ' + uppercaseLetters)).toBe(lowercaseLetters + ' ' + uppercaseLetters)
  })

  it('should reduce multiple whitespaces to single', () => {
    const test = lowercaseLetters + '  ' + uppercaseLetters
    const result = lowercaseLetters + ' ' + uppercaseLetters
    expect(sanitizeText(test)).toBe(result)
  })

  it('should reduce multiple whitespaces after sanitizing which might leads to multiple whitespaces', () => {
    const test = 'ab $ cd'
    const result = 'ab cd'
    expect(sanitizeText(test)).toBe(result)
  })

  it('should remove whitespace at the beginning and at the end of the text', () => {
    const test = '  ' + lowercaseLetters + ' ' + uppercaseLetters + '  '
    const result = lowercaseLetters + ' ' + uppercaseLetters
    expect(sanitizeText(test)).toBe(result)
  })

})