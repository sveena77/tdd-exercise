const maxLength = 200000
export default {
  empty: '',
  allowedCharacters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  onlySpecialChars: '!"§$% %&/(',
  sane: {
    text: 'Ein toller Beispieltext ist der Blindtext. Er hat ein paar Wörter. Dies ist ein Beispieltext, der ein paar Wörter hat und auch noch ein paar mehr, um die Zeile etwas länger zu machen. Darüber hinaus ist er nur dafür da, um genügend Testtext zusammenzubekommen. Dem Text selbst macht das nicht so viel aus. Früher einmal mehr, als er noch nicht so selbstbewusst war. Heute kennt er seine Rolle als Blindtext und fügt sich selbstbewusst ein. Er ist ja irgendwie wichtig. Manchmal jedoch, ganz manchmal, weint er in der Nacht, weil er niemals bis zum Ende gelesen wird. Doch das hat ja jetzt zum Glück ein Ende.',
    list: ['Ein', 'toller', 'Beispieltext', 'ist', 'der', 'Blindtext', 'Er', 'hat', 'ein', 'paar', 'Wrter', 'Dies', 'ist', 'ein', 'Beispieltext', 'der', 'ein', 'paar', 'Wrter', 'hat', 'und', 'auch', 'noch', 'ein', 'paar', 'mehr', 'um', 'die', 'Zeile', 'etwas', 'lnger', 'zu', 'machen', 'Darber', 'hinaus', 'ist', 'er', 'nur', 'dafr', 'da', 'um', 'gengend', 'Testtext', 'zusammenzubekommen', 'Dem', 'Text', 'selbst', 'macht', 'das', 'nicht', 'so', 'viel', 'aus', 'Frher', 'einmal', 'mehr', 'als', 'er', 'noch', 'nicht', 'so', 'selbstbewusst', 'war', 'Heute', 'kennt', 'er', 'seine', 'Rolle', 'als', 'Blindtext', 'und', 'fgt', 'sich', 'selbstbewusst', 'ein', 'Er', 'ist', 'ja', 'irgendwie', 'wichtig', 'Manchmal', 'jedoch', 'ganz', 'manchmal', 'weint', 'er', 'in', 'der', 'Nacht', 'weil', 'er', 'niemals', 'bis', 'zum', 'Ende', 'gelesen', 'wird', 'Doch', 'das', 'hat', 'ja', 'jetzt', 'zum', 'Glck', 'ein', 'Ende'],
    numberOfWords: 106
  },
  insane: {
    text: 'Ein Buch kostet 5€; Eine 1-3cm² große Briefmarke kostet 2$ oder 4$; also nur 40% oder 80% von einem Buch!',
    list: ['Ein', 'Buch', 'kostet', 'Eine', 'cm', 'groe', 'Briefmarke', 'kostet', 'oder', 'also', 'nur', 'oder', 'von', 'einem', 'Buch'],
    numberOfWords: 15
  },
  totallyInsane: {
    text: `# Kostentabelle:
      Buch | 100 Seiten | 5€
      Briefmarke | 1cm² | 2€ bzw. ~ 2,18$
      Briefmarke | 2cm² | 4€ ~ 4,36$

    `,
    list: ['Kostentabelle', 'Buch', 'Seiten', 'Briefmarke', 'cm', 'bzw', 'Briefmarke', 'cm'],
    numberOfWords: 8
  },
  reallyLong: 'a'.repeat(maxLength)
}