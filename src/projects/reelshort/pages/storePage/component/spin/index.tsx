import React from 'react'
import './index.scss'
export default function Spin() {
  return (
    <div className='spin'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
