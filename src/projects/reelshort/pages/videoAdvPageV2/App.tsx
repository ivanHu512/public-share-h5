/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from 'react'
import { useRequest } from 'ahooks'
import * as Sentry from '@sentry/react'
import { getRatio } from './utils/index'
import { getLocationVars, getRandomStr, getUA, getCookie } from '@/utils/utils'
import {
  reportAdInfo,
  getIp,
  getDrainageInfo
} from '@/projects/reelshort/services/webtoapp'
import './App.scss'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
import { copy, getTimeZoneAndDomain, isFBWeb } from '../../utils/urils'
import FallGroundStatic from './components/FallGroundStatic'
import Loading from '@/components/Loading'
import { getPlatform } from '../../utils/reportInfo/util'
import {
  generateW2AOneLink,
  isSnapchatWeb,
  isTwittertWeb
} from '@reelshort/utils/url'
import { getDeviceInfo } from '../../utils/w2a'

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
  image_urls: string[]
  chapter_index: number
  forbid: number // 1 禁止跳转
}

const channelMap = {
  1: 'fb',
  2: 'tt',
  3: 'gp',
  5: 'sc',
  6: 'tw',
  9: 'pin'
}

const App: React.FC = () => {
  // businessId-后台配置的id
  const {
    businessId = '64a243e65f0c0000a1007018',
    campaign_id,
    ad_id,
    adset_id,
    ttclid = '',
    ui_type = '',
    gclid = '',
    gbraid = '',
    wbraid = '',
    book_type = '1',
    ad_type = '',
    push_type = '2',
    ScCid = '', // snap点击广告携带
    twclid = '', // twitter点击携带
    epik = '' // pinterest点击携带
  }: any = getLocationVars()
  /** 控制跳转类型： 1-app跳转大厅 ->对应onelink type=1000  2-app跳转阅读器 ->对应onelink type=1001 */
  const pushType = Number(push_type)
  /** 对应域名的配置信息 */
  const domainConfig = useRef<any>({ pixel: '' })
  /** 生成初始化UID */
  const initialUid = getRandomStr(12)
  const { ios } = getUA()
  const isFBWebApp = isFBWeb()
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
    pushType,
    // 落地页id
    businessId,
    // 1-普通短剧 2-互动视频
    book_type: Number(book_type),
    // 买量测试方式
    ad_type
  })
  // 落地页信息
  const [pageData, setPageData] = useState<IPageData>()
  // 投放渠道
  const [mediaType, setMediaType] = useState<'fb' | 'tt' | 'sc' | 'tw' | 'pin'>(
    'fb'
  )

  /**
   * 生成onelink链接
   * @param type 跳转位置
   * @returns
   * ios && FB 场景下问题如下
   *  1. 延迟在0.9s以内可以正常唤起app，延迟超过0.9s唤起商店
   *  2. 发起定时之后，如果send在0.2s～0.9s内响应；仍然会出现拉起商店的情况， 所以此场景下固定0.9s跳转
   */
  const generateOnelink = (type?: 'click' | 'send') => {
    const onelink = generateW2AOneLink({
      urlQueryParams: urlQueryParams.current,
      offAfDp: true,
      mediaType
    })
    if (
      type === 'click' &&
      (isFBWebApp || isSnapchatWeb() || isTwittertWeb()) &&
      ios
    ) {
      setTimeout(() => {
        location.href = onelink
      }, 900)
    } else if (type === 'send' && !(isFBWebApp && ios)) {
      location.href = onelink
    }

    return onelink
  }
  // 轮训匹配ip
  const { run: getIpHandle, cancel } = useRequest((params) => getIp(), {
    manual: true,
    pollingInterval: 3000,
    onSuccess: async (res, params) => {
      const { time, lastIp } = params[0]
      const deviceInfo = await getDeviceInfo()
      if (res.code === 0) {
        const ip = res.data.ip
        if (time < new Date().getTime()) {
          // 停止轮询
          cancel()
        }
        if (ip !== lastIp) {
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
              wbraid,
              // snap
              sc_click_id: ScCid,
              sc_cookie1: getCookie('_scid'),
              // twitter
              twclid,
              // pinterest
              epik
            },
            lastIp: lastIp,
            ...deviceInfo
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
        cancel()
        const time = new Date().getTime() + 60 * 60 * 1000
        getIpHandle({
          lastIp: res.data.ip,
          time
        })
      }

      // 跳转前上报
      reportSDK.clickReport({
        eventName: 'h5_w2a_link_stat',
        properties: {
          _action: 'redirect',
          _story_id: urlQueryParams.current.bookId,
          _chap_id: urlQueryParams.current.chapterId || '',
          _chap_order_id: pageData?.chapter_index,
          h5_uid: uidNum,
          _url: location.href,
          pixel_id: domainConfig.current.pixel,
          campaign_id: campaign_id,
          adset_id: adset_id,
          ad_id: ad_id,
          ui_type,
          af_onelink: generateOnelink()
        }
      })
      // 非fb跳转
      generateOnelink('send')
    }
  })

  // 获取落地页信息
  const { loading } = useRequest(() => getDrainageInfo(businessId), {
    onSuccess: (res) => {
      if (res.data?.forbid > 1) {
        Sentry.captureMessage(`IP 禁止访问`, {
          contexts: {
            res: res,
            local: getTimeZoneAndDomain()
          }
        })
        return
      }
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
        } else if (_mediaType === 'sc') {
          // @ts-ignore
          snaptr('init', pixel, {
            user_email: '__INSERT_USER_EMAIL__'
          })
          // @ts-ignore
          snaptr('track', 'PAGE_VIEW')
        } else if (_mediaType === 'tw') {
          // @ts-ignore
          twq('config', pixel)
        }

        // 修改毛玻璃背景
        const styleSheets = document.styleSheets[0]
        styleSheets.insertRule(
          `.page-ctr::before {
          background: url(${res?.data?.image_urls?.[0] || res.data.cover});
        }`,
          styleSheets.cssRules.length
        )
        // 填充信息
        urlQueryParams.current = {
          ...urlQueryParams.current,
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
        reportSDK.clickReport({
          eventName: 'h5_w2a_link_stat',
          properties: {
            _action: 'show',
            _story_id: urlQueryParams.current.bookId,
            _chap_id: urlQueryParams.current.chapterId || '',
            _chap_order_id: res.data?.chapter_index,
            h5_uid: uidNum,
            _url: location.href,
            pixel_id: pixel,
            campaign_id: campaign_id,
            adset_id: adset_id,
            ad_id: ad_id,
            ui_type
          }
        })
      }
    }
  })

  // 唤起app | 跳转应用商店页
  const handleEvokeApp = async () => {
    const deviceInfo = await getDeviceInfo()
    reportSDK.clickReport({
      eventName: 'h5_w2a_link_stat',
      properties: {
        _action: 'continue_watch_click',
        _story_id: urlQueryParams.current.bookId,
        _chap_id: urlQueryParams.current.chapterId || '',
        _chap_order_id: pageData?.chapter_index,
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
        wbraid,
        // snap
        sc_click_id: ScCid,
        sc_cookie1: getCookie('_scid'),
        // twitter
        twclid,
        // pinterest
        epik
      },
      ...deviceInfo
    })
    // fb内做延迟跳转
    generateOnelink('click')
  }

  useEffect(() => {
    reportSDK.clickReport({
      eventName: 'h5_w2a_link_stat',
      properties: {
        _action: 'loading',
        _story_id: urlQueryParams.current.bookId,
        _chap_id: urlQueryParams.current.chapterId || '',
        _chap_order_id: pageData?.chapter_index,
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

  // twitter 有半屏广告，需要滑动
  const isDisabledTouch = () => {
    const platform = getPlatform()
    return platform === 'ios' && !isTwittertWeb()
  }

  if (loading) {
    return (
      <Loading
        style={{ fontSize: 40, lineHeight: '100vh', textAlign: 'center' }}
      />
    )
  }
  if (!pageData) return <div className='page-ctr' />

  return (
    <div
      className='page-ctr'
      style={{ touchAction: isDisabledTouch() ? 'none' : '' }}
    >
      <div className='page'>
        {pageData && <FallGroundStatic data={pageData} />}
        {pageData && (
          <div
            className='bottom-btn'
            onClick={() => {
              handleEvokeApp()
            }}
          >
            <span>Continue Watching</span>
            <div className='finger'></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
