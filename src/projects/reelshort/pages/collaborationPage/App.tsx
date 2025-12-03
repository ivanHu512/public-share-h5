import React, { useEffect, useRef, useState } from 'react'
import Clipboard from 'clipboard'

import './App.scss'
import webview from '../../utils/web-view'
import Toast from '../../../../components/Toast'
import { i18n } from './locales'

const iconBack =
  'https://v-mps.crazymaplestudios.com/images/4460de20-5548-11ef-838e-777d81c2a9c7.png'
const iconCopy =
  'https://v-mps.crazymaplestudios.com/images/0b6030d0-5af7-11ef-838e-777d81c2a9c7.png'

/**
 * app内 - 内容合作页面
 */
const App: React.FC = () => {
  const [lang, setLang] = useState<string>(
    () => localStorage?.getItem('lang') || 'en'
  )

  useEffect(() => {
    webview.exec('getUserInfo', {
      callback: (res) => {
        if (res.lang) {
          localStorage?.setItem('lang', res.lang)
          document.title = i18n('title')
          setLang(res.lang)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (lang === 'ar') document.body.style.direction = 'rtl'
  }, [lang])

  // const handlerBack = () => webview.exec('backToApp')

  const handleToClipBoard = (event: any, text: string) => {
    const cb = new Clipboard('.btn', { text: () => text })
    cb.on('success', () => window.rs_toast?.show?.(i18n('copy_suc')))
    cb.on('error', () => window.rs_toast?.show?.(i18n('copy_fail')))
    cb.onClick(event)
  }

  const renderEmail = (email: string) => (
    <span className='link' onClick={(e) => handleToClipBoard(e, email)}>
      {email}
      <img className='copy_icon' src={iconCopy} />
    </span>
  )

  return (
    <div className='main'>
      {/* <div
        className='header_container'
        style={{
          backdropFilter: `blur(${bgBlur}px)`,
          backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`
        }}
      >
        <div className='header'>
          <img className='back_btn' src={iconBack} onClick={handlerBack} />
        </div>
      </div> */}
      <div className='bg_container' />
      <div className='info_container'>
        <p className='title'>{i18n('dear')}</p>
        <p className='describe'>{i18n('desc')}</p>
        <div className='describe'>
          <p className='subhead'>{i18n('copyright_title')}</p>
          <span>{i18n('copyright_desc')}</span>
          {renderEmail('business@crazymaplestudio.com')}
          <span>{i18n('copyright_supplement')}</span>
        </div>
        <div className='describe'>
          <p className='subhead'>{i18n('script_title')}</p>
          <span>{i18n('script_desc')}</span>
          {renderEmail('Reelshort_story@crazymaplestudio.com')}
          <span>{i18n('script_supplement')}</span>
        </div>
        <div className='describe'>
          <p className='subhead'>{i18n('translate_title')}</p>
          <span>{i18n('translate_desc')}</span>
          {renderEmail('dubbing.trans.collab@crazymaplestudio.com')}
          <span>{i18n('translate_supplement')}</span>
        </div>
        <div className='describe'>
          <p className='subhead'>{i18n('short_dub_title')}</p>
          <span>{i18n('short_dub_des')}</span>
          {renderEmail('dubbing.trans.collab@crazymaplestudio.com')}
          <span>{i18n('short_dub_des_supplement')}</span>
        </div>
        <div className='describe'>
          <p className='subhead'>{i18n('film_title')}</p>
          <span>{i18n('film_desc')}</span>
          {renderEmail('archer@crazymaplestudio.com')}
          <span>{i18n('film_supplement')}</span>
        </div>
        <div className='describe'>
          <p className='subhead'>{i18n('business_title')}</p>
          <span>{i18n('business_desc')}</span>
          {renderEmail('partnerships@crazymaplestudio.com')}
          <span>{i18n('business_supplement')}</span>
        </div>
        <div className='describe'>
          <span>{i18n('wishes')}</span>
        </div>
        <div className='describe'>
          <span>{i18n('team')}</span>
        </div>
      </div>
      <Toast />
    </div>
  )
}

export default App
