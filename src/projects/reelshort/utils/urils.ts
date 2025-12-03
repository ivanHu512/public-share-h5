import md5 from 'md5'
import CryptoJS from 'crypto-js'
import { decode } from 'js-base64'
import { decompressSync, strFromU8 } from 'fflate'
import { aesEncrypt } from './aes'
/**
 * 对象转换
 * @param params
 * @returns
 */
export const converUrlParamsObj = (params: any) => {
  const _result = []
  const isFalse = (value: any) => value === undefined || value === null
  for (const key in params) {
    const value = params[key]
    if (value?.constructor === Array) {
      value.forEach((_value: any) => {
        _result.push(key + '=' + _value)
      })
    } else {
      !isFalse(value) && _result.push(key + '=' + value)
    }
  }
  return _result.join('&')
}

/**
 * 地址栏参数解析
 * @returns
 */

export const getSearchData = (search: string): any => {
  if (!search) return {}
  const obj: any = {}
  // try catch主要防止地址栏没参数导致出错
  try {
    const searchArr = search.split('?')[1].split('&')
    searchArr.forEach((item) => {
      const arr = item.split('=')
      obj[arr[0]] = arr[1]
    })
  } catch (error) {
    return {}
  }
  return obj
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

// 将base64转换为文件
function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',')
  // @ts-ignore
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

/** 处理登录时MD5加密参数 */
interface IMd5 {
  clientToken: string
  time: number
}
/** 获取md5加密后的sign，加密规则看kissshoudow的内嵌H5登录文档 */
export function handleH5LoadingMD5(props: IMd5) {
  const { clientToken = '', time = 0 } = props
  const sign = md5(
    md5(`${clientToken}${clientToken.split('').reverse().join('')}${time}`)
      .split('')
      .reverse()
      .join('')
  )

  return sign
}
// 获取组装后的token
export const getToken = () =>
  localStorage.getItem('token')?.indexOf('Bearer') === -1
    ? `Bearer ${localStorage.getItem('token')}`
    : localStorage.getItem('token')

/** 获取用户id */
export const getUid = () => localStorage.getItem('uid')

/** 复制 */
export const copy = (text: string) => {
  // 复制text传入的文本内容到剪切板中
  const oInput = document.createElement('input')
  oInput.value = text
  // ios 点击复制时，键盘拉起闪烁，复制失败--解决
  oInput.setAttribute('readonly', 'readonly')
  oInput.setSelectionRange(0, oInput.value.length)

  document.body.appendChild(oInput)
  oInput.select() // 选择对象

  const range = document.createRange()
  // 选中需要复制的节点
  range.selectNode(oInput)
  // 执行选中元素
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  !!window?.getSelection && window.getSelection()?.addRange(range)
  oInput.select()
  oInput.setSelectionRange(0, oInput.value.length) // 适配高版本ios

  document.execCommand('Copy') // 执行浏览器复制命令
  // 移除选中的元素
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  !!window?.getSelection && window.getSelection()?.removeAllRanges()

  oInput.className = 'oInput'
  oInput.style.display = 'none'
  console.log('success', text)

  document.body.removeChild(oInput)
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

const SHA256Key = 'zj8N6zKEdrK8d1MxwHSvExdgQ868q1yT'
const REAPublicKey =
  '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6D4CRIl6AWxOS4Pq2l7nRCNw0nCIo9l4UdbbV5h5CkL57dVjT0sDSt3DpuqUyFZnsLiQ8apy2JmmFSFISpwXW4AReBgehiLP+rivkp2DqJDE/DQTagEerlhSUZm7wgzwXBVR0U9caT7EeFso0/Laz9/gVL1ufRh++HM7Zwe2UZwIDAQAB-----END PUBLIC KEY-----'
/**
 * @description: 生成数据签名 SHA256
 * @步骤:
 *      1. 去除值为空串的参数
 *      2. 将参数们已首字母顺序排序
 *      3. 拼接成param1=a&param2=b
 *      4. hash_hmac('hash256')加密并传为小写字符串
 *      5. REA再加密一层
 * @param {params}
 * @return {sign}
 */
export const createSign = (
  params: { [key: string]: any; did: string },
  baseKey: string = SHA256Key
): string | false => {
  const paramsArr = [
    ...Object.keys(params)
      .map((k) => {
        const value =
          typeof params[k] === 'object' ? JSON.stringify(params[k]) : params[k]
        return {
          key: k,
          value
        }
      })
      .filter(({ key, value }) => {
        return !(
          value === '' ||
          value === null ||
          value === undefined ||
          value === 'null'
        )
      })
    // {
    //   key: 'timestamp',
    //   value: dayjs().unix(),
    // },
  ].sort((a, b) => {
    // return (`${a.key}`).localeCompare(`${b.key}`)
    // return `${a.key}`.charCodeAt() - `${}`
    const x1 = a.key.toUpperCase()
    const x2 = b.key.toUpperCase()
    if (x1 < x2) {
      return -1
    }
    if (x1 > x2) {
      return 1
    }
    return 0
  })
  // console.log(
  //   '🚀 ~ file: utils.ts ~ line 42 ~ paramsArr.forEach ~ paramsArr',
  //   paramsArr,
  // );

  const paramsString = paramsArr
    .map(({ key, value }) => `${key}=${value}`)
    .join('&')

  const encryptedString = CryptoJS.HmacSHA256(paramsString, baseKey).toString()

  return encryptedString
}

export const getRandomStr = (number: number): string => {
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
/** 判断是否是JSON对象字符串 */
export const isJSON = (str: string) => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      // console.log('error：'+str+'!!!'+e);
      return false
    }
  } else {
    throw new Error('str is not a string')
  }

  // console.log('It is not a string!')
}

