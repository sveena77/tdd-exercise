import Paragraph from '../../../../src/domain/entities/Paragraph'
import { EmptyError, MaxSizeExceededError } from '../../../../src/domain/errors'

const sane = {
  text: 'Ein toller Beispieltext ist der Blindtext. Er hat ein paar Wörter. Dies ist ein Beispieltext, der ein paar Wörter hat und auch noch ein paar mehr, um die Zeile etwas länger zu machen. Darüber hinaus ist er nur dafür da, um genügend Testtext zusammenzubekommen. Dem Text selbst macht das nicht so viel aus. Früher einmal mehr, als er noch nicht so selbstbewusst war. Heute kennt er seine Rolle als Blindtext und fügt sich selbstbewusst ein. Er ist ja irgendwie wichtig. Manchmal jedoch, ganz manchmal, weint er in der Nacht, weil er niemals bis zum Ende gelesen wird. Doch das hat ja jetzt zum Glück ein Ende.',
  sanitized: 'Ein toller Beispieltext ist der Blindtext Er hat ein paar Wrter Dies ist ein Beispieltext der ein paar Wrter hat und auch noch ein paar mehr um die Zeile etwas lnger zu machen Darber hinaus ist er nur dafr da um gengend Testtext zusammenzubekommen Dem Text selbst macht das nicht so viel aus Frher einmal mehr als er noch nicht so selbstbewusst war Heute kennt er seine Rolle als Blindtext und fgt sich selbstbewusst ein Er ist ja irgendwie wichtig Manchmal jedoch ganz manchmal weint er in der Nacht weil er niemals bis zum Ende gelesen wird Doch das hat ja jetzt zum Glck ein Ende',
  list: ['Ein', 'toller', 'Beispieltext', 'ist', 'der', 'Blindtext', 'Er', 'hat', 'ein', 'paar', 'Wrter', 'Dies', 'ist', 'ein', 'Beispieltext', 'der', 'ein', 'paar', 'Wrter', 'hat', 'und', 'auch', 'noch', 'ein', 'paar', 'mehr', 'um', 'die', 'Zeile', 'etwas', 'lnger', 'zu', 'machen', 'Darber', 'hinaus', 'ist', 'er', 'nur', 'dafr', 'da', 'um', 'gengend', 'Testtext', 'zusammenzubekommen', 'Dem', 'Text', 'selbst', 'macht', 'das', 'nicht', 'so', 'viel', 'aus', 'Frher', 'einmal', 'mehr', 'als', 'er', 'noch', 'nicht', 'so', 'selbstbewusst', 'war', 'Heute', 'kennt', 'er', 'seine', 'Rolle', 'als', 'Blindtext', 'und', 'fgt', 'sich', 'selbstbewusst', 'ein', 'Er', 'ist', 'ja', 'irgendwie', 'wichtig', 'Manchmal', 'jedoch', 'ganz', 'manchmal', 'weint', 'er', 'in', 'der', 'Nacht', 'weil', 'er', 'niemals', 'bis', 'zum', 'Ende', 'gelesen', 'wird', 'Doch', 'das', 'hat', 'ja', 'jetzt', 'zum', 'Glck', 'ein', 'Ende'],
  numberOfWords: 106
}
const insane = {
  text: 'Ein Buch kostet 5€; Eine 1-3cm² große Briefmarke kostet 2$ oder 4$; also nur 40% oder 80% von einem Buch!',
  sanitized: 'Ein Buch kostet Eine cm groe Briefmarke kostet oder also nur oder von einem Buch',
  list: ['Ein', 'Buch', 'kostet', 'Eine', 'cm', 'groe', 'Briefmarke', 'kostet', 'oder', 'also', 'nur', 'oder', 'von', 'einem', 'Buch'],
  numberOfWords: 15
}
const totallyInsane = {
  text: `# Kostentabelle:
    Buch | 100 Seiten | 5€
    Briefmarke | 1cm² | 2€ bzw. ~ 2,18$
    Briefmarke | 2cm² | 4€ ~ 4,36$

  `,
  sanitized: 'Kostentabelle Buch Seiten Briefmarke cm bzw Briefmarke cm',
  list: ['Kostentabelle', 'Buch', 'Seiten', 'Briefmarke', 'cm', 'bzw', 'Briefmarke', 'cm'],
  numberOfWords: 8
}

describe('A Paragraph', () => {
  const maxLength = 200000

  it('must not contain more then 200.000 characters', () => {
    const reallyLong = 'a'.repeat(maxLength)

    expect(() => new Paragraph(reallyLong)).not.toThrow(MaxSizeExceededError)
    expect(() => new Paragraph(reallyLong + 'a')).toThrow(MaxSizeExceededError)
  })

  it('splits the text into a list of words', () => {
    const paragraph = new Paragraph('one two two three')
    // check if it returns the words in the same order
    expect(paragraph.words).toStrictEqual(['one', 'two', 'two', 'three'])
    expect(paragraph.words).not.toStrictEqual(['one', 'three', 'two', 'two'])
    // check if it does not merge dublicates
    expect(paragraph.words).not.toStrictEqual(['one', 'two', 'three'])
  })

  it('must contain at least one word', () => {
    expect(() => new Paragraph('')).toThrow(EmptyError)
  })

  describe('sanitizes itself', () => {
 
    it('and removes all special characters', () => {
      expect(new Paragraph(sane.text).text).toStrictEqual(sane.sanitized)
      expect(new Paragraph(insane.text).text).toStrictEqual(insane.sanitized)
      expect(new Paragraph(totallyInsane.text).text).toStrictEqual(totallyInsane.sanitized)
    })

    it('and reduces multiple whitespaces to single and trims the text', () => {
      expect(new Paragraph(' one  two ').text).toBe('one two')
    })
  })
  
  it('counts the number of words', () => {
    expect(new Paragraph(sane.text).words.length).toStrictEqual(sane.numberOfWords)
    expect(new Paragraph(insane.text).words.length).toStrictEqual(insane.numberOfWords)
    expect(new Paragraph(totallyInsane.text).words.length).toStrictEqual(totallyInsane.numberOfWords)
  })

})
