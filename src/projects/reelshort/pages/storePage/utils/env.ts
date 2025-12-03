/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// 设备检测
/* eslint  no-cond-assign:0 radix:0 */
import { getLocationVars } from '@/utils/utils'
const getUA = () => {
  const UA: any = {}
  const ua = navigator.userAgent.toLowerCase()
  let s
  UA.ie = (s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/))
    ? parseInt(s[2])
    : false
  UA.firefox = (s = ua.match(/firefox\/([\d.]+)/)) ? parseInt(s[1]) : false
  UA.chrome = (s = ua.match(/chrome\/([\d.]+)/)) ? parseInt(s[1]) : false
  UA.opera = (s = ua.match(/opera.([\d.]+)/)) ? parseInt(s[1]) : false
  UA.safari = (s = ua.match(/version\/([\d.]+).*safari/))
    ? parseInt(s[1])
    : false
  UA.android = (s = ua.match(/android/)) ? s : false
  UA.iphone = (s = ua.match(/iphone os/)) ? s : false
  UA.ipad = (s = ua.match(/ipad/)) ? s : false
  // ipad中  ios13之后，navigator.userAgent不包含ipad字段
  UA.ipad13 = (s = ua.match(/mac/) && navigator.maxTouchPoints > 1)
    ? { s }
    : false
  UA.ios = UA.ipad || UA.iphone || UA.ipad13
  UA.isWin32 = /win32/i.test(window.navigator.platform)
  UA.isWeixin = (s = ua.match(/MicroMessenger/i)) ? !!s : false // 判断是否是在微信浏览器里面
  UA.isUcweb = (s = ua.match(/ucbrowser/)) ? !!s : false
  UA.isMqq = (s = ua.match(/mqqbrowser/)) ? !!s : false // 是否是手机qq浏览器
  UA.isWeiBo = (s = ua.match(/__weibo__/)) ? !!s : false // 是否微博浏览器
  // console.log(UA);

  UA.isMobile = UA.android || UA.ios
  return UA
}

const UA = getUA()

const isMobile: boolean = UA.isMobile
export { UA, isMobile }

/** 函数节流---若干时间内每隔delay时间段只能触发一次函数 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(fn: Function, delay: number, immediate?: boolean) {
  let timer: NodeJS.Timeout | null

  return function (this: any) {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments

    // 先立即执行再节流
    if (!!immediate && !timer) {
      const isNow = !timer
      isNow && fn.apply(this, args)
      timer = setTimeout(() => {
        timer && clearTimeout(timer)
        timer = null
      }, delay)
    }

    // 直接节流执行
    if (!timer && !immediate) {
      timer = setTimeout(() => {
        // timer&&clearTimeout(timer)
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  }
}

// 这个判断方式有问题，如果在被的APP内也会成立，需要让后端在Ua插入标识
export const isApp = !!window?.webkit || !!window?.Android
