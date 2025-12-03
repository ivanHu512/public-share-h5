import React, { useEffect, useLayoutEffect, useRef, forwardRef } from 'react'
import './styles.scss'
import webview from '@/utils/web-view'
import icon_award from '../assets/error.png'
/**
 * 支付取消
 * @param props
 * @returns
 */
const CancelPage = (): JSX.Element => {
  useEffect(() => {
    webview.exec('getUserInfo', {
      callback: (res) => {
        localStorage.setItem('uid', JSON.stringify(res.uid))
        localStorage.setItem('devModel', res.devModel)
      }
    })
  }, [])

  /** 返回事件 */
  const returnHandle = () => {
    webview.exec('backToApp')
  }

  return (
    <div className='cancel_body'>
      <div>
        <div className='icon'>
          <img src={icon_award} alt='icon_award' />
        </div>
        <div className='title'>Purchase Failed</div>
        <p>
          An error occurred during the purchasing process. If you haven&apos;t
          received your Coins, please tap Feedback to contact us.
        </p>
        <div
          className='return_btn feedback_btn'
          onClick={() => {
            try {
              webview.exec('goToFeedback', {
                parameter: [['from', 'paypal']]
              })
            } catch (error) {}
          }}
        >
          Feedback
        </div>
        <div className='return_btn' onClick={returnHandle}>
          Return
        </div>
      </div>
    </div>
  )
}
CancelPage.displayName = 'CancelPage'
export default CancelPage
