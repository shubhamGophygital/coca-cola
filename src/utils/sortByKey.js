function sortByKey(array, key, type = "ASC") {
  if (!Array.isArray(array)) {
    throw new Error(`provided ${array} is not an array`);
  }
  return array.sort((a, b) => {
    let x;
    let y;
    if (typeof a === "number" || typeof b === "number") {
      x = a[key] || 0;
      y = b[key] || 0;
    } else {
      x = a[key]?.toString()?.toLowerCase() || "";
      y = b[key]?.toString()?.toLowerCase() || "";
    }
    if (type == "ASC") {
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      return x < y ? 1 : x > y ? -1 : 0;
    }
  });
}

export default sortByKey;
