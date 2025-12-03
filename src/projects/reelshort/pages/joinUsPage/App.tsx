import React, { useEffect, useRef, useState } from 'react'
import Clipboard from 'clipboard'

import './App.scss'
import webview from '../../utils/web-view'
import Toast from '../../../../components/Toast'
import { i18n } from './locales'

// const iconBack =
//   'https://v-mps.crazymaplestudios.com/images/4460de20-5548-11ef-838e-777d81c2a9c7.png'
const iconCopy =
  'https://v-mps.crazymaplestudios.com/images/0b6030d0-5af7-11ef-838e-777d81c2a9c7.png'

/**
 * app内 - 加入我们
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
          document.title = i18n('headline')
          setLang(res.lang)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (lang === 'ar') document.body.style.direction = 'rtl'
  }, [lang])

  const handleToClipBoard = (event: any, text: string) => {
    const cb = new Clipboard('.btn', { text: () => text })
    cb.on('success', () => window.rs_toast?.show?.(i18n('copy_suc')))
    cb.on('error', () => window.rs_toast?.show?.(i18n('copy_fail')))
    cb.onClick(event)
  }

  return (
    <div className='main'>
      {/* <div className='header_container'>
        <div className='header'>
          <img className='back_btn' src={iconBack} onClick={handlerBack} />
          <p className='page_title'>{i18n('headline')}</p>
        </div>
      </div> */}
      <div className='wrap'>
        <div className='banner'>
          <img src='https://v-mps.crazymaplestudios.com/images/06bfa260-5951-11ef-838e-777d81c2a9c7.png' />
        </div>
        <p className='title'>{i18n('title')}</p>
        <p className='desc'>{i18n('subhead')}</p>
      </div>
      <div className='list'>
        <div className='item'>
          <span className='label'>{i18n('label_text')}</span>
          <a
            className='text link'
            href='https://apply.workable.com/crazymaplestudio'
          >
            {i18n('apply_here')}
          </a>
          {/* <span
            className='text link'
            onClick={(e) => handleToClipBoard(e, 'hr@crazymaplestudio.com')}
          >
            hr@crazymaplestudio.com
            <img className='copy_icon' src={iconCopy} />
          </span> */}
        </div>
      </div>
      <Toast />
    </div>
  )
}

export default App
