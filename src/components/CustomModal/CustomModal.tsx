import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import './CustomModal.scss'
import { CloseOutlined } from '@ant-design/icons'
interface IProps {
  width?: number
  height?: number
  open: boolean
  title?: string
  titleDOM?: React.ReactElement
  className?: string
  children?: React.ReactNode
  isDark?: boolean
  onClose?: () => void
}
const touchmoveMove = (event: any) => {
  event.preventDefault()
}

const isApp = window.isApp

/**
 * @component 移动端弹窗
 * @param props
 * @returns
 */
const CustomModal = (props: IProps) => {
  const {
    open,
    title,
    className,
    titleDOM,
    children,
    isDark,
    onClose,
    width,
    height
  } = props
  useEffect(() => {
    if (open) {
      document.addEventListener('touchmove', touchmoveMove, {
        passive: false
      })
    } else {
      document.removeEventListener('touchmove', touchmoveMove)
    }

    if (!isApp) {
      document.body.style.overflow = open ? 'hidden' : 'auto'
    }
  }, [open, isApp])
  return (
    <div className={classNames('drawer_modal', className, open && 'open')}>
      <div className={'drawer_modal_box'}>
        <div className={'drawer_title'}>
          {titleDOM ? titleDOM : <span>{title}</span>}
        </div>

        <div
          className={'drawer_content'}
          // style={{ width: width, height: height }}
        >
          {children}
        </div>
        {onClose && <div className={'close_btn'} onClick={onClose}></div>}
      </div>
    </div>
  )
}
CustomModal.displayName = 'CustomModal'
export default CustomModal
