/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react'
import { useRequest } from 'ahooks'
import { Toast } from 'antd-mobile'
import { getRatio } from './utils/index'
import 'swiper/swiper.scss'

import {
  getLocationVars,
  converUrlParamsObj,
  getRandomStr,
  getUA,
  getCookie,
  getEnv
} from '@/utils/utils'
import {
  reportAdInfo,
  getIp,
  getDrainageInfo
} from '@/projects/reelshort/services/webtoapp'
import VideoImageContainer from './components/videoImageContainer'
import './App.scss'
import logo from './assets/logo.png'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
import { getDomainConfig } from '@reelshort/utils/pixel'
import { copy, isFBWeb } from '../../utils/urils'
import FallGroundStatic from './components/FallGroundStatic'
import Loading from '@/components/Loading'
import { log } from 'console'

interface IPageData {
  page_type: 1 | 2 | 3 | 4
  book_id: string
  cover: string
  title: string
  desc: string
  channel: 1 | 2 | 3 // 1=FB 2=Tiktok 3=Google
  drainage_id: string
  chapter_id: string
  pixel: string
}

const channelMap = {
  1: 'fb',
  2: 'tt',
  3: 'gp'
}

const App: React.FC = () => {
  // businessId-后台配置的id
  const {
    businessId = '64a3e325350e000040001eb5',
    chapterIndex,
    campaign_id,
    ad_id,
    adset_id,
    ttclid = '',
    ui_type = '',
    gclid = '',
    gbraid = '',
    wbraid = ''
  }: any = getLocationVars()
  /** 对应域名的配置信息 */
  const domainConfig = useRef<any>({ pixel: '' })
  const { ios, android } = getUA()
  const timeRef = React.useRef<any>()
  /** 生成初始化UID */
  const initialUid = getRandomStr(12)
  const uidNum =
    localStorage?.getItem('uidNum') || initialUid + new Date().getTime()
  localStorage.setItem('uidNum', `${uidNum}`)
  // 传递给客户端信息
  const urlQueryParams = React.useRef<any>({
    bookId: '',
    // 具体章节id
    chapterId: '',
    uid: uidNum,
    scheme: 'cmsvictor',
    // 与客户端约定好，该变量用于判断当前唤起app是通过H5中的剪切板和schemeURL
    isFromH5: 2,
    // 1-app跳转大厅，2-app跳转阅读器
    pushType: 2,
    // 落地页id
    businessId
  })
  // 落地页信息
  const [pageData, setPageData] = useState<IPageData>()
  // 投放渠道
  const [mediaType, setMediaType] = useState<'fb' | 'tt'>('fb')
  // 轮训匹配ip
  const { run: getIpHandle } = useRequest(() => getIp(), {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 0) {
        const ip = res.data.ip
        const serverIp = localStorage.getItem('serverIp') || '_'
        const arr = serverIp.split('_')
        if (Number(arr[1]) < new Date().getTime()) {
          clearInterval(timeRef.current)
        }

        if (ip !== arr[0]) {
          // const { pixel } = getDomainConfig()
          reportHandl({
            visitorId: uidNum,
            href: location.href,
            referrer: document?.referrer,
            goto: JSON.stringify(urlQueryParams.current),
            arg: {
              media_type: mediaType,
              pixelid: domainConfig.current.pixel,
              // fb
              _fbc: getCookie('_fbc'),
              _fbp: getCookie('_fbp'),
              // tt
              ttclid,
              ttp: getCookie('_ttp'),
              // gg
              gclid,
              gbraid,
              wbraid
            },
            lastIp: arr[0],
            did: {
              w: Math.floor((window.screen.width * getRatio()) / 100),
              h: Math.floor((window.screen.height * getRatio()) / 100)
            },
            ua: navigator.userAgent
          })
        }
      }
    }
  })
  // 自研匹配
  const { run: reportHandl } = useRequest((data) => reportAdInfo(data), {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 0) {
        // 存下当前ip
        localStorage.setItem(
          'serverIp',
          res.data.ip + '_' + (new Date().getTime() + 60 * 60 * 1000)
        )
        if (timeRef.current) {
          clearInterval(timeRef.current)
        }
        timeRef.current = setInterval(() => {
          getIpHandle()
        }, 3000)
      }

      console.log(
        '%c [ 请求结束跳转 ]-110',
        'font-size:13px; background:pink; color:#bf2c9f;'
      )
      // 跳转前上报
      reportSDK.clickReport({
        eventName: 'h5_w2a_link_stat',
        properties: {
          _action: 'redirect',
          _story_id: urlQueryParams.current.bookId,
          _chap_id: urlQueryParams.current.chapterId || '',
          _chap_order_id: Number(chapterIndex) || 1,
          h5_uid: uidNum,
          _url: location.href,
          pixel_id: domainConfig.current.pixel,
          campaign_id: campaign_id,
          adset_id: adset_id,
          ad_id: ad_id,
          ui_type
        }
      })
      generateOneLink()
    }
  })

  // 获取落地页信息
  const { loading } = useRequest(() => getDrainageInfo(businessId), {
    onSuccess: (res) => {
      if (res.code === 0) {
        console.log(
          '%c [  ]-147',
          'font-size:13px; background:pink; color:#bf2c9f;',
          res.data
        )
        setPageData(res.data)
        // @ts-ignore
        const _mediaType = channelMap[res.data.channel]
        setMediaType(_mediaType)
        const pixel = res.data.pixel
        // 设置pixel
        domainConfig.current.pixel = pixel
        if (_mediaType === 'fb') {
          // FB像素追踪上报
          // @ts-ignore
          fbq('init', pixel)
          // @ts-ignore
          fbq('track', 'PageView')
          document!.querySelector(
            'noscript'
          )!.innerHTML = `https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`
        } else if (_mediaType === 'tt') {
          // TT像素像素追踪
          // @ts-ignore
          ttq.load(pixel)
          // @ts-ignore
          ttq.page()
        }
        reportSDK.clickReport({
          eventName: 'h5_w2a_link_stat',
          properties: {
            _action: 'show',
            _story_id: urlQueryParams.current.bookId,
            _chap_id: urlQueryParams.current.chapterId || '',
            _chap_order_id: Number(chapterIndex) || 1,
            h5_uid: uidNum,
            _url: location.href,
            pixel_id: pixel,
            campaign_id: campaign_id,
            adset_id: adset_id,
            ad_id: ad_id,
            ui_type
          }
        })

        // 修改毛玻璃背景
        const styleSheets = document.styleSheets[0]
        styleSheets.insertRule(
          `.page-ctr::before {
          background: url(${res.data.cover});
        }`,
          styleSheets.cssRules.length
        )
        // 填充信息
        urlQueryParams.current = {
          bookId: res.data.book_id,
          // 具体章节id
          chapterId: res.data.chapter_id,
          uid: uidNum,
          scheme: 'cmsvictor',
          // 与客户端约定好，该变量用于判断当前唤起app是通过H5中的剪切板和schemeURL
          isFromH5: 2,
          // 1-app跳转大厅，2-app跳转阅读器
          pushType: 2,
          businessId
        }
      }
    }
  })
  /** 生成onelink长链接 */
  const generateOneLink = () => {
    // 实例链接 ： 'https://realshortapp.onelink.me/Zof7?af_xp=custom&pid=fb-w2a-h5&c=RS-W2A-H5&deep_link_value=cmsvictor://?type=1001&parm1=60f5788188b0907fee389859&contentType=1&chapterId=5&af_dp=cmsvictor://'
    const downLoadUrlDic = {
      googlePlay:
        'https://play.google.com/store/apps/details?id=com.newleaf.app.android.victor'
    }
    let link = ''
    const isFb = isFBWeb()
    const dl = `&af_dp=${encodeURIComponent(
      `cmsvictor://?fromType=4&type=1001&parm1=${urlQueryParams.current.bookId}&contentType=1&chapterId=${urlQueryParams.current.chapterId}`
    )}`
    const onelink = `https://realshortapp.onelink.me/Zof7?af_xp=custom&pid=fb-w2a-h5&c=RS-W2A-H5&deep_link_value=${encodeURIComponent(
      `cmsvictor://?fromType=4&type=1001&parm1=${urlQueryParams.current.bookId}&contentType=1&chapterId=${urlQueryParams.current.chapterId}`
    )}`
    if (isFb) {
      if (ios) {
        link = onelink
      } else {
        link = `https://play.app.goo.gl/?link=${downLoadUrlDic.googlePlay}`
      }
    } else {
      link = onelink + dl
    }
    console.log(
      '%c [ link ]-197',
      'font-size:13px; background:pink; color:#bf2c9f;',
      link
    )

    window.location.href = link
  }

  /** 视频开始播放上报 */
  const playReportHandle = () => {
    reportSDK.clickReport({
      eventName: 'h5_w2a_link_stat',
      properties: {
        _action: 'video_play',
        _story_id: urlQueryParams.current.bookId,
        _chap_id: urlQueryParams.current.chapterId || '',
        _chap_order_id: Number(chapterIndex) || 1,
        h5_uid: uidNum,
        _url: location.href,
        pixel_id: domainConfig.current.pixel,
        campaign_id: campaign_id,
        adset_id: adset_id,
        ad_id: ad_id,
        ui_type
      }
    })
  }

  // 唤起app | 跳转应用商店页
  const handleEvokeApp = () => {
    reportSDK.clickReport({
      eventName: 'h5_w2a_link_stat',
      properties: {
        _action: 'continue_watch_click',
        _story_id: urlQueryParams.current.bookId,
        _chap_id: urlQueryParams.current.chapterId || '',
        _chap_order_id: Number(chapterIndex) || 1,
        h5_uid: uidNum,
        _url: location.href,
        pixel_id: domainConfig.current.pixel,
        campaign_id: campaign_id,
        adset_id: adset_id,
        ad_id: ad_id,
        ui_type
      }
    })
    copy(JSON.stringify(urlQueryParams.current))
    reportHandl({
      visitorId: uidNum,
      href: location.href,
      referrer: document?.referrer,
      goto: JSON.stringify(urlQueryParams.current),
      arg: {
        media_type: mediaType,
        pixelid: domainConfig.current.pixel,
        // fb
        _fbc: getCookie('_fbc'),
        _fbp: getCookie('_fbp'),
        // tt
        ttclid,
        ttp: getCookie('_ttp'),
        // gg
        gclid,
        gbraid,
        wbraid
      },
      did: {
        w: Math.floor((window.screen.width * getRatio()) / 100),
        h: Math.floor((window.screen.height * getRatio()) / 100)
      },
      ua: navigator.userAgent
    })
  }

  useEffect(() => {
    reportSDK.clickReport({
      eventName: 'h5_w2a_link_stat',
      properties: {
        _action: 'loading',
        _story_id: urlQueryParams.current.bookId,
        _chap_id: urlQueryParams.current.chapterId || '',
        _chap_order_id: Number(chapterIndex) || 1,
        h5_uid: uidNum,
        _url: location.href,
        pixel_id: domainConfig.current.pixel,
        campaign_id: campaign_id,
        adset_id: adset_id,
        ad_id: ad_id,
        ui_type
      }
    })
  }, [])

  useEffect(() => {
    console.log('[ ui_type ] >', ui_type)
    if (ui_type !== '4') {
      const body = document.body.style
      body.position = 'fixed'
      body.top = '0'
      body.left = '0'
      body.width = '100%'
      body.zIndex = '99999'
    }
  }, [ui_type])

  if (loading) {
    return (
      <Loading
        style={{ fontSize: 40, lineHeight: '100vh', textAlign: 'center' }}
      />
    )
  }

  return (
    <div
      className='page-ctr'
      style={ui_type !== '4' ? { height: '100vh' } : { height: '' }}
    >
      {/* <button
        onClick={() => {
          // TODO: 测试
          handleEvokeApp()
        }}
      >
        点击跳转
      </button> */}
      {ui_type === '4' && (
        <>
          <FallGroundStatic data={pageData} />{' '}
          <div className='is_footer'>
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
        </>
      )}
      {(ui_type === '3' || ui_type === '2') && (
        <>
          <VideoImageContainer
            data={pageData}
            handleEvokeApp={handleEvokeApp}
            ui_type={ui_type}
            playReportHandle={playReportHandle}
          />
          {/* <Arrow data={pageData} /> */}
        </>
      )}
      {/* <div className='store'>
        <img src={ios ? app_store : google_play} />
      </div> */}
    </div>
  )
}

export default App
