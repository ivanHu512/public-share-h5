import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { PayContext, PayContextProps } from './hooks'

import { IProduct, PayStatus } from './types'
import {
  Profile,
  PayMethod,
  Products,
  PayButton,
  CheckOrderModal,
  Spin,
  Error,
  ReCheckOrder
} from './component'
import useUser from './hooks/useUser'
import { lang } from './lib'
import useProducts from './hooks/useProduct'
import { expoReort } from './utils/reportInfo'

import StripeModal from './component/stripeModal'

import logo from '@reelshort/assets/icons/icon_logo.png'
import 'react-responsive-modal/styles.css'
import './App.scss'

expoReort('loading', {
  _action: 'loading'
})
const App: React.FC = () => {
  const { user, updateUser, userData, uid, userError } = useUser()
  const { data, payType, productsList, setPayType, currency, listError } =
    useProducts()
  const [spin, setSpin] = useState(false)
  const [payStatus, setPayStatus] = useState<PayStatus>(PayStatus.UNPAY)
  const [selectedProduct, setProduct] = useState<IProduct | null>(null)
  const [openStripeModal, setOpenStripeModal] = useState(false)

  const [isError, setIsError] = useState(false)

  const head = useMemo(() => {
    return (
      <div className='site-head'>
        <div className='site-logo'>
          <img src={logo} alt='reelshort' />
        </div>
        <div className='site-name'>ReelShort</div>
        {/* <div>
          测试用：{' '}
          <a
            style={{ marginRight: 20 }}
            onClick={() => {
              setPayStatus(PayStatus.FAIL)
            }}
          >
            失败弹窗
          </a>
          <a
            onClick={() => {
              setPayStatus(PayStatus.SUCCESS)
            }}
          >
            成功弹窗
          </a>
        </div> */}
      </div>
    )
  }, [])

  const tisp = useMemo(() => {
    if (data && data?.code === 0) {
      return (
        <div className='tip'>
          <div className='tip-tit'>{data?.data?.remark_title}</div>
          <div
            className='tip-content'
            dangerouslySetInnerHTML={{
              __html: data?.data?.store_tips?.replace(/([\n\r]+)/g, '<br/>')
            }}
          ></div>
        </div>
      )
    }
    return null
  }, [data])

  useEffect(() => {
    if (user && payType && productsList.length) {
      expoReort('show', {
        _action: 'show'
      })
      const reportData = productsList.map((item: any, index: number) => {
        return `${index + 1}#${item.gid}#${item.product_id}`
      })
      expoReort(
        'product',
        {
          item_list: reportData
        },
        'page_item_impression'
      )
    }
  }, [user, payType, productsList])

  useEffect(() => {
    if (userError || listError) {
      setIsError(true)
      expoReort('login_error', {
        _action: 'login_error_show'
      })
    }
  }, [userError, listError])

  useEffect(() => {
    if (localStorage.getItem('lang') === 'ar')
      document.documentElement.setAttribute('dir', 'rtl')
  }, [lang])

  const contextProps: PayContextProps = {
    initData: data,
    currency,
    payType,
    setPayType,
    user,
    updateUser,
    productsList,
    selectedProduct,
    setProduct,
    spin,
    setSpin,
    payStatus,
    setPayStatus,
    openStripeModal,
    setOpenStripeModal,
    langText: lang()
  }

  return (
    <PayContext.Provider value={contextProps}>
      <div className='container'>
        {head}
        {!isError ? (
          <>
            <main>
              <Profile />
              <PayMethod />
              <Products />
              {tisp}
              {/* {data && <ReCheckOrder />} */}
            </main>
            {/* <PayButton /> */}
            <StripeModal />
            <CheckOrderModal />
            {spin && <Spin />}
          </>
        ) : (
          <Error />
        )}
      </div>
    </PayContext.Provider>
  )
}

export default App
