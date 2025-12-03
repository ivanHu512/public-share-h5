import { parseQueryString } from '../utils'
import { IOrderinfo, IProduct } from '../types'
import {
  decryptSign,
  setEncryptedItem,
  aesDescryptResponse
} from '@/projects/reelshort/utils/urils'
interface IToken {
  uuid: number
  session: string
}
import text, { LangText } from './text'

export function getToken(): IToken {
  const { sign, lang, encrypt_type } = parseQueryString(window.location.search)
  let data: any = {}
  const descrypt = encrypt_type ? aesDescryptResponse : decryptSign
  try {
    data = descrypt(sign) || {}
    localStorage.setItem('app_info', JSON.stringify(data))
  } catch (error) {}

  const { uuid, language } = data
  localStorage.setItem('lang', lang || language)

  if (uuid) {
    localStorage.setItem('uid', uuid)
  } else {
    localStorage.removeItem('uid')
  }
  return data || {}
}
// const test = setEncryptedItem({
//   uuid: '9988172268',
//   language: 'th'
// })
// console.log('tttt', test)

/**
 * 保存订单
 * @param orderInfo 订单信息
 * @param isFail 是否是失败订单
 */
export function saveOrderInfo(orderInfo: IOrderinfo, isFail = false): void {
  const uid = localStorage.getItem('uid') || ''
  if (!isFail) {
    localStorage.setItem(`order_${uid}`, JSON.stringify(orderInfo))
  } else {
    // 保存失败订单
    let info = getOrderInfo(isFail)
    if (!info) {
      info = [orderInfo]
    } else {
      info.push(orderInfo)
    }
    localStorage.setItem(`fail_order_${uid}`, JSON.stringify(info))
  }
}

/**
 * 获取订单信息
 * @param isFail
 * @returns
 */
export function getOrderInfo(isFail = false): any {
  let orderInfo: any = null

  const uid = localStorage.getItem('uid') || ''
  const info = localStorage.getItem(`order_${uid}`)
  const fail_orderIno = localStorage.getItem(`fail_order_${uid}`)

  try {
    if (isFail) {
      if (fail_orderIno) {
        orderInfo = JSON.parse(fail_orderIno)
      }
    } else if (info) {
      orderInfo = JSON.parse(info)
    }
  } catch (error) {
    console.error('Error parsing JSON', error)
    return null
  }

  return orderInfo
}

export function getLastSelected(): any {
  let selected = localStorage.getItem('last_selected')
  try {
    if (selected) {
      selected = JSON.parse(selected)
    }
  } catch (error) {
    console.error('Error parsing JSON', error)
    return null
  }
  return selected
}

export function getProductListByKey(key: string, list: any[]) {
  let _list: IProduct[] = []
  for (const item of list) {
    if (item.pay_platform === key) {
      _list = item.list
    }
  }
  return _list
}
export function revemoLastSelected(): void {
  localStorage.removeItem('last_selected')
}

export function removeOrderInfo(revemoFail?: boolean): void {
  const uid = localStorage.getItem('uid') || ''
  if (revemoFail) {
    localStorage.removeItem(`fail_order_${uid}`)
    return
  }
  localStorage.removeItem(`order_${uid}`)
}

export function getPageUrl(): string {
  const { sign } = parseQueryString(window.location.search)
  return `${window.location.origin}${window.location.pathname}?sign=${sign}`
}
// export function resetUrl(): void {
//   window.history.replaceState({}, '', getPageUrl())
// }
export const resetUrl = () => {
  const url = sessionStorage.getItem('originUrl') || false
  if (url) {
    sessionStorage.removeItem('originUrl')
    window.history.replaceState({}, '', url)
  }
}
export const pageUrl = getPageUrl()

export function getI18nPrice(currency: any, price: any): string {
  return `${price}`
}

export const getCurrency = (currencyCode: any, rates: any) => {
  if (currencyCode) {
    const { iso_code } = currencyCode
    if (iso_code === 'USD') {
      return null
    }
    if (rates[iso_code]) {
      return {
        ...currencyCode,
        rate: rates[iso_code]
      }
    }
  }
  return null
}

export function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, timeout)
  })
}

export function lang(): LangText {
  const language = localStorage.getItem('lang') || 'en'
  return text[language] || text['en']
}
