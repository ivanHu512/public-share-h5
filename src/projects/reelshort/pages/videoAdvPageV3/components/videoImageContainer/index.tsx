import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import VideoPlayerContainer from '../VideoPlayerContainer'
import playIcon from '../../assets/play_btn.png'
import styles from './index.module.scss'

interface IPageData {
  data: any
  handleEvokeApp: () => void
  ui_type: string
  playReportHandle: () => void
}

const VideoImageContainer = (props: IPageData) => {
  const { data, handleEvokeApp, ui_type, playReportHandle } = props
  // 播放容器高度
  const [size, setSize] = useState({
    height: 0
  })
  // 当前选中的图片或视频编号
  const [activeIndex, setActiveIndex] = useState<any>(0)

  const swiperRef = useRef<any>(null)

  useEffect(() => {
    document.addEventListener(
      'touchmove',
      function (e) {
        e.preventDefault()
      },
      { passive: false }
    )
  }, [])

  useEffect(() => {
    setActiveIndex(data?.cover)
  }, [data])

  const onImageClick = (index: any) => {
    setActiveIndex(index)
  }

  useLayoutEffect(() => {
    const handleResize = () => {
      const innerHeight = window.innerHeight

      const footerHeight =
        document.getElementById('footer_box')?.offsetHeight || 0
      const height = innerHeight - footerHeight
      console.log(
        '%c [ innerHeight ]-153',
        'font-size:13px; background:pink; color:#bf2c9f;',
        height
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
      <div className={styles.content_box}>
        <div
          className={styles.video_box}
          id='video-box'
          style={
            ui_type === '3'
              ? activeIndex === data?.cover
                ? { height: `${size.height}px` }
                : { visibility: 'hidden', zIndex: -999, opacity: 0 }
              : { height: `${size.height}px` }
          }
        >
          <VideoPlayerContainer
            data={data}
            isActivity={activeIndex === data?.cover}
            playReportHandle={playReportHandle}
          />
        </div>

        {ui_type === '3' && activeIndex !== data?.cover ? (
          <div className={styles.image_box}>
            <img src={data?.image_urls[activeIndex]} alt='image' />
          </div>
        ) : (
          <></>
        )}
        <div
          id='footer_box'
          className={styles.footer_box}
          style={ui_type === '3' ? { height: '179px' } : { height: '94px' }}
        >
          {ui_type === '3' ? (
            <div className={styles.banner_box}>
              <Swiper
                onAfterInit={(swiper) => {
                  swiperRef.current = swiper
                  // 初始化事件
                }}
                slidesPerView={'auto'}
                spaceBetween={16}
                touchMoveStopPropagation={true}
              >
                <SwiperSlide key={data?.cover}>
                  <div
                    className={`${styles.swiper_slide} ${
                      activeIndex === data?.cover ? styles.swiper_active : ''
                    } `}
                    onClick={() => onImageClick(data?.cover)}
                  >
                    {/* <img
                      src={playIcon}
                      alt=''
                      className={styles.swiper_video}
                    /> */}
                    <div className={styles.play_btn}>
                      <img src={playIcon} alt='' />
                    </div>

                    <img src={data?.cover} alt='' />
                  </div>
                </SwiperSlide>

                {data?.image_urls?.map((item: any, index: number) => {
                  return (
                    <SwiperSlide key={item.key}>
                      <div
                        className={`${styles.swiper_slide} ${
                          activeIndex === index ? styles.swiper_active : ''
                        }`}
                        onClick={() => onImageClick(index)}
                      >
                        <img src={item} alt='' />
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          ) : (
            <></>
          )}
          <div className={styles.is_footer_box}>
            <div
              className='bottom-btn'
              onClick={() => {
                handleEvokeApp()
              }}
            >
              Continue Watching
              <div className='rounds'>
                <div className='finger'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
VideoImageContainer.displayName = 'VideoImageContainer'
export default VideoImageContainer
