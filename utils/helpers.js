export function sortList(list) {
  list.sort((a, b) => {
    let first;
    let second;
    if (a.Chapter_No) {
      first = Number(a.Chapter_No);
      second = Number(b.Chapter_No);
    } else {
      first = Number(a.Article_No);
      second = Number(b.Article_No);
    }
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  });
  return list;
}

export function LocaleString(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
