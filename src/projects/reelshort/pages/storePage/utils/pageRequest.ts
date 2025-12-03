/*
 * @Author: wuchuangzhen
 * @Date: 2021-04-01 16:37:40
 * @LastEditors: wuchuangzhen
 * @LastEditTime: 2021-04-16 15:01:40
 * @Description: file content
 */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
// import dayjs from 'dayjs'

import { Toast } from 'antd-mobile-v5'
import Cookies from 'js-cookie'
// import EndedModal from '../components/endModal'
/**
 * 异常处理程序
 */

const errorHandler = (error: any) => {
  const { response } = error
  console.log(response, 'response', error)

  // if (response && response?.status === 401) {

  // }

  if (
    (error?.data !== undefined && error?.response !== null) ||
    error.toString().indexOf('timeout')
  ) {
    // console.log('超时')
    Toast.show({
      content:
        'Network connection error. Please check your network settings and try again.',
      duration: 5000
    })
    // localStorage.removeItem('token')
    Cookies.remove('token', { path: '' })
  }
  throw error
}

const request = extend({
  // 默认错误处理
  errorHandler,
  useCache: true,
  timeout: 10000
  // credentials: 'include', // 默认请求是否带上cookie
})

request.interceptors.request.use(
  (url: string, options: any) => {
    const token = Cookies.get('token')

    if (url.indexOf('login') === -1) {
      const headers = {
        authorization: token
        // 'Content-Referer': location.href
      }
      return {
        url,
        options: {
          ...options,
          headers
        }
      }
    }
    return {
      url,
      options: { ...options }
    }
  },
  { global: false }
)

request.interceptors.response.use(
  async (response, req) => {
    if (req.responseType === 'blob') {
      return response
    }

    if (window.handleClientToken && response.status === 401) {
      // http状态码401 调用app.tsx中挂载到window的handleClientToken方法上
      // 重新登录
      window.handleClientToken()
    }
    const res = await response.clone().json()
    // 5009902-活动结束 7009904-表示用户在活动期间没有进入过活动而在活动结束后进入了活动
    // if (res.code === 5009902 || res.code === 7009904) {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   EndedModal.show()
    // }

    return res
  },
  { global: false }
)

export default request
