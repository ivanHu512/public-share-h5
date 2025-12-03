import React, { useEffect, useState } from 'react'
import { getPageQuery } from '@/utils/utils'
import './App.scss'
import Successful from './components/Successful'
import Failure from './components/Failure'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
/**
 * 邮箱验证结果页
 * @param props
 * @returns
 */
const EmailVerificationPage = (): JSX.Element => {
  const [lang, setLang] = useState<string>(
    () => localStorage?.getItem('lang') || 'en'
  )
  reportSDK.setPublicParams({
    CHANNEL_ID: 'WEB43001'
  })
  // 1=成功 2=邮箱已经被绑定过了 3=uid已经绑定过邮箱 4=链接失效，非法链接
  const { state, rsid, bonus, email } = getPageQuery() as any
  const isSuccess = state === '1'
  useEffect(() => {
    localStorage.setItem('uid', rsid)
    if (isSuccess) {
      reportSDK.report({
        _event_name: 'm_currency_change',
        properties: {
          _scene_name: 'main_scene',
          _page_name: 'bind_email_verify',
          _vc_id: 'vc_02',
          _change_amount: bonus,
          _change_reason: 'bind_email_get'
        }
      })
    }
    reportSDK.clickReport({
      eventName: 'h5_bind_email_verify_cilck',
      properties: {
        _action: 'show', // 分别对应：页面曝光
        _scene_name: 'main_scene',
        _page_name: 'bind_email',
        bind_email: email, // 绑定邮箱
        bind_status: isSuccess ? 1 : 2, // 验证状态，1=成功 2=失败
        fail_type: isSuccess ? '' : Number(state) - 1, // 1=邮箱被绑定 2=用户被绑定    bind_status=2时上报
        _url: location.href, // 网页url
        _change_amount: bonus // 任务领取bonus
      }
    })
  }, [])
  useEffect(() => {
    if (lang === 'ar') document.body.style.direction = 'rtl'
  }, [lang])

  return (
    <div className='body'>
      <h1>ReelShort</h1>
      <div className='content_box'>
        {isSuccess ? <Successful /> : <Failure state={state} />}
      </div>
      <div className='floor'>
        All rights reserved. {new Date().getFullYear() || 2024} Crazy Maple
        Studio Inc.©
      </div>
    </div>
  )
}
EmailVerificationPage.displayName = 'EmailVerificationPage'
export default EmailVerificationPage
