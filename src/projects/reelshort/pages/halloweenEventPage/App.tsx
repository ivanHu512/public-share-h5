import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import request from '@reelshort/utils/request'
import { useThrottleFn, useTitle } from 'ahooks'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
import webview from '@/utils/web-view'
import { getPageQuery, setUrlParams } from '@/utils/utils'
import type { IData } from './types'
import { createVDeeplink } from '../../utils/url'
import useLogin from '@reelshort/hooks/useLogin'

import './App.scss'

const openLink = createVDeeplink({
  fromType: 5,
  parm1: '',
  chapterId: '',
  type: 1000
})

const { lang } = getPageQuery()

const HalloweenEventPage: React.FC = () => {
  const isApp = window.isApp
  const [data, setData] = useState<IData[]>([])
  const [isLoading, setLoading] = useState(true)
  const [textContent, setTextContent] = useState<any>()
  // 默认展开
  const [expand, setExpand] = useState<boolean>(true)
  const refNav = useRef<HTMLDivElement>(null)
  const { token } = useLogin()

  const { title, image, t_share } = textContent || {}

  useTitle(title || '')

  useEffect(() => {
    if (token) {
      const opt = isApp ? { token } : { lang: lang || 'en' }
      const api = `/api/${
        isApp ? 'innerH5api' : 'outerH5api'
      }/activity/getRechargeGiftIndex`
      request(api, {
        method: 'post',
        data: {
          ...opt
        }
      }).then((res) => {
        setLoading(false)
        if (res.code === 0) {
          console.log('data', res.data)
          if (res.data.goods_ids.length > 3) {
            setExpand(false)
          }
          setData(res.data.goods_ids)
          setTextContent(res.data.content)
        }
      })
    }
  }, [token, isApp])

  useEffect(() => {
    // 曝光埋点
    reportSDK.clickReport({
      eventName: 'h5_activity_halloween_page_click',
      properties: {
        _action: 'show',
        _url: location.href
      }
    })
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

  const handleStatusChange = (id: number, newStatus: number) => {
    const updatedData = [...data]
    const itemToUpdate = updatedData.find((item) => item.gid === id)
    if (itemToUpdate) {
      itemToUpdate.status = newStatus
      setData(updatedData)
    }
  }

  const getParams = (good: IData) => {
    const { price, gid, product_id } = good
    return [
      ['product_id', product_id],
      ['gid', String(gid)],
      ['price', price],
      ['from', 'activity_halloween']
    ]
  }

  const handleShare = useCallback(() => {
    const url = setUrlParams({ lang: localStorage?.getItem('lang') || 'en' })
    console.log(t_share, url)
    reportSDK.clickReport({
      eventName: 'h5_activity_halloween_page_click',
      properties: {
        _action: 'share_click',
        _url: location.href
      }
    })
    webview.exec('toShare', {
      parameter: [
        ['title', t_share],
        ['shareUrl', url]
      ],
      callback: (res) => {
        console.log(res)
      }
    })
  }, [t_share])

  const handlerBackToApp = () => {
    webview.exec('backToApp')
  }

  const { run: toPurchase } = useThrottleFn(
    (goods: IData, index: number) => {
      handleBuy(goods, index)
    },
    { wait: 1000, trailing: false }
  )
  const handleBuy = (goods: IData, index: number) => {
    if (!isApp) {
      location.href = openLink
      return
    }
    if (goods.status === 0) {
      return
    }
    reportSDK.clickReport({
      eventName: 'h5_activity_halloween_page_click',
      properties: {
        _action: 'sku_click',
        _url: location.href,
        _app_sku: goods.gid,
        _channel_sku: goods.product_id,
        sku_rank: index + 1
      }
    })

    try {
      webview.exec('toPurchase', {
        parameter: getParams(goods),
        callback: (res: any) => {
          if (String(res.status) === '1') {
            handleStatusChange(goods.gid, 0)
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
        background: `url(${image}) no-repeat 0 0 /contain #000`
      }
    }
    return {}
  }, [image])

  return (
    <div className='main' style={bgStyle}>
      {isLoading ? (
        <div className='loading'></div>
      ) : (
        <>
          {isApp && (
            <div className='nav-header' ref={refNav}>
              <div className='back' onClick={handlerBackToApp}></div>
              <div className='title'>{title}</div>
              <div className='share' onClick={handleShare}></div>
            </div>
          )}
          <div className='banner'>
            {/* <div className='title'>HALLOWEEN PUMPKIN PALOOZA</div>
        <div className='text-bouns'>200% BOUNS</div>
        <div className='desc'>
          Discover ultimate frightful fun with The Great Pumpkin Hunt!
        </div>
        <div className='text'>Pick up your pumpkin lantern</div> */}
          </div>
          <div className='goods'>
            <div className={`goods-list ${expand ? 'expand' : ''}`}>
              {data.map((item, index) => {
                return (
                  <div className='goods-item' key={index}>
                    {item.rate_tag && (
                      <div className='extra'>
                        <span className='font'>
                          {textContent?.t_extra.replace('N', item.rate_tag)}
                        </span>
                      </div>
                    )}
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
                      className={`btn-buy ${
                        item.status === 0 ? 'purchased' : ''
                      }`}
                      onClick={toPurchase.bind(null, item, index)}
                    >
                      <span className='font'>
                        {item.status === 0 ? (
                          <>{textContent?.t_purchase}</>
                        ) : (
                          <>${item.price}</>
                        )}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            {!expand && (
              <div
                className='btn-expand'
                onClick={() => {
                  setExpand(true)
                }}
              ></div>
            )}
          </div>
          <div className='rules'>
            <div className='rules-head'>
              <div className='title'>{textContent?.t_sub_title}</div>
            </div>

            <div
              className='rules-con'
              dangerouslySetInnerHTML={{
                __html: textContent?.t_sub_content?.replace(/\n/g, '<br/>')
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  )
}

export default HalloweenEventPage
