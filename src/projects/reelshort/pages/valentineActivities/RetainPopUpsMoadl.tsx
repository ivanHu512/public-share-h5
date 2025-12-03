import React, { forwardRef, useState, useMemo, useEffect } from 'react'
import CustomModal from '@/components/CustomModal/CustomModal'
import './RetainPopUpsMoadl.scss'
import CountdownTimer from './CountdownTimer'
import { reportSDK } from '@reelshort/utils/reportInfo/index'

interface IProps {
  RetainPopUpsMoadlOpen: boolean
  onClose?: () => void
  onLeave?: () => void
  textContent?: any
}

/**
 * @page 情人节挽留弹窗
 * @param props
 * @returns
 */
const RetainPopUpsMoadl = forwardRef((props: any, ref: any) => {
  const { RetainPopUpsMoadlOpen, onClose, onLeave, textContent } = props

  const [open, setOpen] = useState<boolean>(RetainPopUpsMoadlOpen)

  useEffect(() => {
    setOpen(RetainPopUpsMoadlOpen)
  }, [RetainPopUpsMoadlOpen])

  return (
    <div>
      <CustomModal open={open} width={289} height={432} onClose={onClose}>
        <div className='retainPopUpsMoadl'>
          <div className='model_Header'>
            <div className='header_title'>{textContent?.t_confirmExit}</div>
          </div>
          <div className='model_content'>
            <div className='content_info'>{textContent?.t_missOutContent}</div>
            <div className='content_center'>
              <div>
                <CountdownTimer targetTimestamp={textContent?.count_down} />
              </div>
              <div className='content_center_img'></div>
            </div>
          </div>
          <div className='model_btn'>
            <div className='leave_btn' onClick={onLeave}>
              {textContent?.t_leave}
            </div>
            <div
              className='look_btn'
              onClick={() => {
                reportSDK.clickReport({
                  eventName: 'h5_activity_persuade_popup',
                  properties: {
                    _action: 'take_look_click',
                    _url: location.href,
                    _page_name: 'h5_activity_valentine_page'
                  }
                })
                setOpen(false)
                sessionStorage.setItem('leaveType', 'true')
              }}
            >
              {textContent?.t_takeALook}
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
})
RetainPopUpsMoadl.displayName = 'RetainPopUpsMoadl'
export default RetainPopUpsMoadl
