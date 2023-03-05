/**
 * @desc - Parse anchor tag
 * @param {String} str - HTML string
 * @returns {String} - HTML string without anchor tag
 */
export const parseAnchorTag = (str) => {
    const regStart = /<a[^>]*>/g
    const regEnd = /<\/a>/g

    return str.replace(regStart, '').replace(regEnd, '')
}