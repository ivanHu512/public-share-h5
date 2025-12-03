import React, { useState, useEffect, useRef } from 'react'

interface IPageData {
  targetTimestamp: number
}

const CountdownTimer = (props: IPageData) => {
  // 使用useState定义状态
  const { targetTimestamp } = props

  const timerInterval = useRef<any>()

  const [remainingTime, setRemainingTime] = useState<any>({
    hours: null,
    minutes: null,
    seconds: null
  })

  const targetTimestampTime = useRef(targetTimestamp)
  // 计算剩余时间的函数
  const calculateRemainingTime = () => {
    const remainingTime = --targetTimestampTime.current
    setRemainingTime({
      hours:
        Math.floor(remainingTime / 3600) > 0
          ? Math.floor(remainingTime / 3600)
              .toString()
              .padStart(2, '0')
          : '00',
      minutes:
        Math.floor((remainingTime % (60 * 60)) / 60) > 0
          ? Math.floor((remainingTime % (60 * 60)) / 60)
              .toString()
              .padStart(2, '0')
          : '00',
      seconds:
        Math.floor(remainingTime % 60) > 0
          ? Math.floor(remainingTime % 60)
              .toString()
              .padStart(2, '0')
          : '00'
    })
  }

  // 使用useEffect在组件加载和remainingTime改变时更新倒计时
  useEffect(() => {
    clearInterval(timerInterval.current)
    targetTimestampTime.current = targetTimestamp
    if (targetTimestampTime.current > 0) {
      calculateRemainingTime()
      timerInterval.current = setInterval(() => {
        calculateRemainingTime()
      }, 1000)
    }

    // 在组件卸载时清除定时器
    return () => clearInterval(timerInterval.current)
  }, [targetTimestamp])

  // 渲染倒计时组件
  return (
    <>
      <span>{remainingTime.hours}</span>
      <i className='colon'>:</i>
      <span>{remainingTime.minutes}</span>
      <i className='colon'>:</i>
      <span>{remainingTime.seconds}</span>
    </>
  )
}

export default CountdownTimer
