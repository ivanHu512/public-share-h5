import { createContext, useContext } from 'react'
import { IUser, IProduct, PayStatus, ICurrency } from '../types'
import { LangText } from '../lib/text'
export interface PayContextProps {
  initData: any
  payType: string
  setPayType: (payType: string) => void
  user: IUser | null
  updateUser: (user: IUser) => void
  selectedProduct: IProduct | null
  setProduct: (product: IProduct | null) => void
  spin: boolean
  setSpin: (loading: boolean) => void
  payStatus: PayStatus
  setPayStatus: (payStatus: PayStatus) => void
  openStripeModal: boolean
  setOpenStripeModal: (openStripeModal: boolean) => void
  productsList: IProduct[]
  currency: ICurrency | null
  langText: LangText
}

export const PayContext = createContext<PayContextProps>({} as any)
export const usePay = () => useContext(PayContext)