/** 直接返回解密后的response */
export function aesDescryptResponse(textStr = '') {
  if (
    !textStr ||
    textStr.indexOf('Error') > -1 ||
    typeof textStr !== 'string'
  ) {
    return {}
  }
  const key = CryptoJS.enc.Utf8.parse('VvRSNGFynLBW7aCP')
  const iv = CryptoJS.enc.Utf8.parse('gLn8sxqpzyNjehDP')
  const bytes = CryptoJS.AES.decrypt(textStr, key, {
    mode: CryptoJS.mode.CBC,
    iv
  })
  const resultDecipher = bytes.toString(CryptoJS.enc.Base64)
  const secendDecodedText = decode(resultDecipher)
  const thirdDecodedText = atob(secendDecodedText)
  const willDecompressString = thirdDecodedText
  const charData = willDecompressString.split('').map(function (x) {
    return x.charCodeAt(0)
  })
  const binData = new Uint8Array(charData)
  const decompressed = decompressSync(binData)
  const origText = strFromU8(decompressed)
  return JSON.parse(origText)
}
const secretKey = 'reelshort-web-password'

// 存储方法
export const setEncryptedItem = (value: any) => {
  const _value = typeof value === 'object' ? JSON.stringify(value) : value
  try {
    // 使用 AES 加密数据
    const encryptedValue = CryptoJS.AES.encrypt(_value, secretKey).toString()
    return encryptedValue
  } catch (error) {
    console.error('Error setting encrypted item:', error)
    return false
  }
}

// 获取方法
export const decryptSign = (value: string): any => {
  try {
    // 从 localStorage 中获取加密的数据
    const encryptedValue = value
    if (encryptedValue) {
      // 使用 AES 解密数据
      const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey)
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8)
      return JSON.parse(decryptedValue)
    }
    return null
  } catch (error) {
    console.error('Error getting decrypted item:', error)
    return null
  }
}

// 获取屏幕缩放比例
export function getRatio() {
  let ratio = 0
  const screen = window.screen
  const ua = navigator.userAgent.toLowerCase()

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (ua.indexOf('msie') !== -1) {
    // @ts-ignore
    if (screen?.deviceXDPI && screen?.logicalXDPI) {
      // @ts-ignore
      ratio = screen?.deviceXDPI / screen?.logicalXDPI
    }
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    ratio = window.outerWidth / window.innerWidth
  }

  if (ratio) {
    ratio = Math.round(ratio * 100)
  }
  return ratio
}

/**
 * 获取当前时间区间和域名
 */
export const getTimeZoneAndDomain = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const ct = aesEncrypt(timeZone)
  return {
    ct,
    domain: window.location.hostname
  }
}

export function safeDecodeURIComponent(str: string): string {
  let result = str
  let decoded = ''

  try {
    while (true) {
      decoded = decodeURIComponent(result)
      // 如果解码结果和原来一样，就说明不需要再解码了
      if (decoded === result) break
      result = decoded
    }
  } catch (e) {
    // 一旦遇到 URIError，就说明已经解到头了
  }

  return result
}
