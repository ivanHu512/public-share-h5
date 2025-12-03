import React, { useState, useEffect } from 'react'
import icon_award from './../assets/icon_award.png'
import './styles.scss'
import { i18n } from '../locales'
import { getPageQuery } from '@/utils/utils'
/**
 * 验证成功
 * @param props
 * @returns
 */
const Successful = (): JSX.Element => {
  const { bonus }: any = getPageQuery()
  return (
    <div className='successful_box'>
      <h2>{i18n('bind_email_web_title')}</h2>
      <p>{i18n('bind_email_web_text_title')}</p>
      <p>{i18n('bind_email_web_text', bonus)}</p>
      <img src={icon_award} alt='success' />
    </div>
  )
}
Successful.displayName = 'Successful'
export default Successful
