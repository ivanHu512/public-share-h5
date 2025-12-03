import React, { useEffect, useLayoutEffect, useRef, forwardRef } from 'react'
import { getEnv, getPageQuery } from '@/utils/utils'
import SuccessPage from './components/success'
import CancelPage from './components/cancel'

import './App.scss'

/**
 * APP内嵌PayPal支付完成/取消页面
 * @param props
 * @returns
 */
const PayPalPage = (): JSX.Element => {
  const query = getPageQuery() as any
  return (
    <div className='body'>
      {query?.state === '1' ? <SuccessPage /> : <CancelPage />}
    </div>
  )
}
PayPalPage.displayName = 'PayPalPage'
export default PayPalPage
