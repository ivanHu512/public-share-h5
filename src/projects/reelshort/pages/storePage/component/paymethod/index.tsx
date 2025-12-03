import React, { useCallback, useEffect, useMemo } from 'react'
import { usePay } from '../../hooks'
import { PayType } from '../../types'
import { getLastSelected } from '../../lib'
import './index.scss'

const TYPE_LOGO: Record<string, string> = {
  [PayType.PayPal]:
    'https://v-mps.crazymaplestudios.com/images/3a19b7b0-9e6a-11ee-aed2-cfe3d80f70eb.png',
  [PayType.Stripe]:
    'https://v-mps.crazymaplestudios.com/images/66abdf40-9fde-11ee-aed2-cfe3d80f70eb.png'
}
export default function PayMethod(): JSX.Element {
  const { payType, setPayType, productsList, langText } = usePay()
  const handleSelect = (type: string) => {
    if (payType === type) return
    setPayType(type)
  }
  useEffect(() => {
    if (productsList.length) {
      const lastSelected = getLastSelected()
      if (lastSelected) {
        setPayType(lastSelected.payType)
      }
    }
  }, [productsList])

  return (
    <div className='pay-method'>
      {!productsList.length ? (
        <h2 className='skeleton skeleton-title'></h2>
      ) : (
        <h2 className='section-title'>{langText.payMethod}</h2>
      )}
      <div className='check-types'>
        {!productsList.length && (
          <>
            <div className='check-types-item skeleton'></div>
            <div className='check-types-item skeleton'></div>
          </>
        )}

        {productsList.length ? (
          <>
            <div
              className={`check-types-item ${
                payType === PayType.PayPal ? 'check-types-item-active' : ''
              }`}
              onClick={() => handleSelect(PayType.PayPal)}
            >
              <img src={TYPE_LOGO[PayType.PayPal]} />
            </div>
            <div
              className={`check-types-item ${
                payType === PayType.Stripe ? 'check-types-item-active' : ''
              }`}
              onClick={() => handleSelect(PayType.Stripe)}
            >
              <img src={TYPE_LOGO[PayType.Stripe]} />
            </div>
          </>
        ) : null}
        {/* {productsList.map((item) => (
          <div
            key={item.pay_platform}
            className={`check-types-item ${
              payType === item.pay_platform ? 'check-types-item-active' : ''
            }`}
            onClick={() => handleSelect(item.pay_platform)}
          >
            {TYPE_LOGO[item.pay_platform] && (
              <div className='check-types-item-icon'>
                <img src={TYPE_LOGO[item.pay_platform]} />
              </div>
            )}
          </div>
        ))} */}
      </div>
    </div>
  )
}
