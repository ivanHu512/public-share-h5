import React, { useState, useLayoutEffect } from 'react'
import reelshortIcon from '../../assets/logo.png'
import searchIcon from '../../assets/search_icon.png'
import arrowGif from '../../assets/arrow.gif'
import './index.scss'

interface IProps {
  data: any
}

/**
 *
 * @param props
 * @returns
 */
const Arrow = (props: any) => {
  const { data } = props
  const [size, setSize] = useState({
    height: 0
  })

  useLayoutEffect(() => {
    const handleResize = () => {
      const innerHeight = window.innerHeight

      const footerHeight =
        document.getElementById('footer_box')?.offsetHeight || 0
      const height = innerHeight - footerHeight
      console.log(
        '%c [ innerHeight ]-153',
        'font-size:13px; background:pink; color:#bf2c9f;',
        innerHeight
      )
      setSize({
        height: height
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <>
      <div
        className='arrow_box'
        style={{
          height: size.height + 'px'
        }}
      >
        <div className='reelshort_icon'>
          <img src={reelshortIcon} alt='' />
        </div>
        <div className='reelshort_name'>ReelShort </div>
        <div className='search-box'>
          <div className='search-title'>{data?.title}</div>
          <div className='search-icon'>
            <img src={searchIcon} alt='' />
          </div>
        </div>
        <div className='chepter-info'>
          Click the button to watch more exciting content
        </div>
        <div className='arrows'>
          <img src={arrowGif} alt='' />

          {/* <div className='arrow arrow1'></div>
          <div className='arrow arrow2'></div>
          <div className='arrow arrow3'></div> */}
        </div>
      </div>
      {/* <img src={arrowGif} alt='' /> */}
    </>
  )
}
Arrow.displayName = 'Arrow'
export default Arrow
