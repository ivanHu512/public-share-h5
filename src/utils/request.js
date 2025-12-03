/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
import { notification } from 'antd'
// import { getEnv } from './utils'
import domains from './domains'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  console.log('errorHandler -> error', error)

  const { response } = error

  const isInsertRequest = response?.url?.includes('/avg/recordInsert') || false // 该次请求是否是上报接口

  if (isInsertRequest) return response

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    notification.error({
      message: errorText
    })
  } else if (!response) {
    notification.error({
      description: '网络发生异常，无法连接服务器',
      message: '网络异常'
    })
    return {}
  }

  return response
}

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  // 默认错误处理
  errorHandler,
  useCache: true
  // credentials: 'include', // 默认请求是否带上cookie
})

/**
 * 数据统计接口
 *
 */
const ENV = REACT_APP_ENV
const DOMAIN = ENV === 'dev' ? null : domains[ENV].feedback

const isInsertRequest = (url) => url.includes('/avg/recordInsert') || null
const recordInsertRequest = (res, req, startTime, limitTime = 2000) => {
  if (!DOMAIN) return
  const now = Number(new Date())
  const during = now - startTime
  if (during <= limitTime) return

  request(`${DOMAIN}/open/avg/recordInsert`, {
    method: 'GET',
    params: {
      app_id: 'cm1003',
      host: location.origin,
      url: res.url
        .split('//')[1]
        .split(`${res.url.split('/')[2]}`)[1]
        .split('?')[0],
      http_request_type: req.method,
      request_time: during,
      data: JSON.stringify({ ...req.params, ...req.data })
    }
  })
}

request.interceptors.request.use(async (url, options) => {
  const token = `Bearer ${localStorage.getItem('token')}`

  if (isInsertRequest(url))
    return {
      url,
      options: {
        ...options
      }
    }
  const start = Number(new Date())

  options.reqStartTime = start

  // 全局清空无用字段
  options.params.pageSize = undefined
  options.params.current = undefined
  if (url.indexOf('login') === -1) {
    const headers = {
      authorization: token
    }
    return {
      url,
      options: { ...options, headers }
    }
  }
  return {
    url,
    options: { ...options }
  }
})

request.interceptors.response.use(async (response, req) => {
  if (req.responseType === 'blob') {
    return response
  }
  const res = await response.clone().json()
  if (req.reqStartTime) {
    recordInsertRequest(response, req, req.reqStartTime, 3000)
  }

  if (res.code === 401) {
    // localStorage.clear(); // 清除缓存
    localStorage.removeItem('token') // 清除token缓存，防止token存在会登录报错
    setTimeout(() => logOut(), 2000)
    return {}
  }

  if (res.code !== 0 && req.reqStartTime) {
    notification.error({
      message: res.msg || res.message
    })
  }
  return res
})

export default request
