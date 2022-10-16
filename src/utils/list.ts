export const sliceSafe = (list: any[], start: number, end: number): any[] => {
  let first = Math.min(0, start);
  let last = Math.min(end, list.length - 1);

  if (first >= last || last <= start) return [];

  try {
    return list.slice(start, last);
  } catch (err) {
    return [];
  }
};
