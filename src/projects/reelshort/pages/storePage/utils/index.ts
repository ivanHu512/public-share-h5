import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'
import { decode } from 'js-base64'
import { decompressSync, strFromU8 } from 'fflate'
import { getEnv } from '@/utils/utils'

export * from './env'

// export * from './type'

export * from './buried-point'

export function formateDate(time: number) {
  const date = new Date(time) // 使用合法的日期字符串或时间戳创建 Date 对象
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`

  return formattedDate
}
export function addLineBreakToFirstWord(inputString: any) {
  // 使用正则表达式来查找第一个单词
  const match = inputString.match(/\S+/)

  if (match) {
    // 找到第一个单词后，在它之后添加换行符
    const firstWord = match[0]
    const stringWithLineBreak = inputString.replace(
      firstWord,
      firstWord + '<br/>'
    )
    return stringWithLineBreak
  } else {
    // 如果字符串中没有单词，则返回原始字符串
    return inputString
  }
}
export function parseQueryString(queryString: string) {
  const params: any = {}
  if (queryString) {
    const keyValues = queryString.slice(1).split('&')
    keyValues.forEach(function (keyValue) {
      const pair = keyValue.split('=')
      const key = decodeURIComponent(pair[0])
      const value = decodeURIComponent(pair[1] || '')
      if (key.length > 0 && params[key] === undefined) {
        params[key] = value
      }
    })
  }
  return params
}

/** 兼容一下以前的链接 */
export function getPageQuery() {
  let search = ''
  if (location.hash) {
    search = location.hash.replace('#/', '')
  } else {
    search = location.search
  }
  return parseQueryString(search)
}
export function formatLang(lang: string): string {
  if (!lang) {
    return ''
  }
  const match = lang.match(/^[a-zA-Z]+/)
  if (match) {
    return match[0]
  }
  return ''
}

export function aesDecrypt(textStr: string): any {
  try {
    const key = CryptoJS.enc.Utf8.parse('56jh5jsk98888888')
    const iv = CryptoJS.enc.Utf8.parse('6a508f8a81314c65')

    const str = decodeURIComponent(textStr)

    const bytes = CryptoJS.AES.decrypt(str, key, {
      mode: CryptoJS.mode.CBC,
      iv
    })
    const resultDecipher = bytes.toString(CryptoJS.enc.Base64)
    const secendDecodedText = decode(resultDecipher)
    const thirdDecodedText = JSON.parse(secendDecodedText)
    return thirdDecodedText
  } catch (error) {
    return null
  }
}
enum Enetwork {
  'no-network' = 0,
  'wifi' = 1,
  'unknown' = 200,
  '2g' = 202,
  '3g' = 203,
  '4g' = 204,
  '5g' = 205
}
// 获取网络类型
export const getNetworkType = () => {
  const nav = window.navigator as any
  const nonetwork =
    nav?.connection?.downlink === 0 && nav?.connection?.rtt === 0
  const networkStr = nonetwork
    ? 'no-network'
    : nav?.connection?.effectiveType || ''
  let networkType
  switch (networkStr) {
    case 'wifi':
      networkType = Enetwork.wifi
      break
    case '4g':
      networkType = Enetwork['4g']
      break
    case '3g':
      networkType = Enetwork['3g']
      break
    case '3gnet':
      networkType = Enetwork['3g']
      break
    case '2g':
      networkType = Enetwork['2g']
      break
    case 'no-network':
      networkType = Enetwork['no-network']
      break
    default:
      networkType = Enetwork.unknown
  }
  return networkType
}
