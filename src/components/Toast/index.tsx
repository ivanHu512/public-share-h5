import React, { useEffect, useRef, useState } from 'react'
import './index.scss'

const Toast = () => {
  const timerRef = useRef<any>()
  const [toastInfo, setToastInfo] = useState<{ show: boolean; text: string }>({
    show: false,
    text: ''
  })

  /**
   * 将方法挂载到window对象
   * 组件卸载时移除该方法
   */
  useEffect(() => {
    window.rs_toast = { show }
    return () => {
      delete window.rs_toast?.show
    }
  }, [])

  const show = (text: string) => {
    setToastInfo({ show: true, text })
    handleShowToast()
  }

  const handleShowToast = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(
      () => setToastInfo({ show: false, text: '' }),
      3000
    )
  }

  if (!toastInfo.show) return null

  return (
    <div className='rs_toast'>
      <div className='rs_toast_content'>{toastInfo.text}</div>
    </div>
  )
}

/**
 * toast方法
 *  window对象上window.rs_toast?.show?.('')
 */
export default Toast
