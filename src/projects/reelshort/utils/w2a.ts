import { getCookie, getLocationVars } from '@/utils/utils'
import { getRatio } from './urils'

/** 处理w2a闪屏上报缺省广告参数问题 */
export const checkAdParams = ({
  mediaType,
  callback,
  success
}: {
  mediaType: 'fb' | 'tt' | 'sc'
  callback: (res: any) => void
  /** 不需要验证cookie或者验证成功 */
  success: () => void
}): void => {
  let time: NodeJS.Timeout
  // 检测是否有广告参数若没有则开启定时器
  if (mediaType === 'fb') {
    // 链接上的fbclid参数
    const { fbclid = '' } = getLocationVars()
    // 若有fbclid则判断cookie中的_fbc和fbclid是对应
    const checkFBC = () =>
      !fbclid || (getCookie('_fbc') || '').split('.').reverse()?.[0] === fbclid
    // 判断如果没有fbp则开启定时器
    if (!getCookie('_fbp') || !checkFBC()) {
      time = setInterval(() => {
        // 因为fbc可能不存在所以而fbp和fbc是同一个请求生成的所以只需要判断fbp
        if (getCookie('_fbp') && checkFBC()) {
          clearInterval(time)
          callback({
            _fbc: getCookie('_fbc'),
            _fbp: getCookie('_fbp')
          })
        }
      }, 50)
      return
    }
  }
  // snapchat中sc_cookie1验证判断
  if (mediaType === 'sc') {
    if (!getCookie('_scid')) {
      console.log(
        '%c [ 缺少snapchat广告参数 ]-17',
        'font-size:13px; background:pink; color:#bf2c9f;'
      )
      time = setInterval(() => {
        if (getCookie('_scid')) {
          clearInterval(time)
          callback({
            sc_cookie1: getCookie('_scid')
          })
        }
      }, 50)
      return
    }
  }
  // 因为tt内onelink会触发goBack导致闪屏页重新加载再次发送send所以不需要自己主动补报
  // else if (mediaType === 'tt') {
  //   if (!getCookie('_ttp')) {
  //     console.log(
  //       '%c [ 缺少TT广告参数 ]-17',
  //       'font-size:13px; background:pink; color:#bf2c9f;'
  //     )
  //     time = setInterval(() => {
  //       if (getCookie('_ttp')) {
  //         clearInterval(time)
  //         callback({
  //           ttp: getCookie('_ttp')
  //         })
  //       }
  //     }, 50)
  //     return
  //   }
  // }
  // 验证成功
  success()
}

/** 获取设备信息 */
export const getUserAgentInfo = (): Promise<null | {
  platform: string
  model: string
  platformVersion: string
}> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    if (typeof navigator?.userAgentData?.getHighEntropyValues === 'undefined') {
      resolve(null)
    }
    // @ts-ignore
    navigator.userAgentData
      .getHighEntropyValues([
        // 'architecture',
        // 'bitness',
        'model',
        'platformVersion',
        'fullVersionList'
      ])
      .then((ua: any) => {
        resolve({
          // architecture: ua.architecture,
          // bitness: ua.bitness,
          platform: ua.platform,
          model: ua.model,
          platformVersion: ua.platformVersion?.split('.')?.[0] || ''
          // fullVersionList: ua.fullVersionList,
        })
      })
      .catch((error: any) => {
        resolve(null)
      })
  })
}

/** 获取设备信息*/
export const getDeviceInfo = async () => {
  const UAData = await await getUserAgentInfo()
  let ua = navigator.userAgent
  console.log(
    '%c [ UAData?.platform ]-100',
    'font-size:13px; background:pink; color:#bf2c9f;',
    UAData?.platformVersion,
    UAData?.platform
  )
  if (UAData && UAData?.platformVersion && UAData?.platform) {
    ua = ua.replace(
      /Android\s+\d+;/,
      `${UAData?.platform} ${UAData?.platformVersion};`
    )
  }

  const h = Math.max(
    Math.floor((window.screen.width * getRatio()) / 100),
    Math.floor((window.screen.height * getRatio()) / 100)
  )
  const w = Math.min(
    Math.floor((window.screen.width * getRatio()) / 100),
    Math.floor((window.screen.height * getRatio()) / 100)
  )

  return {
    ua,
    did: {
      w,
      h
    }
  }
}
