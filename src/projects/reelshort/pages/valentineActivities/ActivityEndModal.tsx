import React, { forwardRef, useState, useMemo, useEffect } from 'react'
import CustomModal from '@/components/CustomModal/CustomModal'
import './ActivityEndModal.scss'
import webview from '@/utils/web-view'

interface IProps {
  ActivityEndModalOpen: boolean
  textContent?: any
}

/**
 * @page 情人节挽留弹窗
 * @param props
 * @returns
 */
const ActivityEndModal = forwardRef((props: any, ref: any) => {
  const { ActivityEndModalOpen, textContent } = props

  const [open, setOpen] = useState<boolean>(ActivityEndModalOpen)

  useEffect(() => {
    setOpen(ActivityEndModalOpen)
  }, [ActivityEndModalOpen])

  const toBackClick = () => {
    webview.exec('backToApp')
  }

  return (
    <div>
      <CustomModal open={open} width={315} height={170}>
        <div className='activityEndModal'>
          <div className='model_Header'>
            <div className='header_info'>
              {' '}
              {/* Oops! This event has already ended. Stay tuned for future exciting
              events. Thank you for your interest! */}
              {textContent?.t_activityEnd}
            </div>
          </div>
          <div className='model_btn'>
            <div className='look_btn' onClick={() => toBackClick()}>
              {textContent?.t_ok}
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
})
ActivityEndModal.displayName = 'ActivityEndModal'
export default ActivityEndModal
