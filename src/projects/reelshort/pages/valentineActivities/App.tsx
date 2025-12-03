import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import request from '@reelshort/utils/request'
import { useThrottleFn, useTitle, useDocumentVisibility } from 'ahooks'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
import webview from '@/utils/web-view'
import { getPageLang, setUrlParams } from '@/utils/utils'
import type { IData } from './types'
import { createVDeeplink } from '../../utils/url'
import useLogin from '@reelshort/hooks/useLogin'
import RetainPopUpsMoadl from './RetainPopUpsMoadl'
import ActivityEndModal from './ActivityEndModal'
import LowVersionModel from '@/components/LowVersionModel/LowVersionModel'

import { parse } from 'querystring'

import './App.scss'
import { LOADIPHLPAPI } from 'dns'
import { log } from 'console'

// 获取url的参数
const params = new URLSearchParams(window.location.search)
const lang = params.get('lang')

const ValentineActivitiesPage: React.FC = () => {
  const documentVisibility = useDocumentVisibility()

  const isApp = window.isApp
  const [data, setData] = useState<IData[]>([])
  const [isLoading, setLoading] = useState(false)
  const [textContent, setTextContent] = useState<any>()
  const refNav = useRef<HTMLDivElement>(null)
  const [retainPopUpsMoadlOpen, setRetainPopUpsMoadlOpen] = useState(false)
  const [activityEndModalOpen, setActivityEndModalOpen] = useState(false)
  const [lowVersionModelOpen, setLowVersionModelOpen] = useState(false)
  const [isPase, setIsPase] = useState<number>(0)

  const [appVersion, setAppVersion] = useState<number>(0)
  const cutDown = useRef(0)
  const { token } = useLogin()
  const { title, image, t_share } = textContent || {}

  useTitle(title || '')

  const getData = useCallback(
    (isFirstshow: boolean) => {
      if (token) {
        const opt = isApp ? { token } : { lang: lang || 'en' }
        const api = `/api/innerH5api/activity/getRechargeGiftIndex`
        request(api, {
          method: 'post',
          data: {
            ...opt
          }
        }).then((res) => {
          setLoading(false)
          if (res.code === 0) {
            console.log('data', res.data)
            setData(res.data.goods_ids)
            // setCutDown(res.data.count_down)
            cutDown.current = res.data.count_down
            setTextContent({
              count_down: res.data.count_down,
              ...res.data.content
            })
            if (res.data.count_down === 0) {
              setActivityEndModalOpen(true)
            }
            document.getElementById('looding')!.style.display = 'none'
            setLoading(true)
            if (isFirstshow) {
              reportSDK.clickReport({
                eventName: 'h5_activity_valentine_page_click',
                properties: {
                  _action: 'show',
                  _url: location.href,
                  lang: lang
                }
              })
            }
            setAppVersion(res.data.low_version)

            setIsPase(res.data.is_version_1_1_1)
          }
        })
      }
    },
    [token, isApp]
  )

  useEffect(() => {
    getData(true)
    sessionStorage.setItem('leaveType', 'false')
  }, [getData])

  useEffect(() => {
    // 曝光埋点
    reportSDK.clickReport({
      eventName: 'h5_activity_valentine_page_click',
      properties: {
        _action: 'loading',
        _url: location.href,
        lang: lang
      }
    })
    history.pushState(
      {
        title: '',
        url: ''
      },
      '',
      document.URL
    )
  }, [])

  useEffect(() => {
    if (refNav.current) {
      console.log('offset', refNav?.current?.offsetTop)
      isApp && stickyNav()
    }
  }, [refNav.current])

  // 自定义吸顶导航
  const stickyNav = () => {
    const nav = refNav.current
    if (!nav) return
    window.addEventListener('scroll', handleScroll)
    function handleScroll() {
      let scrollTop = 0
      if (window.pageYOffset !== undefined) {
        scrollTop = window.pageYOffset
      } else {
        scrollTop = document.documentElement.scrollTop
      }
      if (!nav) {
        return
      }
      if (scrollTop > 0) {
        nav.className = 'nav-header sticky'
      } else {
        nav.className = 'nav-header'
      }
    }
  }

  const getParams = (good: IData) => {
    const { price, gid, product_id } = good
    return !isPase
      ? [
          ['product_id', product_id],
          ['gid', String(gid)],
          ['price', price],
          ['from', 'activity_valentine'],
          ['_story_id', ''],
          ['t_book_id', ''],
          ['source', '']
        ]
      : [
          ['product_id', product_id],
          ['gid', String(gid)],
          ['price', price],
          ['from', 'activity_valentine']
        ]
  }

  const handlerBackToApp = () => {
    const leaveType = sessionStorage.getItem('leaveType')
    if (leaveType === 'false' && cutDown.current) {
      reportSDK.clickReport({
        eventName: 'h5_activity_persuade_popup',
        properties: {
          _action: 'show',
          _url: location.href,
          _page_name: 'h5_activity_valentine_page'
        }
      })
      setRetainPopUpsMoadlOpen(true)
    } else {
      webview.exec('backToApp')
      reportSDK.clickReport({
        eventName: 'h5_activity_valentine_page_click',
        properties: {
          _action: 'close',
          _url: location.href,
          lang: lang
        }
      })
    }
  }

  useEffect(() => {
    // 监听 popstate 事件,在用户进行后退操作时候触发
    window.addEventListener('popstate', (event) => {
      // 阻止默认的回退行为
      event.preventDefault()
      // 在这里添加你的拦截逻辑
      const shouldBlockGoBack = sessionStorage.getItem('leaveType')
      if (shouldBlockGoBack === 'false' && cutDown.current) {
        reportSDK.clickReport({
          eventName: 'h5_activity_persuade_popup',
          properties: {
            _action: 'show',
            _url: location.href,
            _page_name: 'h5_activity_valentine_page'
          }
        })
        setRetainPopUpsMoadlOpen(true)
      } else {
        webview.exec('backToApp')
        setRetainPopUpsMoadlOpen(false)
      }
    })
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // 页面现在被隐藏
        console.log('页面被隐藏')
        // 暂停或减缓活动以节省资源
      } else {
        // 页面现在可见
        console.log('页面可见')
        getData(false)
      }
    })
  }, [getData, cutDown])

  const { run: toPurchase } = useThrottleFn(
    (goods: IData, index: number) => {
      handleBuy(goods, index)
    },
    { wait: 1000, trailing: false }
  )
  // 购买操作
  const handleBuy = (goods: IData, index: number) => {
    if (appVersion) {
      reportSDK.clickReport({
        eventName: 'h5_upgrade_popup_click',
        properties: {
          _action: 'show',
          _url: location.href,
          app_version: localStorage?.getItem('clientVer')
        }
      })
      setLowVersionModelOpen(true)
      return
    }

    reportSDK.clickReport({
      eventName: 'h5_activity_valentine_page_click',
      properties: {
        _action: 'sku_click',
        _url: location.href,
        _app_sku: goods.gid,
        _channel_sku: goods.product_id,
        price: goods.price,
        lang: lang
      }
    })

    try {
      webview.exec('toPurchase', {
        parameter: getParams(goods),
        callback: (res: any) => {
          if (String(res.status) === '1') {
            sessionStorage.setItem('leaveType', 'true')
          }
        }
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  const bgStyle = useMemo(() => {
    if (image) {
      return {
        background: `url(${image}) no-repeat 0 0 /contain #a8184f`
      }
    }
    return {}
  }, [image])

  return (
    <>
      {/* {!isLoading && ( */}
      <div className='main'>
        <>
          {isApp && (
            <div className='nav-header' ref={refNav}>
              <div className='back' onClick={handlerBackToApp}></div>
              <div className='title'>{title}</div>
            </div>
          )}
          <div className='banner' style={bgStyle}></div>
          <div className='content_box'>
            <div className='goods'>
              <div className={`goods-list `}>
                {data.map((item, index) => {
                  return (
                    <div className='goods-item' key={index}>
                      {item.rate_tag ? (
                        <div className='extra'>
                          <span className='font'>
                            {textContent?.t_extra.replace('N', item.rate_tag)}
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div
                        className='item_left'
                        onClick={toPurchase.bind(null, item, index)}
                      ></div>
                      <div className='item_right'>
                        <div className='content'>
                          <span>{item.coins}</span> {textContent?.t_coins}{' '}
                          {item.bonus > 0 && (
                            <>
                              <span>+</span> <span>{item.bonus}</span>{' '}
                              {textContent?.t_bonus}
                            </>
                          )}
                        </div>
                        <div
                          className={'btn-buy'}
                          onClick={toPurchase.bind(null, item, index)}
                        >
                          <span className='font'>
                            <>${item.price}</>
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {isLoading && (
              <div className='rules'>
                <div className='rules-head'>
                  <div className='arrow_left'></div>
                  <div className='title'>{textContent?.t_sub_title}</div>
                  <div className='arrow_right'></div>
                </div>

                <div
                  className='rules-con'
                  dangerouslySetInnerHTML={{
                    __html: textContent?.t_sub_content?.replace(/\n/g, '<br/>')
                  }}
                ></div>
              </div>
            )}
          </div>
        </>
        <RetainPopUpsMoadl
          RetainPopUpsMoadlOpen={retainPopUpsMoadlOpen}
          onClose={() => {
            sessionStorage.setItem('leaveType', 'true')
            setRetainPopUpsMoadlOpen(false)
            reportSDK.clickReport({
              eventName: 'h5_activity_persuade_popup',
              properties: {
                _action: 'close',
                _url: location.href,
                _page_name: 'h5_activity_valentine_page'
              }
            })
          }}
          onLeave={() => {
            reportSDK.clickReport({
              eventName: 'h5_activity_valentine_page_click',
              properties: {
                _action: 'close',
                _url: location.href,
                lang: lang
              }
            })
            reportSDK.clickReport({
              eventName: 'h5_activity_persuade_popup',
              properties: {
                _action: 'leave_click',
                _url: location.href,
                _page_name: 'h5_activity_valentine_page'
              }
            })

            webview.exec('backToApp')
          }}
          textContent={textContent}
        />
        <ActivityEndModal
          ActivityEndModalOpen={activityEndModalOpen}
          textContent={textContent}
        />
        <LowVersionModel
          LowVersionModelOpen={lowVersionModelOpen}
          onClose={() => {
            setLowVersionModelOpen(false)
          }}
        />
      </div>
      {/* )} */}
    </>
  )
}

export default ValentineActivitiesPage
