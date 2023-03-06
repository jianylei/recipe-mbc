/**
 * @desc - Parse anchor tag
 * @param {String} str - HTML string
 * @returns {String} - HTML string without anchor tag
 */
export const parseAnchorTag = (str) => {
  const regStart = /<a[^>]*>/g;
  const regEnd = /<\/a>/g;

  return str.replace(regStart, '').replace(regEnd, '');
};

/**
 * @desc - Return array of numbers from start to end
 * @param {Number} start - Start number
 * @param {Number} end - End number
 * @returns {Array} - Array of numbers
 */
export const getRange = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};
