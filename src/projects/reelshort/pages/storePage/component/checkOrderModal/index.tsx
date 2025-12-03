import React, { useEffect, useState } from 'react'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { getFeedbackUrl } from '../../utils/feedback'
import { getOrderInfo, removeOrderInfo, resetUrl } from '../../lib'
import { parseQueryString } from '../../utils'
import { usePay } from '../../hooks'
import usePayment from '../../hooks/usePayment'
import { PayStatus } from '../../types'
import { reportSDK } from '@/projects/reelshort/utils/reportInfo'
import { payReport } from '../../utils/reportInfo'

const { order_flag, pay_cancel, payment_intent } = parseQueryString(
  window.location.search
)


const orderInfo = getOrderInfo()
export default function CheckOrderModal() {
  const app_info = JSON.parse(localStorage.getItem('app_info') || '{}')
  const {
    did = '',
    devicePlatform = '',
    version = 'v1.0.0',
    channel = 'WEB41001',
    language = 'en'
  } = app_info
  reportSDK.setPublicParams({
    VERSION: version,
    CHANNEL_ID: channel,
    LANGUAGE: language,
    OS_VERSION: decodeURIComponent(devicePlatform),
    DEVICE_ID: did
  })
  const { setSpin, payStatus, setPayStatus, langText, user } = usePay()
  const { pollingCheckOrder } = usePayment()
  useEffect(() => {
    // setPayStatus(PayStatus.SUCCESS)
    if (user) {
      console.log('user=====', user)
      if (pay_cancel) {
        // paypal会有这个状态
        if (orderInfo) {
          payReport('pay_cancel', orderInfo)
        }
        resetUrl()
      }
      if (order_flag || payment_intent) {
        console.log({ payment_intent })
        resetUrl()
        if (!orderInfo) return
        if (orderInfo?.payType !== 1002) {
          payReport('pay_start', orderInfo)
        }
        payReport('pay_end', orderInfo)
        setSpin(true)
        pollingCheckOrder(orderInfo)
      }
    }
  }, [user?.uid])

  useEffect(() => {
    if (payStatus === PayStatus.FAIL || payStatus === PayStatus.SUCCESS) {
      reportSDK.clickReport({
        eventName: 'h5_store_popup',
        properties: {
          _action: 'show',
          _url: location.href,
          _page_name: 'h5_store_page',
          popup_type:
            payStatus === PayStatus.FAIL
              ? 'purchase_failed_popup'
              : 'purchase_successful_popup'
        }
      })
    }
  }, [payStatus])

  const handlerClose = () => {
    removeOrderInfo()
    if (payStatus === PayStatus.FAIL) {
      reportSDK.clickReport({
        eventName: 'h5_store_popup',
        properties: {
          _action: 'close',
          _url: location.href,
          _page_name: 'h5_store_page',
          popup_type:
            payStatus === PayStatus.FAIL
              ? 'purchase_failed_popup'
              : 'purchase_successful_popup'
        }
      })
    }
    setPayStatus(0)
  }
  return (
    <Modal
      classNames={{
        modal: 'custom-modal'
      }}
      center
      open={payStatus > 0}
      onClose={handlerClose}
      closeIcon={<div className='modal-close'></div>}
      showCloseIcon={payStatus > 1}
      closeOnOverlayClick={false}
    >
      <>
        {(payStatus === PayStatus.SUCCESS ||
          payStatus === PayStatus.RECHECK_SUCEESS) && (
          <div>
            <div className='suc-icon'></div>
            <div className='pay-status-title'>{langText.susccess}</div>
            <div className='pay-result-content'>{langText.succText}</div>
            <div
              className='button'
              onClick={() => {
                reportSDK.clickReport({
                  eventName: 'h5_store_popup',
                  properties: {
                    _action: 'click',
                    _url: location.href,
                    _page_name: 'h5_store_page',
                    popup_type: 'purchase_successful_popup'
                  }
                })
                handlerClose()
              }}
            >
              {langText.ok}
            </div>
          </div>
        )}
        {(payStatus === PayStatus.FAIL ||
          payStatus === PayStatus.RECHECK_FAIL) && (
          <div>
            <div className='fail-icon'></div>
            <div className='pay-status-title'>{langText.fail}</div>
            <div className='pay-result-content'>{langText.failText}</div>
            <div
              className='button'
              onClick={() => {
                reportSDK.clickReport({
                  eventName: 'h5_store_popup',
                  properties: {
                    _action: 'click',
                    _url: location.href,
                    _page_name: 'h5_store_page',
                    popup_type:
                      payStatus === PayStatus.FAIL
                        ? 'purchase_failed_popup'
                        : 'purchase_successful_popup'
                  }
                })
                getFeedbackUrl()
              }}
            >
              {langText.feedback}
            </div>
          </div>
        )}
        <h1></h1>
      </>
    </Modal>
  )
}
