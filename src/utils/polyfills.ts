// src/utils/polyfills.ts

// Polyfill for `Array.prototype.includes`
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    const len = this.length;
    if (len === 0) return false;
    let start = fromIndex || 0;
    if (start < 0) start = len + start;
    for (let i = start; i < len; i++) {
      if (this[i] === searchElement) return true;
    }
    return false;
  };
}

// Polyfill for `Object.entries`
if (!Object.entries) {
  Object.entries = function (obj: { [key: string]: any }) {
    return Object.keys(obj).map((key) => [key, obj[key]]) as [string, any][]; // ✅ Cast to the correct type
  };
}

// Polyfill for `String.prototype.trim`
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  };
}

// Polyfill for `Number.isInteger`
if (!Number.isInteger) {
  Number.isInteger = function (value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
  };
}

// Export an empty object to mark this file as a module
export {}; 
