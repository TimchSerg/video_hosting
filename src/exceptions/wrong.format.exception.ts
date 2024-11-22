export class WrongFormatException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'WrongFormatException'
  }
}
