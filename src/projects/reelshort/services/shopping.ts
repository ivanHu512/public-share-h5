import { storeRes } from '@reelshort/pages/storePage/mock'
import signRequest from '@reelshort/utils/signRequest'

/** 获取用户信息 */
export const getUserInfo = (uid: number): Promise<any> =>
  signRequest('/api/webStore/user/getUserInfo', {
    method: 'post',
    data: {
      target_uid: uid
    }
  })

export const getStoreList = (): Promise<any> => {
  return signRequest('/api/webStore/store/getStoreListV2', {
    method: 'post'
  })
}

export const createPreOrder = ({
  gid,
  return_url,
  cancel_url,
  payType
}: any): any =>
  signRequest(`/api/webStore/store/createOrder`, {
    method: 'post',
    data: {
      gid,
      return_url,
      cancel_url,
      payType
    },
    timeout: 7000
  })

export interface IOrderinfo {
  order_id: string
  approve_link: string
  merchant_order_id: string
  original_price?: string
  product_id: string
  gid: number
  price: number
  payType: number
  transaction_id: string
}
/**
 * @description: 订单校验 轮询
 * @param order_id {string} 业务订单id
 * @param merchant_order_id {string} paypal订单id
 * @return {*}
 */
export const checkOrder = (params: IOrderinfo): any =>
  signRequest(`/api/webStore/store/checkOrder`, {
    method: 'post',
    data: {
      ...params,
      merchant_receipt_data: 'h5',
      package_name: 'h5'
    },
    timeout: 7000
  })
