/*
 * @Author: Zegel
 * @Date: 2020-12-25 10:47:17
 * @LastEditTime: 2024-11-22 11:15:41
 * @LastEditors: shaojia
 * @Description: utils
 * @FilePath: /H5/src/utils/utils.ts
 */
import { parse } from 'querystring'
// import pathRegexp from 'path-to-regexp'

/* eslint no-useless-escape:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
export const isUrl = (path: string) => reg.test(path)

type env = 'dev' | 'test' | 'prod' | 'gray'
interface IProcessEnv extends NodeJS.ProcessEnv {
  REACT_APP_ENV: env
}

// 是否在开发环境
export const isDevelopment: boolean = process.env.NODE_ENV === 'development'
// REACT_APP_ENV 获取 主要用于区分接口
export const getEnv = (): env => {
  const { REACT_APP_ENV }: { NODE_ENV: any; REACT_APP_ENV: env } =
    process.env as IProcessEnv

  // prod test dev
  return REACT_APP_ENV || 'dev'
}

export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const getPageLang = () => parse(window.location.href.split('lang=')[1])

export const getLocationVars = () => {
  // 获取location.search内容
  const locationVars: any = {}

  if (window.location.search.length > 1) {
    for (
      let aItKey,
        nKeyId = 0,
        aCouples = window.location.search.substr(1).split('&');
      nKeyId < aCouples.length;
      nKeyId++
    ) {
      aItKey = aCouples[nKeyId].split('=')
      locationVars[decodeURIComponent(aItKey[0])] =
        aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : ''
    }
  }
  return locationVars
}
/* eslint guard-for-in: 0 */

export const converUrlParamsObj = (params: any) => {
  const _result = []
  for (const key in params) {
    const value = params[key]
    if (value?.constructor === Array) {
      value.forEach((_value: any) => {
        _result.push(key + '=' + _value)
      })
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.join('&')
}

// 设备检测
/* eslint  no-cond-assign:0 radix:0 */
export const getUA = () => {
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
  UA.ios = UA.ipad || UA.iphone
  UA.mac = /mac/i.test(ua)
  UA.appleWatch = /applewatch/i.test(ua)
  UA.isWin32 = /win32/i.test(window.navigator.platform)
  UA.isWeixin = (s = ua.match(/MicroMessenger/i)) ? !!s : false // 判断是否是在微信浏览器里面
  UA.isUcweb = (s = ua.match(/ucbrowser/)) ? !!s : false
  UA.isMqq = (s = ua.match(/mqqbrowser/)) ? !!s : false // 是否是手机qq浏览器
  UA.isWeiBo = (s = ua.match(/__weibo__/)) ? !!s : false // 是否微博浏览器
  // console.log(UA);
  return UA
}

export const getRandomStr = (number: number) => {
  const x = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
  let str = ''
  for (let i = 0; i < number; i++) {
    // 重点  这里利用了Math.random()函数生成的随机数大于0 小于1 我们可以
    // 用它的随机数来乘以字符串的长度,得到的也是一个随机值，再通过parseInt()
    // 函数取整，这样就可以实现字符串的随机取值了
    str += x[Math.floor(Math.random() * x.length)]
  }
  return str
}

/** 获取指定cookie值 */
export const getCookie = (name: string, cookieStr?: string): any => {
  let value = ''
  const strcookie = cookieStr || document.cookie
  const arrcookie = strcookie.split('; ')
  arrcookie.forEach((item) => {
    const arr = item.split('=')
    if (arr[0] === name) {
      value = arr[1]
      return arr[1]
    }
  })
  return value || ''
}

export const setUrlParams = (params: any) => {
  const urlParams = new URLSearchParams(window.location.search)
  Object.keys(params).forEach((key) => {
    urlParams.set(key, params[key])
  })
  // return url address
  return `${location.origin}${location.pathname}?${urlParams.toString()}`
}
