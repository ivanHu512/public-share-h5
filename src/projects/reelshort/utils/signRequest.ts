/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
import { createSign, getRandomStr, isJSON, aesDescryptResponse } from './urils'
import { Toast } from 'antd-mobile-v5'
import { getEnv, isDevelopment } from '@/utils/utils'
import dayjs from 'dayjs'

/**
 * 异常处理程序
 */

const errorHandler = (error: any) => {
  const { response } = error
  console.log(response, 'response', error)
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
    // 如果本地运行就不处理否则把请求地址的/api替换成/v，服务器会把/v的请求转发到V项目游戏接口
    const _url = !isDevelopment ? url.replace('/api', '/v') : url
    let devId = localStorage.getItem('devId')
    if (!devId) {
      devId = getRandomStr(12) + new Date().getTime()
      localStorage.setItem('devId', devId)
    }

    const commonHeader = {
      uid: localStorage.getItem('uid') || '0',
      channelId: 'WEB41001',
      ts: dayjs().unix(),
      apiVersion: '1.0.6',
      lang: localStorage.getItem('lang') || 'en',
      devId: devId,
      clientVer: '1.0.0'
    }

    const headers = {
      ...commonHeader,
      ...options.headers,
      sign: createSign({
        ...options.data,
        ...commonHeader,
        ...options.headers
      })
    }
    return {
      url: _url,
      options: {
        ...options,
        headers
      }
    }
  },
  { global: false }
)

request.interceptors.response.use(
  async (response, req) => {
    let res: any = {}
    const textStr = await response?.clone()?.text()
    if (!!textStr && !isJSON(textStr)) {
      const result = await response.clone().text()
      console.log({ result })
      try {
        res = aesDescryptResponse(result)
      } catch (error) {
        res = await response.clone().json()
        console.log(error)
      }
    } else {
      res = await response.clone().json()
    }
    return res
  },
  { global: false }
)

export default request
