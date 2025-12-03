import React, { useCallback, useEffect } from 'react'
import { usePay } from '../../hooks'
import { payReport } from '../../utils/reportInfo'
import usePayment from '../../hooks/usePayment'

import { getLastSelected, revemoLastSelected } from '../../lib'
import ProductItem from './item'

import './index.scss'
import { PayType } from '../../types'

const Products: React.FC = () => {
  const {
    selectedProduct,
    setProduct,
    payType,
    productsList,
    currency,
    langText,
    user
  } = usePay()
  const { toPay } = usePayment()
  useEffect(() => {
    if (!productsList.length) return
    const lastSelected = getLastSelected()
    if (lastSelected) {
      setProduct(lastSelected.selectedProduct)
      revemoLastSelected()
    } else {
      setProduct(productsList[0])
    }
  }, [productsList, setProduct])

  const handlerClickProduct = useCallback(
    (item) => {
      if (!payType) return
      setProduct(item)
      toPay(item)
      payReport('product_click', {
        ...item,
        payType: payType === PayType.PayPal ? 1002 : 1003,
        sid: user?.sid || 0
      })
    },
    [payType]
  )
  return (
    <section className='section-product'>
      {!productsList.length ? (
        <h2 className='skeleton skeleton-title'></h2>
      ) : (
        <>
          <h2 className='products-tit'>{langText.topUp}</h2>
          {/* <div className='sub-tit'>Get more Bonus compare to the APP</div> */}
        </>
      )}

      <div className='products'>
        {!productsList.length && (
          <>
            <div className='skeleton ske-item'></div>
            <div className='skeleton ske-item'></div>
            <div className='skeleton ske-item'></div>
            <div className='skeleton ske-item'></div>
            <div className='skeleton ske-item'></div>
            <div className='skeleton ske-item'></div>
          </>
        )}
        {productsList.map((item, index: number) => {
          return (
            <ProductItem
              key={index}
              currency={currency}
              data={item}
              isSelected={selectedProduct?.gid === item.gid}
              onClick={() => {
                handlerClickProduct(item)
              }}
            />
          )
        })}
      </div>
    </section>
  )
}
export default Products
