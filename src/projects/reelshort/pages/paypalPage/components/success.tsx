import React, { useEffect, useLayoutEffect, useRef, forwardRef } from 'react'

import { getEnv, getPageQuery } from '@/utils/utils'
import { Button } from 'antd-mobile'
import './styles.scss'
import webview from '@/utils/web-view'
import icon_award from '../assets/icon_award.png'
/**
 * 支付完成
 * @param props
 * @returns
 */
const SuccessPage = (): JSX.Element => {
  useEffect(() => {
    webview.exec('paypalSuccess')
  }, [])

  /** 返回事件 */
  const returnHandle = () => {
    webview.exec('backToApp')
  }

  return (
    <div className='success_body'>
      <div>
        <div className='icon'>
          <img src={icon_award} alt='icon_award' />
        </div>
        <div className='title'>Payment Completed</div>
        <p>Please confirm your Coin balance.</p>
        <div className='return_btn' onClick={returnHandle}>
          Return
        </div>
      </div>
    </div>
  )
}
SuccessPage.displayName = 'SuccessPage'
export default SuccessPage
