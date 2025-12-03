import React, { useMemo } from 'react'
import { usePay } from '../../hooks'
import { getI18nPrice } from '../../lib'

import usePayment from '../../hooks/usePayment'
import './index.scss'

const Pay: React.FC = () => {
  const { selectedProduct: product, currency } = usePay()
  const { toPay } = usePayment()

  const i18nPrice = useMemo(() => {
    return getI18nPrice(currency, product?.price)
  }, [currency, product])

  if (!product) return null
  return (
    <div className='pay-footer'>
      <div className='pay-total-info'>
        {product?.bonus ? (
          <>
            Get <span>{product?.coins + product.bonus}</span> Total ={' '}
            {product?.coins} Coins + {product.bonus} Bonus
          </>
        ) : (
          <>
            Get <span>{product?.coins}</span> Coins
          </>
        )}
      </div>
      <div
        className='pay-button'
        onClick={() => {
          toPay(product)
        }}
      >
        Pay now for {i18nPrice}
      </div>
    </div>
  )
}
export default Pay
