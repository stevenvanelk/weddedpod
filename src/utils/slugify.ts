export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')       // replace spaces with dashes
    .replace(/[^\w\-]+/g, '')   // remove non-word characters
    .replace(/\-\-+/g, '-')     // collapse multiple dashes
    .replace(/^-+|-+$/g, '');   // trim leading/trailing dashes
}
