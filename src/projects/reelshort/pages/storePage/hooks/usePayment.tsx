import React, { useCallback, useEffect } from 'react'
import { createPreOrder, checkOrder } from '@reelshort/services/shopping'

import {
  saveOrderInfo,
  removeOrderInfo,
  getOrderInfo,
  resetUrl,
  sleep
} from '../lib'
import { payReport } from '../utils/reportInfo'
import { Toast } from 'antd-mobile-v5'
import { usePay } from '.'
import { PayStatus, PayType, IOrderinfo, IProduct } from '../types'
import { useRequest } from 'ahooks'
import { reportSDK } from '@/projects/reelshort/utils/reportInfo'

let reTryCount = 0

export default function usePayment() {
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
  const {
    setSpin,
    setPayStatus,
    selectedProduct,
    payType,
    setOpenStripeModal,
    user,
    updateUser,
    langText
  } = usePay()

  // 创建支付订单
  const { run: createOrder } = useRequest(
    (params: any) => createPreOrder(params),
    {
      manual: true,
      onSuccess: (res) => {
        console.log('createOrder res:', res)
        if (res.code === 0) {
          const { status, order_id, approve_link, merchant_order_id } = res.data
          console.log('check', res)
          if (status === 1) {
            saveOrderInfo({
              approve_link,
              merchant_order_id,
              order_id,
              price: selectedProduct?.price || 0,
              product_id: selectedProduct?.product_id || '',
              original_price: selectedProduct?.original_price || '',
              payType: payType === PayType.PayPal ? 1002 : 1003,
              gid: selectedProduct?.gid || 0,
              transaction_id: merchant_order_id,
              sid: user?.sid || 0,
              coins: selectedProduct?.coins,
              bonus: selectedProduct?.bonus
            })
            // 保存上次选择信息
            localStorage.setItem(
              'last_selected',
              JSON.stringify({
                payType,
                selectedProduct
              })
            )
            sessionStorage.setItem('originUrl', window.location.href)

            if (payType === PayType.PayPal) {
              payReport('pay_start', {
                ...selectedProduct,
                order_id,
                transaction_id: merchant_order_id,
                payType: 1002
              })
              setTimeout(() => {
                window.location.href = approve_link
              }, 300)
              // 防止有些机型是新窗口打开没关闭
              setTimeout(() => {
                setSpin(false)
              }, 3000)
              return
            } else {
              setOpenStripeModal(true)
            }
          } else {
            reportSDK.errorLog({
              err_type: 'pay',
              _err_code: res.code,
              _err_info: res?.msg
            })

            Toast.show({
              content: res.msg
            })
            payReport('pay_failed', {
              ...selectedProduct,
              payType: payType === PayType.PayPal ? 1002 : 1003
            })
          }
        } else {
          Toast.show({
            content: res.msg
          })
          // 创建订单错误上报
          reportSDK.errorLog({
            err_type: 'pay',
            _err_code: res.code,
            _err_info: res?.msg
          })
          payReport('pay_failed', {
            ...selectedProduct,
            payType: payType === PayType.PayPal ? 1002 : 1003
          })
        }
        setSpin(false)
      },
      onError: (error) => {
        setSpin(false)
        // 创建订单错误上报
        Toast.show({
          content: langText.networkError
        })
        payReport('pay_failed', {
          ...selectedProduct,
          payType: payType === PayType.PayPal ? 1002 : 1003
        })
      }
    }
  )

  const { run: reCheckOrder } = useRequest(
    (params: IOrderinfo) => checkOrder(params),
    {
      manual: true,
      onSuccess: (res, [params]) => {
        return res
      }
    }
  )

  /* 轮询检查支付中心订单 */
  const {
    run: pollingCheckOrder,
    cancel,
    refresh
  } = useRequest((params: IOrderinfo) => checkOrder(params), {
    manual: true,
    throwOnError: true,
    onSuccess: async (res, [params]) => {
      // const res: any = { code: 0, data: { status: 2 } }
      const orderInfo = getOrderInfo()
      console.log('checkOrder res', res)
      // 6009901 message 系统繁忙 system busy
      if (res.code !== 0 && res.code !== 6009901) {
        // 验证订单错误上报
        reportSDK.errorLog({
          err_type: 'pay',
          _err_code: res.code,
          _err_info: res?.msg
        })

        payReport('pay_failed', orderInfo)
        checkOrderFail(params)
        return
      }
      const status = res.data?.status
      console.log('🚀 ~ file: PaypalModal.tsx ~ line 155 ~ status', status)
      if (status === 1 || status === 3) {
        payReport('pay_complete', orderInfo)
        // 等于1是成功
        if (user) {
          console.log({ orderInfo })
          reportSDK.eventReport({
            event_name: 'm_currency_change',
            properties: {
              _scene_name: 'main_scene',
              _page_name: 'h5_store_page',
              _vc_id: 'vc_01',
              _change_amount: orderInfo?.coins,
              _latter_amount: res.data.coins,
              _change_reason: 'pay_get'
            }
          })

          reportSDK.eventReport({
            event_name: 'm_currency_change',
            properties: {
              _scene_name: 'main_scene',
              _page_name: 'h5_store_page',
              _vc_id: 'vc_02',
              _change_amount: orderInfo?.bonus,
              _latter_amount: res.data.bonus,
              _change_reason: 'pay_get'
            }
          })

          const updateCoins = Object.assign(user, {
            coins: res.data.coins,
            bonus: res.data.bonus
          })
          updateUser({
            ...updateCoins
          })
        }
        checkOrderSuccess()
      } else {
        if (reTryCount < 1) {
          console.log('just wait 1000ms then retry one times.')
          reTryCount++
          await sleep(1000)
          refresh()
        } else {
          payReport('pay_failed', orderInfo)
          checkOrderFail(params)
        }
      }
    },
    onError: (error, [params]) => {
      console.log(
        '🚀 ~ file: PaypalModal.tsx ~ line 170 ~ error',
        error.toString()
      )
      checkOrderFail(params)
      resetUrl()
    }
  })

  const checkOrderSuccess = useCallback(() => {
    setSpin(false)
    setPayStatus(PayStatus.SUCCESS)
  }, [])

  const checkOrderFail = (params: IOrderinfo) => {
    setSpin(false)
    setPayStatus(PayStatus.FAIL)

    // 保存失败的订单信息
    const orderInfo = getOrderInfo()
    saveOrderInfo(orderInfo, true)
  }

  /**
   * 去支付
   */
  const toPay = useCallback(
    (param: IProduct) => {
      setSpin(true)
      createOrder({
        gid: param?.gid || 0,
        return_url: window.location.href + `&order_flag=1`,
        cancel_url: window.location.href + `&pay_cancel=1`,
        payType: payType === PayType.PayPal ? 1 : 2
      })
    },
    [payType]
  )

  return { toPay, reCheckOrder, pollingCheckOrder }
}
