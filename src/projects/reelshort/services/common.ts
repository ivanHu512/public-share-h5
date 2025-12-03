import request from '@reelshort/utils/request'

// 登录参数
export interface ILogin {
  /** 从客户端获取的token加密的json串 */
  clientToken: string
  /** 当前的秒级时间戳 */
  time: number
  /** md5加密串 */
  sign: string
}
/** H5登录 */
export const getH5Loading = (params: ILogin) => {
  return request('/api/auth/innerH5login', {
    method: 'POST',
    data: params
  })
}
