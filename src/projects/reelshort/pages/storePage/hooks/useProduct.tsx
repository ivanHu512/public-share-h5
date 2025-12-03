import { getStoreList } from '@reelshort/services/shopping'
import { useRequest } from 'ahooks'

import { ICurrency, IProduct, PayType } from '../types'
import { expoReort } from '../utils/reportInfo'

import { useEffect, useState } from 'react'

export default function useProducts() {
  const [payType, setPayType] = useState<string>(PayType.PayPal)
  // const { priceRates, getCurrency } = usePrice()
  const [productsList, setProductsList] = useState<IProduct[] | []>([])
  const [currency, setCurrency] = useState<ICurrency | null>(null)
  const [listError, setListError] = useState(false)

  const { data } = useRequest(getStoreList, {
    onSuccess: (res) => {
      console.log('initData', res)
      if (res.code === 0) {
        if (res.data.fast_list) {
          setProductsList(res.data.fast_list)
        }
      } else {
        setListError(true)
        // 获取商品列表错误上报
        // errorGet({
        //   parm1: 1001,
        //   parm2: res.code,
        //   parm5: '/api/getStoreListV2',
        //   parm8: res?.msg
        // })
      }
    },
    onError: () => {
      setListError(true)
    }
  })

  // useEffect(() => {
  //   if (data && data.code === 0 && priceRates) {
  //     const _currency = getCurrency(data.data.currency_code, priceRates)
  //     if (_currency) {
  //       setCurrency(_currency)
  //     }
  //   }
  // }, [data, priceRates])

  return {
    setPayType,
    payType,
    productsList,
    data,
    currency,
    listError
  }
}
