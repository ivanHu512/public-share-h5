import React, { useEffect, useState, useRef } from 'react'
function TruncateText(props: any) {
  const { text } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<any>(null)
  const textContainerRef = useRef<any>(null)
  useEffect(() => {
    // 获取容器的高度
    const containerHeight = containerRef?.current?.clientHeight
    const textHeight = textContainerRef.current.clientHeight
    // 如果内容高度超过容器高度，显示"更多"按钮
    if (containerHeight < textHeight) {
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }, [])

  // 处理点击"更多"按钮的事件
  const handleToggleClick = () => {
    console.log(!isExpanded)
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      ref={containerRef}
      // style={{ overflow: 'hidden', height: isExpanded ? 'auto' : '2.2rem' }}
    >
      <div ref={textContainerRef}>{text}</div>
      {!isExpanded && (
        <div className='btn-more' onClick={handleToggleClick}>
          ...<span>More</span>
        </div>
      )}
    </div>
  )
}
export default TruncateText
