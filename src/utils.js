export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function get(key) {
  return (obj) => obj[key];
}
