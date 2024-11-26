export enum Mode { 
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test'
}

export function parseMode(str: string): Mode {
  const mode = str as Mode
  if (!Object.values(Mode).includes(mode)) {
    throw new Error(`Unexpected NODE_ENV value '${mode}'`)
  }
  return mode
}
