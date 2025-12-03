import React, { useState, useEffect } from 'react'

import { i18n } from '../locales'
/**
 * 重复领取页面
 * @param props
 * @returns
 */
const Failure = ({ state }: any) => {
  // 1=成功 2=邮箱已经被绑定过了 3=uid已经绑定过邮箱 4=链接失效，非法链接
  const errorTest: any = {
    2: i18n('bind_email_web_bound_alert'),
    3: i18n('bind_email_web_account_alert'),
    4: i18n('bind_email_web_rul_fail')
  }
  return (
    <div className='failure_box'>
      <h2>{i18n('bind_email_web_error')}</h2>
      <p>{errorTest[state]}</p>
    </div>
  )
}
Failure.displayName = 'Failure'
export default Failure
