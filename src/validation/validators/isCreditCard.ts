import isValidCardFormat from "../utils/isValidCardFormat.ts"
import passesLuhnAlgorithm from "../utils/passesLuhnsAlgorith.ts"

export default function isCard(val: string): boolean | Array<boolean | string[]> {

  const value: Array<string> = val.split('').filter((char: string) => char != ' ')

  if (isNaN(Number(value.join('')))) {
    return false
  }
  const isCardFormat: boolean | Array<boolean | string[]> = isValidCardFormat(value.join(''))
  if (isCardFormat && passesLuhnAlgorithm(value)) {
    const cards = isCardFormat[1]
    return [true, cards]
  }
  return false
}