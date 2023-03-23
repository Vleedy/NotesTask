type Note = {
  name: string;
  description: string;
  date: number;
  hashtags: Array<string>;
};
export function getHashTagList(notes: Note[]) {
  const set = new Set<string>();
  notes.forEach((item) => {
    item.hashtags.forEach((el) => set.add(el));
  });
  return Array.from(set);
}
