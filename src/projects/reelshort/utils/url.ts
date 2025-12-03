import {
  getEnv,
  getUA,
  converUrlParamsObj,
  isDevelopment,
  getLocationVars
} from '@/utils/utils'
import {
  ISharePageURLQueryParams,
  IBookSharePageURLQueryParams
} from '@reelshort/typings/interfaces/bookShare'

// 接口域名---todo 还没有配置reelshort的接口域名相关
const apiUrlList = {
  dev: '',
  test: '',
  prod: '',
  gray: ''
}

export const apiUrl: string = apiUrlList[isDevelopment ? 'dev' : getEnv()]

/** 商店链接 */
export const downLoadUrlDic = {
  googlePlay:
    'https://play.google.com/store/apps/details?id=com.newleaf.app.android.victor',
  appStore: 'https://apps.apple.com/us/app/reelshort/id1636235979'
}
// 'https://apps.apple.com/app/radish-fiction/id1076491465?ls=1'

const isIOS = getUA().ios || getUA().mac || getUA().appleWatch

/** 返回对应设备的下载链接 */
export const downLoadUrl = isIOS
  ? downLoadUrlDic.appStore
  : downLoadUrlDic.googlePlay

/** deeplink参数 */
interface IDeeplinkParams {
  // 1=市场投放 2=社媒分享链接(早期w2a落地页) 3=Reelshort web 4=Reelshort w2a落地页 5=2023万圣节活动页
  fromType: number
  /** 作品id */
  parm1: string
  /** 章节id */
  chapterId: string
  /** 落地页 1001-落地播放页  1000-大厅 */
  type: 1001 | 1000
  /** 内容类型 1-常规剧 2-互动剧 */
  book_type?: 1 | 2
}
/**
 * v项目deeplink生成函数
 * @param fromType deeplink来源 (1：市场投放 2：分享)
 * @param parm1 作品id
 * @param chapterId 章节id
 * @param type  落地页 1001-落地播放页
 *
 * @returns
 */
export const createVDeeplink = (params: IDeeplinkParams): string => {
  // 案例链接
  // https://realshortapp.onelink.me/Zof7?af_xp=custom&pid=test&c=CMS_APP_EXCHANGE_REELSHORT&deep_link_value=cmsvictor://?type=1001&parm1=60f5788188b0907fee389859&contentType=1&chapterId=5&af_dp=cmsvictor://

  const deep_link_value = encodeURIComponent(
    `cmsvictor://?${converUrlParamsObj(params)}`
  )
  const link = `https://realshortapp.onelink.me/Zof7?af_xp=custom&pid=test&c=CMS_APP_EXCHANGE_REELSHORT&deep_link_value=${deep_link_value}&af_dp=${encodeURIComponent(
    'cmsvictor://'
  )}`

  return link
}

/** 判断是否FB内置浏览器 */
export const isFBWeb = (): boolean => {
  const uAgent = navigator.userAgent
  return (
    uAgent.indexOf('FB_I') > -1 ||
    uAgent.indexOf('FBAV') > -1 ||
    uAgent.indexOf('FBAN') > -1 ||
    uAgent.indexOf('FBIOS') > -1
  )
}

/** 判断是 chrome os系统 */
export function isChromeOS(): boolean {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('cros')
}

/** 判断是否snapchat内置浏览器 */
export const isSnapchatWeb = (): boolean => {
  const uAgent = navigator.userAgent
  return /Snapchat/.test(uAgent)
}

/**
 * 判断是否twitter内置浏览器
 *   1. ua判断
 *   2. referrer判断
 * */
export const isTwittertWeb = (): boolean => {
  const userAgent = navigator.userAgent
  const uaVerification =
    userAgent.includes('Twitter') ||
    userAgent.includes('Twitter for iPhone') ||
    userAgent.includes('TwitterAndroid')

  const referrer = document?.referrer
  const referrerVerification = referrer.includes('twitter')
  return uaVerification || referrerVerification
}

/**
 * @name 生成web to app链接
 * @param offAfDp 是否关闭af_dp参数
 * @param urlQueryParams 书籍id&章节id
 * @param af_ios_url 自定义ios商店链接
 */
export const generateW2AOneLink = ({
  offAfDp,
  urlQueryParams,
  mediaType
}: {
  /** 是否关闭af_dp参数 */
  offAfDp?: boolean
  urlQueryParams: {
    bookId: string
    chapterId: string
    book_type: number
    ad_type: string
    pushType: number
  }
  mediaType: 'fb' | 'tt' | 'sc' | 'tw' | 'pin'
}): string => {
  const { book_type = 1, ad_type = '', pushType = 2 } = urlQueryParams
  const { af_ios_url = '' } = getLocationVars()
  // 实例链接 ： 'https://realshortapp.onelink.me/Zof7?af_xp=custom&pid=fb-w2a-h5&c=RS-W2A-H5&deep_link_value=cmsvictor://?type=1001&parm1=60f5788188b0907fee389859&contentType=1&chapterId=5&af_dp=cmsvictor://'
  let link = ''
  const isFb = isFBWeb()

  const value = converUrlParamsObj({
    fromType: 4,
    type: pushType === 2 ? 1001 : 1000,
    parm1: urlQueryParams.bookId,
    book_type,
    chapterId: urlQueryParams.chapterId,
    ad_type
  })

  const dl = `&af_dp=${encodeURIComponent(`cmsvictor://?${value}`)}`
  const onelink = `https://realshortapp.onelink.me/Zof7?af_xp=custom&pid=fb-w2a-h5&c=RS-W2A-H5&deep_link_value=${encodeURIComponent(
    `cmsvictor://?${value}`
  )}${af_ios_url ? `&af_ios_url=${af_ios_url}` : ''}`

  if (isChromeOS()) {
    link = downLoadUrlDic.googlePlay
  } else if (isFb) {
    if (isIOS) {
      if (offAfDp) {
        link = onelink
      } else {
        link = onelink + dl
      }
    } else {
      // 安卓直接返回商店链接
      link = `https://play.app.goo.gl/?link=${downLoadUrlDic.googlePlay}`
    }
  } else if (isSnapchatWeb() && !isIOS) {
    // 安卓直接返回商店链接
    link = `https://play.app.goo.gl/?link=${downLoadUrlDic.googlePlay}`
  } else {
    link = onelink + dl
  }
  console.log(
    '%c [ link ]-110',
    'font-size:13px; background:pink; color:#bf2c9f;',
    link
  )
  return link
}
