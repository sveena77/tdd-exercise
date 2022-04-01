import { EmptyError, ValidationError, MaxSizeExceededError }  from "../errors"
import Word from './Word'

export default class Paragraph {
  private maxLength: number = 200000
  private _words: string[] = []
  private _text: string = ''

  constructor (text:string) {
    if (text.length > this.maxLength)
      throw new MaxSizeExceededError

    this._text = this.sanitize(text)
    this._words = this.generateWordList(this._text)
  }

  get text (): string {
    return this._text
  }

  get words (): string[] {
    return this._words
  }

  private sanitize (text: string): string  {
    return text
      .replace(/[^a-zA-Z\s]/g, '') // removes all non word characters and keeps whitespaces
      .replace(/\s{2,}/g, ' ') // removes multiple whitespaces
      .trim()
  }

  private generateWordList (text: string): string[] {
    const separator: string = ' '
    const words: string[] = []
    text.split(separator).forEach((word) => {
      try {
        const wordInstance = new Word(word)
        words.push(wordInstance.text)
      } catch (error) {
        if (error instanceof EmptyError)
          throw new EmptyError
        else
          throw new ValidationError
      }
    })
    return words
  }
}