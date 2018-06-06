/**
 * Get type of param
 * return `undefined|null|string|number|object|array|function|boolean`
 * @export
 * @param {any} param
 * @returns {String}
 */
export function getType(param) {
    let type = Object.prototype.toString.call(param)
    type = type.replace(/\[object /, '')
    type = type.replace(/\]/, '')
    return type.toLowerCase()
}

/**
 * Generate random string with specified length, default is 6, max is 64
 */
export function genRandomString(mytoken, len) {
    const DEFAULT_TOKEN = '0123456789qwertyuioplkjhgfdsazxcvbnmABCDEFGHIJKLMNOPQRSTUVWXYZ@#$' // %&
    const DEFAULT_LEN = 6
    const MAX_LEN = 64
    if (!mytoken) {
      mytoken = DEFAULT_TOKEN
      len = DEFAULT_LEN
    } else if (!len) {
      if (typeof mytoken === 'number') {
        len = mytoken
        mytoken = DEFAULT_TOKEN
      } else {
        len = DEFAULT_LEN
      }
    }
    len = len > MAX_LEN ? MAX_LEN : len
    let randomStr = ''
    for (let i = 0; i < len; i++) {
      randomStr += mytoken.charAt(Math.ceil(Math.random() * 100000000) % mytoken.length)
    }
    return randomStr
  }