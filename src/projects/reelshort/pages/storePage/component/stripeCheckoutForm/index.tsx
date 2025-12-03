import React, { useState } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button, Toast } from 'antd-mobile-v5'
import { payReport } from '../../utils/reportInfo'
import { getOrderInfo } from '../../lib'
import { usePay } from '../../hooks'

const StripeCheckoutForm: React.FC = (): any => {
  const [isReady, setIsReady] = useState(false)
  const [submit, setSubmit] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { langText } = usePay()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setSubmit(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: location.href }
    })
    setSubmit(false)
    if (error && error.type !== 'validation_error') {
      Toast.show({
        content: error.message
      })
      // errorGet({
      //   parm1: 3001,
      //   parm2: 0,
      //   parm5:
      //     'https://api.stripe.com/v1/payment_intents/pi_3OIQ0uKWTnISOn5e0KTKs6rh/confirm',
      //   parm8: error?.message
      // })
      const orderInfo = getOrderInfo()
      payReport('pay_start', orderInfo)
      payReport('pay_failed', orderInfo)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        onReady={() => {
          setIsReady(true)
          const orderInfo = getOrderInfo()
          payReport('pay_type_choose_show', orderInfo)
        }}
      />
      {isReady && (
        <Button
          className='button pay-now'
          disabled={!stripe}
          loading={submit}
          type='submit'
        >
          {langText.paynow}
        </Button>
      )}
    </form>
  )
}
export default StripeCheckoutForm
