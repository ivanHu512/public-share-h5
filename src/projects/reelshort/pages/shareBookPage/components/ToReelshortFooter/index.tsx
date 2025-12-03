import React, { useState, useEffect } from 'react'
import logo from '@reelshort/pages/shareBookPage/assets/logo.png'
import './styles.scss'
import { createVDeeplink } from '@reelshort/utils/url'
import { reportSDK } from '@reelshort/utils/reportInfo/index'

interface IProps {
  /** deeplink来源 (1：市场投放 2：分享) */
  fromType?: 2
  /** 作品id */
  book_id?: string
  /** 章节id */
  chapter_id?: string

  /** 落地页 1001-落地播放页 1000-大厅 */
  type?: 1001 | 1000
  /** 内容类型 1-常规剧 2-互动剧 */
  book_type?: 1 | 2
  isNoData: boolean
}

/**
 * 底部跳转app浮窗
 */
const ToReelshortFooter = (props: IProps): JSX.Element => {
  const {
    fromType = 2,
    /** 作品id */
    book_id = '',
    /** 章节id */
    chapter_id = '',
    /** 落地页 1001-落地播放页  1000-大厅 */
    type = 1001,
    book_type = 1,
    isNoData
  } = props
  reportSDK.setPublicParams({
    CHANNEL_ID: 'WEB43001'
  })
  /** 打开app事件 */
  const openHandle = () => {
    const link = createVDeeplink({
      fromType,
      parm1: book_id,
      chapterId: chapter_id,
      type,
      book_type
    })
    console.log('deeplink链接', link)
    reportSDK.clickReport({
      eventName: 'h5_share_page_click',
      properties: {
        _action: 'open_lick',
        _story_id: book_id,
        is_on_shelf: isNoData ? 2 : 1
      }
    })
    window.location.href = link
  }
  if (isNoData) {
    return (
      <div className='go-to-reelshort' onClick={openHandle}>
        Open ReelShort
      </div>
    )
  }
  return (
    <div className='to-v-footer'>
      <img src={logo} alt='logo' />
      <p>Watch all you want in ReelShort !</p>
      <div className='open-btn' onClick={openHandle}>
        OPEN
      </div>
    </div>
  )
}
ToReelshortFooter.displayName = 'ToReelshortFooter'
export default ToReelshortFooter
