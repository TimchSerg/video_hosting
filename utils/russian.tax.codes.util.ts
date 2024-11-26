import { map, parseInt, floor } from 'lodash'

const REGEX_KPP = /^\d{4}[\dA-Z][\dA-Z]\d{3}$/

const REGEX_NUMBERS = /^\d+$/
function containsNumbers(str: string) {
  return REGEX_NUMBERS.test(str)
}

export function isINN(inn: string): boolean {
  const length = inn.length

  if (length == 10 && containsNumbers(inn)) {
    const numbers = map(inn, parseInt)
    const number10 = (
      2 * numbers[0] + 4 * numbers[1] + 10 * numbers[2] +
      3 * numbers[3] + 5 * numbers[4] +  9 * numbers[5] +
      4 * numbers[6] + 6 * numbers[7] +  8 * numbers[8]
    ) % 11 % 10
    return number10 === numbers[9]
  }

  if (length == 12 && containsNumbers(inn)) {
    const numbers = map(inn, parseInt)
    const number11 = (
      7  * numbers[0] + 2 * numbers[1] + 4 * numbers[2] +
      10 * numbers[3] + 3 * numbers[4] + 5 * numbers[5] +
      9  * numbers[6] + 4 * numbers[7] + 6 * numbers[8] +
      8  * numbers[9]
    ) % 11 % 10

    const number12 = (
      3 * numbers[0] + 7  * numbers[1] + 2 * numbers[2] +
      4 * numbers[3] + 10 * numbers[4] + 3 * numbers[5] +
      5 * numbers[6] + 9  * numbers[7] + 4 * numbers[8] +
      6 * numbers[9] + 8  * numbers[10]
    ) % 11 % 10
    return number11 === numbers[10] && number12 === numbers[11]
  }

  return false
}

export function isKPP(kpp: string): boolean {
  return kpp.length == 9 && REGEX_KPP.test(kpp)
}

export function isOGRN(orgn: string): boolean {
  const length = orgn.length

  if (length == 13 && containsNumbers(orgn)) {
    let number13 = floor((parseInt(orgn) / 10) % 11)
    if (number13 === 10) number13 = 0
    return number13 === parseInt(orgn.charAt(12))
  }

  if (length == 15 && containsNumbers(orgn)) {
    const number15 = floor((parseInt(orgn) / 10) % 13) % 10
    return number15 === parseInt(orgn.charAt(14))
  }

  return false
}