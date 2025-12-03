import React, { useEffect, useMemo, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import config from '../../lib/config'
import { Modal } from 'react-responsive-modal'
import StripeCheckoutForm from '../stripeCheckoutForm'
import type { StripeElementsOptions } from '@stripe/stripe-js'
import { getOrderInfo, removeOrderInfo, revemoLastSelected } from '../../lib'
import { payReport } from '../../utils/reportInfo'
import { usePay } from '../../hooks'

const stripePromise = loadStripe(config.stripe_pk)

const stripeOption: StripeElementsOptions = {
  clientSecret: '',
  locale: 'en',
  appearance: {
    theme: 'night'
  }
}

export default function StripeModal() {
  const [open, setOpen] = useState(false)
  const { openStripeModal, setOpenStripeModal, selectedProduct } = usePay()

  useEffect(() => {
    if (openStripeModal) {
      const orderInfo = getOrderInfo()
      const clientSecret = orderInfo?.approve_link
      Object.assign(stripeOption, { clientSecret: clientSecret })
      if (!stripeOption.clientSecret) {
        return
      }
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [openStripeModal])

  const onClose = () => {
    // setOpen(false)
    setOpenStripeModal(false)
    const orderInfo = getOrderInfo()
    console.log({ orderInfo })
    payReport('pay_cancel', orderInfo)
    removeOrderInfo()
    revemoLastSelected()
  }
  return (
    <Modal
      open={open}
      classNames={{ modal: 'custom-modal' }}
      closeIcon={<div className='modal-close'></div>}
      onClose={onClose}
      closeOnOverlayClick={false}
      center
    >
      <div className='stripe-payment'>
        <Elements stripe={stripePromise} options={stripeOption}>
          <StripeCheckoutForm />
        </Elements>
      </div>
    </Modal>
  )
}
