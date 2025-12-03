import React, { forwardRef, useState, useMemo, useEffect } from 'react'
import CustomModal from '@/components/CustomModal/CustomModal'
import './RedeemCofirmModel.scss'
import type { IData } from './types'
import webview from '@/utils/web-view'

interface IProps {
  onClose?: () => void
  onConfirm?: () => void
}

/**
 * @page 播放器支付弹窗
 * @param props
 * @returns
 */
const RedeemCofirmModel = forwardRef((props: any, ref: any) => {
  const { redeemBookModelOpen, onClose, bookId, onConfirm } = props

  const [open, setOpen] = useState<boolean>(redeemBookModelOpen)

  useEffect(() => {
    setOpen(redeemBookModelOpen)
  }, [redeemBookModelOpen])

  return (
    <div>
      <CustomModal open={open} width={284} height={180} onClose={onClose}>
        <div className='redeemCofirmModel'>
          <div className='redeemCofirmModel_info'>
            <span> Are you sure you want to redeem this series?</span>
          </div>
          <div className='redeemCofirmModel_btn'>
            <div className='btn_cancel' onClick={() => onClose()}>
              Cancel
            </div>
            <div className='btn_yes' onClick={() => onConfirm()}>
              Yes
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
})
RedeemCofirmModel.displayName = 'RedeemCofirmModel'
export default RedeemCofirmModel
