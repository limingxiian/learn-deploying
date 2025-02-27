import axios from 'axios';
import { message } from 'antd';
import errorCode from '@/utils/errorCode.js';
import { setToken, getToken, tansParams } from '@/utils/publicService.js'

let service = null

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 对应国际化资源文件后缀
axios.defaults.headers['Content-Language'] = 'zh_CN'

service = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8080', // 可以根据实际情况设置
  headers: {
    'Content-Type': 'application/json',
  }
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  // 在发送请求之前做些什么
  return config;
}, error => {
  console.log(error)
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(res => {
    const { data, headers } = res;
    let tokenInfo = headers['ACCESS-TOKEN'] || headers['access-token'];
    if (tokenInfo) {
      tokenInfo = JSON.parse(tokenInfo);
      let token = tokenInfo.access_token;
      setToken('token', token);
      localStorage.setItem('token', token);
    }
    // 未设置状态码则默认成功状态
    const code = data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
        return data
    }

    if (code === 401) {
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
        message.error(msg || '系统错误')
        return Promise.reject(new Error(msg))
    } else if (code !== 200) {
        message.error(msg || '请求信息错误')
        return Promise.reject('error')
    } else {
        return data
    }
}, error => {
    console.log(error)
    let tip = error.message;
    if (tip == "Network Error") {
        tip = "后端接口连接异常";
    } else if (tip.includes("timeout")) {
        tip = "系统接口请求超时";
    } else if (tip.includes("Request failed with status code")) {
        tip = "系统接口" + tip.substr(msg.length - 3) + "异常";
    }
    message.error(tip)
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;