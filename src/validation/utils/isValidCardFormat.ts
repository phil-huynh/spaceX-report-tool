import cardFormats from "./cardFormats.ts";

export default function isValidCardFormat(num: string) {
  const matches: string[] = [];
  for(const format in cardFormats) {
    if (cardFormats[format](num)) {
      matches.push(format);
    }
  }
  return matches.length > 0 ? [true, matches] : false;
}