import crypto, { createHmac } from 'crypto'
import util from 'util'
import { isInteger } from 'lodash'

export const SALT_MAX_LENGTH = 1024
export const SALT_DEFAULT_LENGTH = 32

function checkSaltLength(length: number) {
  if (!isInteger(length)) {
    throw Error(
      `Value 'length' must be an integer. Received ${length}`
    )
  }

  if (length < 0 || length > SALT_MAX_LENGTH) {
    throw Error(
      `Value 'length' is out of range. ` +
      `It must be >= 0 && <= ${SALT_MAX_LENGTH}. ` +
      `Received ${length}`
    )
  }
}

export function generateSaltSync(
  length: number = SALT_DEFAULT_LENGTH
): string {
  checkSaltLength(length)
  return length == 1 
    ? crypto.randomBytes(1).toString('hex')[0]
    : crypto.randomBytes(length / 2).toString('hex')
}

export async function generateSalt(
  length: number = SALT_DEFAULT_LENGTH
): Promise<string> {
  return generateSaltSync(length)
}

export const HASH_MIN_ITERATIONS = 1
export const HASH_MAX_ITERATIONS = 4294967296
export const HASH_DEFAULT_ITERATIONS = 100

export const HASH_MIX_LENGTH = 16
export const HASH_MAX_LENGTH = 1024
export const HASH_DEFAULT_LENGTH = 128

function checkHashIterations(iterations: number) {
  if (!isInteger(iterations)) {
    throw Error(
      `Value 'iterations' must be an integer. Received ${iterations}.`
    )
  }

  if (iterations < HASH_MIN_ITERATIONS || iterations > HASH_MAX_ITERATIONS) {
    throw Error(
      `Value 'iterations' is out of range. ` +
      `It must be >= ${HASH_MIN_ITERATIONS} && <= ${HASH_MAX_ITERATIONS}. ` +
      `Received ${iterations}`
    )
  }
}

function checkHashLength(length: number) {
  if (!isInteger(length)) {
    throw Error(
      `Value 'length' must be an integer. Received ${length}`
    )
  }

  if (length < HASH_MIX_LENGTH || length > HASH_MAX_LENGTH) {
    throw Error(
      `Value 'length' is out of range. ` +
      `It must be >= ${HASH_MIX_LENGTH} && <= ${HASH_MAX_LENGTH}. ` +
      `Received ${length}`
    )
  }
}

export function generateHashSync(
  password: string,
  salt: string,
  iterations: number = HASH_DEFAULT_ITERATIONS,
  length: number = HASH_DEFAULT_LENGTH
): string {
  checkHashIterations(iterations)
  checkHashLength(length)
  return crypto.pbkdf2Sync(password, salt, iterations, length / 2, 'sha512')
    .toString('hex')
}

const pbkdf2Promise = util.promisify(crypto.pbkdf2)
export async function generateHash(
  password: string,
  salt: string,
  iterations: number = HASH_DEFAULT_ITERATIONS,
  length: number = HASH_DEFAULT_LENGTH
): Promise<string> {
  checkHashIterations(iterations)
  checkHashLength(length)
  return await pbkdf2Promise(password, salt, iterations, length / 2, 'sha512')
    .then(buffer => buffer.toString('hex'))
}

export async function generationPSignedHash(str: string, secret: string): Promise<string> {
  var binKey =  Buffer.from(secret, "hex");
  const hmac = crypto.createHmac('sha256', binKey)
  hmac.update(str);
  return hmac.digest('hex');
}

export function bitwiseXorHexString(pinBlock1:string, pinBlock2:string) {
  var result = ''
  for (let index = 0; index < 32; index++) {
    const temp = (parseInt(pinBlock1.charAt(index), 32) ^ parseInt(pinBlock2.charAt(index), 32)).toString(32).toUpperCase()
    result += temp
  }
  return result
}