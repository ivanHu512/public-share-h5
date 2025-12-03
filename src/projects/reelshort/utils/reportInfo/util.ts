/*
 * @Author: cyx
 * @Date: 2021-04-10 10:09:47
 * @LastEditors: cyx
 * @LastEditTime: 2021-04-13 18:42:32
 * @Description: file content
 */

// 检测浏览器名称
export const getBrowser = () => {
  try {
    const UserAgent = navigator.userAgent.toLowerCase()
    const browserInfo: { type: string; versions: string } = {
      type: '',
      versions: '0'
    }
    const browserArray: any = {
      IE: (window as any)?.ActiveXObject || 'ActiveXObject' in window, // IE
      Chrome:
        UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
      Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
      Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
      Safari:
        UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') === -1 // safari浏览器
    }
    // console.log(browserArray)
    for (const i in browserArray) {
      if (browserArray[i]) {
        let versions = ''
        if (i === 'IE') {
          versions = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)![2]
        } else if (i === 'Chrome') {
          versions = UserAgent.match(/chrome\/([\d.]+)/)![1]
        } else if (i === 'Firefox') {
          versions = UserAgent.match(/firefox\/([\d.]+)/)![1]
        } else if (i === 'Opera') {
          versions = UserAgent.match(/opera\/([\d.]+)/)![1]
        } else if (i === 'Safari') {
          versions = UserAgent.match(/version\/([\d.]+)/)![1]
        } else if (i === 'Edge') {
          versions = UserAgent.match(/edge\/([\d.]+)/)![1]
        }
        browserInfo.type = i
        browserInfo.versions = versions
      }
    }
    return browserInfo
  } catch (error) {}
}
// 获取操作系统
export const getOperationSys = () => {
  let OS = ''
  const OSArray: any = {}
  const UserAgent = navigator.userAgent.toLowerCase()
  OSArray.Windows =
    navigator.platform === 'Win32' || navigator.platform === 'Windows'
  OSArray.Mac =
    navigator.platform === 'Mac68K' ||
    navigator.platform === 'MacPPC' ||
    navigator.platform === 'Macintosh' ||
    navigator.platform === 'MacIntel'
  OSArray.IOS =
    UserAgent.indexOf('iphone') > -1 ||
    UserAgent.indexOf('ipod') > -1 ||
    UserAgent.indexOf('ipad') > -1
  OSArray.Android = UserAgent.indexOf('android') > -1
  for (const i in OSArray) {
    if (OSArray[i]) {
      OS = i
    }
  }
  return OS
}

// 获取平台id
export const getPlatform = () => {
  const OS = getOperationSys()
  let platform = ''
  // Android=1  IOS=2  WINDOWS/MAC=3
  switch (OS) {
    case 'Windows':
      platform = 'windows'
      break
    case 'Mac':
      platform = 'mac os'
      break
    case 'Android':
      platform = 'android'
      break
    case 'IOS':
      platform = 'ios'
      break
  }
  return platform
}

/** 获取设备类型 */
export const getDeviceCategory = () => {
  const ua = navigator.userAgent
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  const isChrome = /(?:Chrome|CriOS)/.test(ua)
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/(?:Mobile)/.test(ua)) ||
    (isFireFox && /(?:Tablet)/.test(ua)) ||
    (ua.match(/mac/) && navigator.maxTouchPoints > 1)
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet
  const isMac =
    navigator.platform === 'Mac68K' ||
    navigator.platform === 'MacPPC' ||
    navigator.platform === 'Macintosh' ||
    navigator.platform === 'MacIntel'
  const isPc = !isPhone && !isAndroid && !isSymbian && !isMac

  if (isAndroid || isPhone) {
    return 'phone'
  } else if (isTablet) {
    return 'tablet'
  } else if (isPc) {
    return 'pc'
  } else if (isMac) {
    return 'mac'
  }
}
