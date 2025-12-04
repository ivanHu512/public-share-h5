/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef } from 'react'
import { useRequest } from 'ahooks'
import { Toast } from 'antd-mobile'
import * as Sentry from '@sentry/react'
import { getRatio } from './utils/index'
import {
  getLocationVars,
  converUrlParamsObj,
  getRandomStr,
  getUA,
  getCookie
} from '@/utils/utils'
import { reportAdInfo, getIp } from '@/projects/reelshort/services/webtoapp'
import './App.scss'
import app_store from './assets/app_store.png'
import logo from './assets/logo.png'
import google_play from './assets/google_play.png'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
import { getDomainConfig } from './utils'
import { getTimeZoneAndDomain, isFBWeb } from '../../utils/urils'
import { generateW2AOneLink } from '@reelshort/utils/url'
import { checkAdParams, getDeviceInfo } from '../../utils/w2a'

const App: React.FC = () => {
  // book_id-书籍id chapterId-章节id
  const {
    book_id,
    chapterId,
    chapterIndex,
    campaign_id,
    ad_id,
    adset_id,
    mediaType = 'fb',
    ttclid = '',
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
  /** 上报order_id */
  const _chap_order_id = chapterIndex ? Number(chapterIndex) : ''
  /** 控制跳转类型： 1-app跳转大厅 ->对应onelink type=1000  2-app跳转阅读器 ->对应onelink type=1001 */
  const pushType = Number(push_type)
  /** 对应域名的配置信息 */
  const domainConfig = useRef<any>({ pixel: '' })
  const { ios, android } = getUA()
  /** 生成初始化UID */
  const initialUid = getRandomStr(12)
  const uidNum =
    localStorage?.getItem('uidNum') || initialUid + new Date().getTime()
  localStorage.setItem('uidNum', `${uidNum}`)
  // 上报信息
  const urlQueryParams = {
    bookId: book_id || '',
    // 不指定章节 - 0 | 指定章节 - 具体章节id
    chapterId: chapterId || '',
    uid: uidNum,
    scheme: 'cmsvictor',
    // 与客户端约定好，该变量用于判断当前唤起app是通过H5中的剪切板和schemeURL
    isFromH5: 2,
    // 1-app跳转大厅，2-app跳转阅读器
    pushType,
    // 1-普通短剧 2-互动视频
    book_type: Number(book_type),
    // 买量测试方式
    ad_type
  }

  /** 补充上报事件 */
  const modifyReport = (data: any, params: any) => {
    reportAdInfo({
      ...data,
      repair: 1,
      arg: {
        ...data.arg,
        ...params
      }
    })
      .then((res) => {
        if (res.data?.forbid > 0) return
        // 倒计时清0表示已经跳转
        if (window.countdownRef !== 0) {
          // location.href = generateW2AOneLink({ urlQueryParams, mediaType })
        }
      })
      .catch(() => {
        setTimeout(() => {
          if (window.reportRetry < 4) {
            modifyReport(data, params)
            window.reportRetry++
          }
        }, 1000)
        // 倒计时清0表示已经跳转
        if (window.countdownRef !== 0) {
          console.log('补充上报4次请求异常跳转')
          Sentry.captureMessage(`补充上报4次请求异常跳转`, {
            contexts: {
              local: getTimeZoneAndDomain()
            }
          })
          window.countdownRef = 0
          // location.href = generateW2AOneLink({ urlQueryParams, mediaType })
        }
      })
  }

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
          // 停止轮询
          cancel()
          const { pixel } = getDomainConfig()
          reportHandl({
            visitorId: uidNum,
            href: location.href,
            referrer: document?.referrer,
            goto: JSON.stringify(urlQueryParams),
            arg: {
              media_type: mediaType,
              pixelid: pixel,
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
  const { run: reportHandl } = useRequest(
    (data) => {
      checkAdParams({
        mediaType,
        success: () => {
          window.countdownRef = 0
        },
        callback: (params: any) => {
          // 不允许下面倒计时结束跳转防止send请求中断
          window.notAllowW2AJump = true
          // 初始化重试次数
          window.reportRetry = 0
          modifyReport(data, params)
        }
      })
      return reportAdInfo(data)
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res.data?.forbid > 0) {
          Sentry.captureMessage(`IP 禁止访问`, {
            contexts: {
              res: res.data,
              local: getTimeZoneAndDomain()
            }
          })
          return
        }
        if (res.code === 0) {
          cancel()
          const time = new Date().getTime() + 60 * 60 * 1000
          getIpHandle({
            lastIp: res.data.ip,
            time
          })
        }

        const onelink = generateW2AOneLink({
          offAfDp: true,
          urlQueryParams: urlQueryParams,
          mediaType
        })
        // 测试直接跳转
        // 跳转前上报
        reportSDK.clickReport({
          eventName: 'h5_w2a_link_stat',
          properties: {
            _action: 'redirect',
            _story_id: urlQueryParams.bookId,
            _chap_id: urlQueryParams.chapterId || '',
            _chap_order_id: _chap_order_id,
            h5_uid: uidNum,
            _url: location.href,
            pixel_id: domainConfig.current.pixel,
            campaign_id: campaign_id,
            adset_id: adset_id,
            ad_id: ad_id,
            ui_type: 6,
            af_onelink: onelink
          }
        })
        // 为了解决接口响应过快导致_fbp和_fbc无法获取问题, sc_cookie1无法获取问题
        // 判断如果未到允许跳转的时间则定时跳转，否则直接跳转
        if (window.countdownRef - Date.now() > 0) {
          setTimeout(() => {
            // 若上面重新发起补报请求则取消本次跳转
            if (!window.notAllowW2AJump) {
              // 跳转前清空倒计时
              window.countdownRef = 0
              // window.location.href = onelink
            }
          }, window.countdownRef - Date.now())
        } else {
          // 跳转前清空倒计时
          window.countdownRef = 0
          // window.location.href = onelink
        }
      }
    }
  )

  // 唤起app | 跳转应用商店页
  const handleEvokeApp = async (pixel: string) => {
    const deviceInfo = await getDeviceInfo()

    // 微信
    const u = navigator.userAgent
    if (/MicroMessenger/gi.test(u)) {
      // 引导用户在浏览器中打开
      Toast.info('请在浏览器中打开')

      return
    } else {
      // 允许跳转onelink时间戳
      window.countdownRef = Date.now() + 600
      reportHandl({
        visitorId: uidNum,
        href: location.href,
        referrer: document?.referrer,
        goto: JSON.stringify(urlQueryParams),
        arg: {
          media_type: mediaType,
          pixelid: pixel,
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
        ...deviceInfo,
        ...getTimeZoneAndDomain()
      })
    }
  }

  useEffect(() => {
    // pixel处理
    const { pixel } = getDomainConfig()
    domainConfig.current.pixel = pixel
    if (mediaType === 'fb') {
      // FB像素追踪上报
      // @ts-ignore
      fbq('init', pixel)
      // @ts-ignore
      fbq('track', 'PageView')
      document!.querySelector(
        'noscript'
      )!.innerHTML = `https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1`
    } else if (mediaType === 'tt') {
      // @ts-ignore
      ttq.load(pixel)
      // @ts-ignore
      ttq.page()
    } else if (mediaType === 'sc') {
      // @ts-ignore
      snaptr('init', pixel, {
        user_email: '__INSERT_USER_EMAIL__'
      })
      // @ts-ignore
      snaptr('track', 'PAGE_VIEW')
    } else if (mediaType === 'tw') {
      // @ts-ignore
      twq('config', pixel)
    }
    reportSDK.clickReport({
      eventName: 'h5_w2a_link_stat',
      properties: {
        _action: 'show',
        _story_id: urlQueryParams.bookId,
        _chap_id: urlQueryParams.chapterId || '',
        _chap_order_id: _chap_order_id,
        h5_uid: uidNum,
        _url: location.href,
        pixel_id: pixel,
        campaign_id: campaign_id,
        adset_id: adset_id,
        ad_id: ad_id,
        ui_type: 6
      }
    })
    handleEvokeApp(pixel)
  }, [])

  // if (!urlQueryParams.bookId)
  //   return <div className='error-tip'>Missing required parameters</div>

  return (
    <div className='page-ctr'>
      {/* <div className='logo_box'>
        <img src={logo} />
        <p>ReelShort</p>
      </div>

      <div className='store'>
        <img src={ios ? app_store : google_play} />
      </div> */}
    </div>
  )
}

export default App
