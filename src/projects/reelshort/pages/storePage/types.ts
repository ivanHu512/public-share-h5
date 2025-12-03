export interface IUser {
  id: string
  coins: number
  pic: string
  bonus: number
  uname: string
  uid: string
  sid: number
}

export interface ICurrency {
  iso_code: string
  position: number
  symbol: string
  rate: number
}

export interface IProduct {
  gid: number
  coins: number
  bonus?: number
  rate_tag?: number
  price: number
  corner_pic?: string
  pic: string
  original_price?: string
  product_id: string
}
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
  sid: number
  coins?: number
  bonus?: number
}
export interface IProductList {
  pay_platform: PayType
  list: IProduct[]
}

export enum PayType {
  GooglePay = 'GooglePay',
  AppStore = 'AppStore',
  PayPal = 'PayPal',
  Stripe = 'Stripe'
}

export enum OrderPayType {
  PayPal = 1,
  Stripe = 2
}

export enum PayStatus {
  UNPAY = 0,
  SUCCESS = 1,
  FAIL = 2,
  CANCEL = 4,
  RECHECK_SUCEESS = 5,
  RECHECK_FAIL = 6
}

export interface IOrderInfoMap {
  [key: string]: IOrderinfo
}

// 定义一个对象类型， key是payType的值，value 是IProduct
export type ProductsMap = {
  [key in PayType]: IProduct
}
