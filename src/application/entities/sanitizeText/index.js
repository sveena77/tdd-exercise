export default function sanitizeText(text = '') {
  return text
    .replaceAll(/[^a-zA-Z ]/g, '')
    .replaceAll(/\s+/g, ' ')
    .trim()
}