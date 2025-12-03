import request from '@reelshort/utils/request'
import { IOrderinfo } from '../types'
import { createOrderStripe } from '../mock'
export const createPreOrder = ({
  gid,
  jump_url,
  cancel_url,
  payType
}: {
  gid: number
  jump_url: string
  cancel_url: string
  payType?: number
}): any =>
  new Promise((resolve) => {
    resolve(createOrderStripe)
  })
// request(`/api/createOrder`, {
//   method: 'post',
//   data: {
//     gid,
//     jump_url,
//     cancel_url,
//     payType
//   },
//   timeout: 7000
// })

/**
 * @description: 订单校验 轮询
 * @param order_id {string} 业务订单id
 * @param merchant_order_id {string} paypal订单id
 * @return {*}
 */
export const checkOrder = (params: IOrderinfo): any =>
  request(`/api/checkOrder`, {
    method: 'post',
    data: {
      ...params,
      merchant_receipt_data: 'h5',
      package_name: 'h5'
    },
    timeout: 7000
  })
