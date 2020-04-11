/**
 * @function
 * @name checkStringLength
 * @description 检测字符串长度
 * @param {string}} str 检测的字符串
 */
const checkStringLength = (str) => {
  let len = 0
  if (str) {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) === 32) {
        len += 1
      } else if (str.charCodeAt(i) > 32 && str.charCodeAt(i) < 127) {
        len += 1
      } else {
        len += 2
      }
    }
  }
  return len
}

/**
 * @function
 * @name returnLengthString
 * @description 返回指定的字符窜长度
 * @param {String}} str 检测的字符串
 * @param {Number}} length 字符的总长度
 */
const returnLengthString = (str, length) => {
  let len = 0
  let strHtml = ''
  if (checkStringLength(str) > length) {
    for (let i = 0; i < str.length; i++) {
      let num = 0
      if (str.charCodeAt(i) === 32) {
        num += 1
      } else if (str.charCodeAt(i) > 32 && str.charCodeAt(i) < 127) {
        num += 1
      } else {
        num += 2
      }
      if (len + num > length) {
        return strHtml
      } else {
        strHtml += str[i]
        len += num
      }
    }
  } else {
    strHtml = str
  }
  return strHtml
}

export {
  checkStringLength,
  returnLengthString
}
