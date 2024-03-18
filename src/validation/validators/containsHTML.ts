export default function containsHTML(string: string):boolean {
  const htmlFinder = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
  const selfClosingHTMLFinder = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*\/>/;

  return htmlFinder.test(string) || selfClosingHTMLFinder.test(string)
}