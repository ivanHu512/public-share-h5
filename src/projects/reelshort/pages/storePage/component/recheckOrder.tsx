import React from 'react'
import { getFeedbackUrl } from '../utils/feedback'
import { Toast } from 'antd-mobile-v5'
import usePayment from '../hooks/usePayment'
import { getOrderInfo, removeOrderInfo, sleep } from '../lib'
import { usePay } from '../hooks'
import { PayStatus } from '../types'
import { payReport } from '../utils/reportInfo'

export default function ReCheckOrder() {
  const { setSpin, setPayStatus, user, updateUser } = usePay()
  const { reCheckOrder } = usePayment()
  const reCheck = async () => {
    const orderInfos = getOrderInfo(true)

    if (!orderInfos || !Array.isArray(orderInfos)) {
      Toast.show({
        content: 'No recoverable orders'
      })
      removeOrderInfo(true)
      return
    }
    let res: any = null
    if (Array.isArray(orderInfos) && orderInfos.length) {
      setSpin(true)
      let checkSucccess = 0
      for (let i = 0; i < orderInfos.length; i++) {
        res = await reCheckOrder(orderInfos[i])

        if (res.code === 0) {
          const { status } = res.data
          if (status === 1 || status === 3) {
            checkSucccess++

            payReport('pay_complete', orderInfos[i], { parm2: 2 })
          } else {
            payReport('pay_failed', orderInfos[i], { parm2: 2 })
          }
        } else {
          payReport('pay_failed', orderInfos[i], { parm2: 2 })
        }
        // 等待一秒后再去请求
        if (i + 1 < orderInfos.length) {
          await sleep(1000)
        }
      }
      setSpin(false)
      // remove
      if (checkSucccess > 0) {
        setPayStatus(PayStatus.RECHECK_SUCEESS)
        if (res && user) {
          const updateCoins = Object.assign(user, {
            coins: res.data.coins,
            bonus: res.data.bonus
          })
          updateUser({
            ...updateCoins
          })
        }
      } else {
        Toast.show({
          content: 'No recoverable orders'
        })
      }
      removeOrderInfo(true)
      console.log({ checkSucccess })
    }
  }

  return (
    <div className='recheckOrder'>
      <p>Nothing received after payment? </p>
      <p>
        Please <a onClick={reCheck}>click here to refresh your order status</a>,
      </p>
      <p>
        or <a onClick={getFeedbackUrl}>click here to give us feedback.</a>
      </p>
    </div>
  )
}
