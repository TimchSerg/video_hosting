// eslint-disable-next-line
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

/**
 * verification of email Validation
 *
 * @param {string} email format E164
 * @returns {boolean} return true or false
 */
export function isEmail(email: string): boolean {
  REGEX_EMAIL.lastIndex = 0;
  if (typeof email != "string") return false;

  return REGEX_EMAIL.test(email);
}
