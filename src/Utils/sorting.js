// Sorts an array of objects alphabetically/or ascending order by key
export function sortByKey(array, key) {
  return array.sort(function(a, b) {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

// Sorts an array of objects in descending order by key
export function sortByKeyDesc(array, key) {
  return array.sort(function(a, b) {
    const x = a[key];
    const y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
}
