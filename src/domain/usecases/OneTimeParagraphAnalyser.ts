import ParagraphAnalyser from "../ports/ParagraphAnalyser"
import Paragraph from '../entities/Paragraph'
import Word from "../entities/Word"
import { EmptyError, ValidationError } from "../errors"

export default class OneTimeParagraphAnalyser implements ParagraphAnalyser {
  findFirstShortestTextpart(text: string, search: string[]): string {
    const paragraph = this.generateParagraph(text)
    const searchWords = this.generateSearchWords(search)

    if (searchWords.length > paragraph.words.length)
      throw new ValidationError('searchlist must not be longer than the paragraph')

    return this.findTextpart(paragraph, searchWords)
  }

  private generateParagraph (text:string): Paragraph {
    try {
      return new Paragraph(text)
    } catch (error) {
      throw new ValidationError
    }    
  }

  private generateSearchWords (search: string[]): Word[] {
    const searchWords: Word[] = []
    try {
      search.forEach((searchItem) => {
        const searchWord = new Word(searchItem)
        searchWords.push(searchWord)
      })
    } catch (error) {
      throw new ValidationError
    }
    if (searchWords.length < 1) {
      throw new EmptyError
    }
    return searchWords
  }


  private findTextpart (paragraph: Paragraph, searchWords: Word[]): string {
    for (let textpartLength = searchWords.length; textpartLength <= paragraph.words.length; textpartLength++) {
      for (let textpartPosition = 0; textpartPosition <= (paragraph.words.length - textpartLength); textpartPosition++) {
        const textpart = paragraph.words.slice(textpartPosition, textpartPosition + textpartLength)
        if (this.containsAllWords(textpart, searchWords)) {
          return textpart.join(' ')
        }
      }
    }
    return ''
  }

  private containsAllWords (textpart: string[], searchWords: Word[]): boolean {
    const wordList = [...searchWords]
    textpart.forEach((word) => {
      const index = wordList.findIndex((searchWord) => searchWord.text.toLowerCase() === word.toLowerCase())
      if (index !== -1) {
        wordList.splice(index, 1)
      }
    })
    return wordList.length === 0
  }
}