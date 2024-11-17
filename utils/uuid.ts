import { v4 as generate } from 'uuid'
import validate from 'uuid-validate'

export class UUID {

  static EMPTY: UUID = new UUID('00000000-0000-0000-0000-000000000000')

  static from(value: string): UUID {
    if (!validate(value, 4)) {
      throw Error(`Wrong uuid format ${value}`)
    }
    return new UUID(value)
  }

  static generate(): UUID {
    return new UUID(generate())
  }

  private _value: string

  private constructor(value: string) {
    this._value = value
  }

  toString(): string {
    return this._value
  }

  clone(): UUID {
    return new UUID(this._value)
  }

  equals(uuid: UUID): boolean {
    return this._value === uuid._value
  }
}