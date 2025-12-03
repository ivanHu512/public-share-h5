/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
import { Toast } from 'antd-mobile'
import { getEnv, isDevelopment } from '@/utils/utils'
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
    Toast.info(
      'Network connection error. Please check your network settings and try again.'
    )
    localStorage.removeItem('cToken')
  }
  throw error
}

const request = extend({
  // 默认错误处理
  errorHandler,
  useCache: true,
  timeout: 20000
  // credentials: 'include', // 默认请求是否带上cookie
})

request.interceptors.request.use(
  (url: string, options: any) => {
    console.log('环境', getEnv(), url, isDevelopment)
    // 如果本地运行就不处理否则把请求地址的/api替换成/v，服务器会把/v的请求转发到V项目游戏接口
    const _url = !isDevelopment ? url.replace('/api', '/v') : url
    const headers: any = {
      uid: localStorage.getItem('uid') || ''
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
    if (req.responseType === 'blob') {
      return response
    }

    const res = await response.clone().json()

    return res
  },
  { global: false }
)

export default request
