import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = `${propName}[${key}]`;
            let subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}

export function decodeParams(params) {
  let result = {}
  if (params) {
    params = params.split('&')
    params.forEach(item => {
      let arr = item.split('=');
      let value = decodeURIComponent(arr[1]);
      if ((value.indexOf('[') > -1 && value.indexOf(']') > -1) ||
        (value.indexOf('{') > -1 && value.indexOf('}') > -1)) {
        value = JSON.parse(value);
      }
      result[decodeURIComponent(arr[0])] = value;
    })
  }
  return result
}
