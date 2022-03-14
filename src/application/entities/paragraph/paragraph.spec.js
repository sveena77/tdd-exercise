import makeParagraph from './'
import paragraphFixtures from '../../../../__test__/fixtures/paragraphs'

describe('A Paragraph', () => {
  const maxLength = 200000

  it('must be a string', () => {
    const errorMessage = 'Paragraph must be a string'
    expect(() => makeParagraph([])).toThrow(errorMessage)
    expect(() => makeParagraph('test Absatz')).not.toThrow()
  })

  it('must not contain more then 200.000 characters', () => {
    const errorMessage = 'Paragraph exceeded the maximum length'
    expect(paragraphFixtures.reallyLong.length).toBe(maxLength)

    expect(() => makeParagraph(paragraphFixtures.reallyLong)).not.toThrow(errorMessage)
    expect(() => makeParagraph(paragraphFixtures.reallyLong + 'a')).toThrow(errorMessage)
  })

  it('splits the text into a list of words', () => {
    const paragraph = makeParagraph('one two two three')
    // returns the words in the same order
    expect(paragraph.getWords()).toStrictEqual(['one', 'two', 'two', 'three'])
    expect(paragraph.getWords()).not.toStrictEqual(['one', 'three', 'two', 'two'])
    // does not merge dublicates
    expect(paragraph.getWords()).not.toStrictEqual(['one', 'two', 'three'])
  })

  it('must contain at least one word', () => {
    const errorMessage = 'Paragraph must contain at least one word'
    expect(() => makeParagraph(paragraphFixtures.empty)).toThrow(errorMessage)
  })

  describe('sanitizes itself', () => {    
    it('and removes all special characters', () => {
      expect(makeParagraph(paragraphFixtures.sane.text).getWords()).toStrictEqual(paragraphFixtures.sane.list)
      expect(makeParagraph(paragraphFixtures.insane.text).getWords()).toStrictEqual(paragraphFixtures.insane.list)
      expect(makeParagraph(paragraphFixtures.totallyInsane.text).getWords()).toStrictEqual(paragraphFixtures.totallyInsane.list)
    })

    it('and reduces multiple whitespaces to single', () => {
      expect(makeParagraph('one  two').getText()).toBe('one two')
    })
  })
  
  it('counts the number of words', () => {
    expect(makeParagraph(paragraphFixtures.sane.text).getNumberOfWords()).toStrictEqual(paragraphFixtures.sane.numberOfWords)
    expect(makeParagraph(paragraphFixtures.insane.text).getNumberOfWords()).toStrictEqual(paragraphFixtures.insane.numberOfWords)
    expect(makeParagraph(paragraphFixtures.totallyInsane.text).getNumberOfWords()).toStrictEqual(paragraphFixtures.totallyInsane.numberOfWords)
  })

})
