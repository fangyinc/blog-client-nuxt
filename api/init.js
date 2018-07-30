/**
 * Created by Staneyffer on 18-7-25.
 */

import axios from 'axios'
import cookies from 'js-cookie'
import {setAuthToken, resetAuthToken} from '../utils/auth'

// axios 配置
axios.defaults.timeout = 5000

axios.defaults.baseURL = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8801' : 'https://chengfangyin.cn:8443'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const token = cookies.get('access-token')

if (token) setAuthToken(token)
else resetAuthToken()

axios.interceptors.request.use(
  config => {
    return config
  },
  err => {
    // 错误回调
    return Promise.reject(err)
  })

axios.interceptors.response.use(
  response => {
    // 没有错误，直接返回响应
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        /**
         * 对响应统一处理，方便调试
         */
        case 401:
          console.log('用户认证有误')
          break
        case 400:
          console.log('请求有误')
          break
        case 500:
          console.log('服务器出错')
          break
        default:
          console.log('http请求失败, statusCode: ' + error.response.status)
          break
      }
    }
    return Promise.reject(error.response.data)
  })

export const request = (url, options = {}, method = 'get') => {
  console.debug('axios log: url is : ' + axios.defaults.baseURL + url)
  console.debug(options)
  let key = ~['delete', 'get', 'head'].indexOf(method) ? 'params' : 'data'
  return axios(Object.assign({
    'url': url,
    'method': method
  }, {[key]: options}))
}
/*
 // 自定义成功响应为: 状态码200到300之间
 'validateStatus': (status) => {
      return status >= 200 && status < 300
    }
 **/
