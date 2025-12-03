import React, { useEffect } from 'react'
import bindElementToClipBoard from '@/utils/clip'

const ToClipBoard: React.FC = ({ children }) => {
  useEffect(() => {
    bindElementToClipBoard(
      window.location.href,
      '#copy-component',
      () => {
        alert('Link copied to clipboard')
      },
      () => {
        alert('Copy failed, please try again')
      }
    )
  }, [])
  return <div id='copy-component'>{children}</div>
}

export default ToClipBoard
