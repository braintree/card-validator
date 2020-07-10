// Polyfill taken from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill>.

export const isArray =
  Array.isArray ||
  function (arg?): boolean {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
