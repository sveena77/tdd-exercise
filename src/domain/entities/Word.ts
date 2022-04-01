import { EmptyError, IllegalCharacterError }  from "../errors"

export default class Word {
  private allowedCharacters: RegExp = /[^a-zA-Z]/g
  private _text: string

  constructor (word: string) {
    if (word.length === 0)
      throw new EmptyError()

    if (word.match(/\s/))
      throw new IllegalCharacterError
    
    this._text = this.sanitize(word)
  }

  get text (): string {
    return this._text
  }

  private sanitize (word: string): string {
    return word.replace(this.allowedCharacters, '')
  }
}