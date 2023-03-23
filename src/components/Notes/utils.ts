export function filterNotes(a: string[], b: string[]) {
  let hash = a.reduce((acc: { [key: string]: boolean }, i: string) => {
    acc[i] = true;
    return acc;
  }, {});
  return b.every((i) => i in hash);
}
