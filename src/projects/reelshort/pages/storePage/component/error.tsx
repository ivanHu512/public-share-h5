import React from 'react'
import { usePay } from '../hooks'
import { createVDeeplink } from '@reelshort/utils/url'
import { isApp } from '../utils/env'
import webview from '@/utils/web-view'

export default function Error() {
  const { langText } = usePay()
  const toApp = () => {
    if (isApp) {
      // 在APP内的话回到app
      webview.exec('backToApp')
    } else {
      const openLink = createVDeeplink({
        fromType: 10,
        parm1: '',
        chapterId: '',
        type: 1000
      })
      window.location.href = openLink
    }
  }
  return (
    <div className='error-container'>
      <div className='error-img'></div>
      <div className='err-tit'>{langText.pageErrorTitle}</div>
      <div className='text'>{langText.pageError}</div>
      <div className='button return-app' onClick={toApp}>
        {langText.returnApp}
      </div>
    </div>
  )
}
