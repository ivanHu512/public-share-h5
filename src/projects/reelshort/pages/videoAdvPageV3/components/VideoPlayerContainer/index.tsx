import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import MyVePlayer from '@/projects/reelshort/public/index.min.js'
import '@/projects/reelshort/public/index.min.css'
import './styles.scss'
import { getEnv } from '@/utils/utils'
import muted_icon from '../../assets/muted_icon.png'
import unmuted_icon from '../../assets/unmuted_icon.png'
import play_icon from '../../assets/play_icon.png'
import classNames from 'classnames'
import Arrow from '../Arrow'

/**
 * @component PC播放器
 * @param props
 * @returns
 */
const VideoPlayerContainer = (props: any) => {
  const { data, isActivity, playReportHandle } = props
  /** 播放器dom */
  const videoRef = useRef<any>()
  /** 播放器实例 */
  const playerSdk = useRef<any>()
  /** 静音状态 */
  const [isMute, setInMute] = useState(true)
  /** 是否结束 */
  const [isEnd, setEnd] = useState(false)
  /** 播放状态 */
  const [isPlay, setIsPlay] = useState(false)
  /** 播放器大小 */
  const [size, setSize] = useState({
    width: 540,
    height: 950
  })
  // 存储章节详情
  const detailDataRef = useRef<any>()

  /** 结束事件 */
  const endedHandle = () => {
    console.log(
      '%c [ 播放完了 ]-40',
      'font-size:13px; background:pink; color:#bf2c9f;'
    )
    playerSdk.current.player.pause()
    setEnd(true)
  }

  // 视频宽高比 540*960
  /** 播放器初始化函数  */
  const initHandle = (data: any) => {
    /** 初始化配置 */
    const config: any = {
      url: `https://dev-v-mps.crazymaplestudios.com/vod-112d8b/c9023040a84f71edbfcc87c7361c0102/23d796323b9d473cb7ef7cc89802135c-2e5b48b35237213e4bafef865cade0cc-ld.m3u8`,
      id: `video_pc`,
      pip: false,
      closeVideoStopPropagation: true,
      streamType: 'hls',
      lang: 'en',
      autoplayMuted: true,
      fullscreen: false,
      volume: false,
      autoplay: true,
      PlaybackRateMobilePlugin: false,
      playbackRate: false,
      ignores: ['playbackRate', 'pip'],
      sdkErrorPlugin: {
        errorTipsText: {
          en:
            'Network connection unavailable. Please check your network status.'
        }
      },
      controls: false,
      ...data
    }

    // 生产环境禁止使用EncryptHlsPlugin
    if (getEnv() !== 'dev') delete config.EncryptHlsPlugin

    playerSdk.current = new MyVePlayer(config)
    /** 播放器准备完成 */
    playerSdk.current!.on('player_create_finish', () => {
      console.log(
        '%c [ 开始播放 ]-74',
        'font-size:13px; background:pink; color:#bf2c9f;'
      )
    })
    /** 视频内容开始加载 */
    playerSdk.current!.on('loadstart', () => {
      console.timeEnd('myFunc')
      playerSdk.current?.player.play()
    })

    /** 播放事件 */
    playerSdk.current!.on('play', () => {
      console.log(
        '%c [ b-播放 ]-147',
        'font-size:13px; background:pink; color:#bf2c9f;',
        playerSdk.current?.player.play
      )
      // 播放事件埋点
    })

    /** 暂停事件 */
    playerSdk.current!.on('pause', () => {
      console.log(
        '%c [ 测试-这里暂停了 ]-207',
        'font-size:13px; background:red; color:#bf2c9f;'
      )
      const process =
        detailDataRef.current?.is_lock === 1
          ? 0
          : Math.ceil(
              (playerSdk.current!.player._currentTime /
                detailDataRef.current?.duration) *
                100
            )
    })

    /** 视频起播数据加载完成 */
    playerSdk.current!.on('loadeddata', () => {
      playReportHandle()
    })
    playerSdk.current!.on('error', (error: any) => {
      console.log(
        '%c [ error ]-144',
        'font-size:13px; background:pink; color:#bf2c9f;',
        error
      )
    })
    playerSdk.current?.on('ended', () => {
      console.log(
        '%c [ 播放完了 ]-135',
        'font-size:13px; background:pink; color:#bf2c9f;'
      )
      playerSdk.current.player.pause()
      setEnd(true)
    })
  }

  // useEffect(() => {
  //   if (playerSdk.current) {
  //     /** 结束时间 */
  //     playerSdk.current?.on('ended', () => {
  //       console.log(
  //         '%c [ 播放完了 ]-135',
  //         'font-size:13px; background:pink; color:#bf2c9f;'
  //       )
  //     })
  //   }
  //   return () => {
  //     playerSdk.current?.off('ended', endedHandle)
  //   }
  // }, [])

  useEffect(() => {
    if (isActivity) {
      setEnd(false)
      if (!playerSdk.current && data) {
        initHandle({
          url: data.video_url,
          streamType: data.video_url.includes('mp4') ? 'mp4' : 'hls'
        })
      } else {
        playerSdk.current?.player.replay()
      }
    } else {
      playerSdk.current?.player.pause()
    }
  }, [data, isActivity])

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
        height: height,
        width: Math.floor((540 / 950) * height) - 3
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='video_container'>
      <div
        className={classNames('mute_module', {
          un_mute_module: !isMute
        })}
        onClick={() => {
          if (playerSdk.current?.player?.muted) {
            setInMute(false)
            playerSdk.current.player.muted = false
          } else {
            setInMute(true)
            playerSdk.current.player.muted = true
          }
        }}
      >
        {isMute ? <span>Click here to unmute</span> : null}
        <img src={isMute ? muted_icon : unmuted_icon} />
      </div>
      {/* <div className='play_button'>
        <img src={play_icon} />
      </div> */}
      <div
        onClick={() => {
          console.log(
            '%c [ playerSdk.current ]-153',
            'font-size:13px; background:pink; color:#bf2c9f;',
            playerSdk.current
          )

          if (playerSdk.current?.player?.play) {
            playerSdk.current?.player?.pause()
            setIsPlay(false)
          } else {
            playerSdk.current?.player?.play()
            setIsPlay(true)
          }
        }}
        id='video_pc'
        style={{
          width: size.width,
          height: size.height,
          background: '#000',
          position: 'relative',
          margin: '0 auto'
        }}
      ></div>
      {isEnd ? <Arrow data={data} /> : null}
    </div>
  )
}
VideoPlayerContainer.displayName = 'VideoPlayerContainer'
export default VideoPlayerContainer
