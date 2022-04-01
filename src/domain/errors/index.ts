export class EmptyError extends Error {
  constructor (message?: string) {
    super(message || 'Must not be empty')
    this.name = 'EmptyError'
  }
}

export class IllegalCharacterError extends Error {
  constructor (message?: string) {
    super(message || 'Must not contain illegal characters')
    this.name = 'IllegalCharacterError'
  }
}

export class ValidationError extends Error {
  constructor (message?: string) {
    super(message || 'The input is not valid')
    this.name = 'ValidationError'
  }
}

export class MaxSizeExceededError extends Error {
  constructor (message?: string) {
    super(message || 'Max size exceeded')
    this.name = 'MaxSizeExceededError'
  }
}