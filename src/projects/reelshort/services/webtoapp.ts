import request from '@reelshort/utils/request'
import ignoreErrorrequest from '@reelshort/utils/ignoreErrorRequest'
import { getTimeZoneAndDomain } from '../utils/urils'

/**
 * 获取ip
 */
export const getIp = (): Promise<any> => {
  return ignoreErrorrequest(`/api/comm/apLink/ip`, {
    method: 'post'
  })
}

/**
 * 上报业务参数
 */

export const reportAdInfo = (data: any): Promise<any> => {
  return ignoreErrorrequest(`/api/comm/apLink/send`, {
    method: 'post',
    data: {
      ...data,
      // 解决同时发送两次请求后发送的被先发送的数据覆盖
      ts: new Date().getTime()
    }
  })
}

/** 获取落地页信息 */
export const getDrainageInfo = (id: string) => {
  return request('/api/video/book/drainage', {
    method: 'post',
    data: {
      id,
      ...getTimeZoneAndDomain()
    }
  })
}
