// Resolves bundled local SVG illustrations (Noto Emoji artwork, see assets/images/ATTRIBUTION.md).
// Keys are Unicode code points, e.g. '1F355' is the pizza.
const modules = import.meta.glob('../assets/images/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function getImage(code) {
  return modules[`../assets/images/${code}.svg`] ?? modules['../assets/images/1F3EA.svg']
}
