import { getEnv } from '@/utils/utils'
import { getNetworkType } from './index'

const feedbackUrl = {
  dev: 'https://dev-h5.stardustworld.cn/feedback/allfb/#/',
  development: 'https://dev-h5.stardustworld.cn/feedback/allfb/#/',
  test: 'https://dev-h5.stardustworld.cn/feedback/allfb/#/',
  gray: 'https://feedback.crazymaplestudios.com/feedback/allfb/#/',
  prod: 'https://feedback.crazymaplestudios.com/feedback/allfb/#/'
}

export const getFeedbackUrl = (): void => {
  const baseUrl = feedbackUrl[getEnv()] || feedbackUrl['prod']

  const networkType = getNetworkType()
  const params: {
    [key: string]: any
  } = {
    appid: 'cm1009',
    channel: localStorage.getItem('channel_id') ?? 'WEB41001',
    language: localStorage.getItem('lang') || 'en-US',
    from: 'feedback',
    devicePlatform: 'devicePlatform',
    uuid:
      [1, 2, 3, 4].reduce((p) => p + Math.floor(Math.random() * 10), '') +
      sessionStorage.getItem('uid'),
    deviceName: 'deviceName',
    // todo 更改 package.json的version时，记得同步更改这里
    version: 'V' + (localStorage.getItem('version') || '1.0.0'),
    did: localStorage?.getItem('uid') || 'did',
    network: networkType,

    // 最后一个字段，有新增字段放这上边
    'package-name': 'paypal_h5'
  }

  const deviceMatchArr = navigator.userAgent.match(/\([^\)]+\)/gi)
  // 系统、设备信息字符数组
  let deviceInfoArr: string[] = []
  if (deviceMatchArr && deviceMatchArr?.length > 0) {
    deviceInfoArr = deviceMatchArr[0]?.replace(/(\(|\))/gi, '')?.split(';')
  }
  if (deviceInfoArr?.length > 0) {
    deviceInfoArr = deviceInfoArr.map((i) => i.trim().replace(/\s+/gi, '_'))
  }
  if (deviceInfoArr?.length === 3) {
    if (deviceInfoArr[0].match(/windows/gi)) {
      params.devicePlatform = deviceInfoArr[0]
      params.deviceName = deviceInfoArr[1]
    } else {
      params.devicePlatform = deviceInfoArr[1]
      params.deviceName = deviceInfoArr[2]
    }
  } else if (deviceInfoArr?.length === 2) {
    params.devicePlatform = deviceInfoArr[1]
    params.deviceName = deviceInfoArr[0]
  }

  let paramsStr = ''
  for (const key in params) {
    if (key === 'package-name') {
      paramsStr += `${key}=${params[key]}`
    } else {
      paramsStr += `${key}=${params[key]}&`
    }
  }
  // return false
  // console.log(`${baseUrl}?${paramsStr}`);

  const a = document.createElement('a')
  a.href = `${baseUrl}?${paramsStr}`
  a.target = '_blank'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
