import { reportSDK } from '@/projects/reelshort/utils/reportInfo'
import { getLocationVars } from '@/utils/utils'

// 登陆绑定类型
export const LoginBindType = ['vistor', 'apple', 'fb', 'gp']

/** 曝光方法 */
const expoed: any = {}
export const expoReort = (
  id: string,
  param: any,
  event_name?: string
): void => {
  if (expoed[id]) {
    return
  }
  expoed[id] = true

  const { entry_type } = getLocationVars()
  const app_info = JSON.parse(localStorage.getItem('app_info') || '{}')
  const {
    did = '',
    devicePlatform = '',
    version = 'v1.0.0',
    channel = 'WEB41001',
    language = 'en'
  } = app_info
  reportSDK.setPublicParams({
    VERSION: version,
    CHANNEL_ID: channel,
    LANGUAGE: language,
    OS_VERSION: decodeURIComponent(devicePlatform),
    DEVICE_ID: did
  })
  reportSDK.clickReport({
    eventName: event_name ? event_name : 'h5_store_page',
    properties: {
      _url: location.href,
      lang: localStorage.getItem('lang') || 'en',
      entry_type,
      _scene_name: 'main_scene',
      _page_name: 'h5_store_page',
      ...param
    }
  })
}

/** 支付上报埋点 */
export const payReport = (
  event_name: string,
  orderInfo: any,
  other = {},
  cache = false
) => {
  const config = {
    event_name: 'm_pay_event',
    sub_event_name: event_name,
    properties: {
      _scene_name: 'main_scene',
      _page_name: 'h5_store_page',
      _order_src: 'h5_store',
      _order_currency_type: 'USD',
      _story_id: orderInfo._story_id || '', // 快捷支付上报
      _chap_id: orderInfo._chap_id || '', // 快捷支付上报
      _chap_order_id: orderInfo._chap_order_id || 0, // 快捷支付上报
      t_book_id: orderInfo.t_book_id || '', // 快捷支付上报
      _app_orderid: orderInfo?.order_id || '',
      _channel_orderid: orderInfo?.merchant_order_id || '',
      _app_sku: orderInfo?.gid || '',
      _channel_sku: orderInfo?.product_id || '',
      _order_amount: orderInfo?.price * 100 || 0,
      pay_channel: orderInfo?.payType,
      _app_account_bindtype: LoginBindType[orderInfo?.sid || 0],
      ...other
    }
  }
  const app_info = JSON.parse(localStorage.getItem('app_info') || '{}')
  const {
    did = '',
    devicePlatform = '',
    version = 'v1.0.0',
    channel = 'WEB41001',
    language = 'en'
  } = app_info
  reportSDK.setPublicParams({
    VERSION: version,
    CHANNEL_ID: channel,
    LANGUAGE: language,
    OS_VERSION: decodeURIComponent(devicePlatform),
    DEVICE_ID: did
  })
  reportSDK.eventReport(config)
}
