export const REGEX_E164 = /^\+[0-9]{6,15}$/

export function isE164(phone: string): boolean {
  return REGEX_E164.test(phone)
}