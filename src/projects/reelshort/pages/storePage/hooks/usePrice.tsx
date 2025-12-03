import { useCallback, useEffect, useState } from 'react'
import request from 'umi-request'
import { ICurrency } from '../types'

export default function usePrice() {
  const [priceRates, setPriceRates] = useState(null)

  useEffect(() => {
    request('https://api.exchangerate-api.com/v4/latest/USD').then((r) => {
      if (r?.rates) {
        setPriceRates(r.rates)
      }
    })
  }, [])

  const getCurrency = useCallback((currencyCode: ICurrency, rates: any) => {
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
  }, [])

  return { priceRates, getCurrency }
}
