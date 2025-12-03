import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import request from '@reelshort/utils/request'
import { useThrottleFn, useTitle } from 'ahooks'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
import webview from '@/utils/web-view'
import { getPageQuery, setUrlParams } from '@/utils/utils'
import type { IData } from './types'
import { createVDeeplink } from '../../utils/url'
import useLogin from '@reelshort/hooks/useLogin'
import CountdownTimer from './CountdownTimer'
import BuySusscess from './BuySusscess'
import LowVersionModel from '@/components/LowVersionModel/LowVersionModel'

import './App.scss'
import { log } from 'console'

const openLink = createVDeeplink({
  fromType: 5,
  parm1: '',
  chapterId: '',
  type: 1000
})

const { lang } = getPageQuery()

const BlabkFridayPage: React.FC = () => {
  const isApp = window.isApp
  const [data, setData] = useState<any>({})
  const [isLoading, setLoading] = useState(false)
  const goodsNoBuyRef = useRef<any>()
  const { token } = useLogin()
  const [buySuccessGoods, setBuySuccessGoods] = useState<IData>()
  const [buySusscessModelOpen, setBuySusscessModelOpen] = useState(false)
  const [lowVersionModelOpen, setLowVersionModelOpen] = useState(false)

  const BuyRef = useRef<any>()

  const getGoodsData = useCallback(() => {
    const opt = { token }
    const api = `/api/innerH5api/activity/getRentBuyList`
    request(api, {
      method: 'post',
      data: {
        ...opt
        // token:
        //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGV2LXByb2plY3Qtdi1hcGkuc3RhcmR1c3R3b3JsZC5jblwvYXBpXC9hdXRoXC9pbm5lckg1bG9naW4iLCJpYXQiOjE2OTk4NDMyNTMsImV4cCI6MTczMTM3OTI1MywibmJmIjoxNjk5ODQzMjUzLCJqdGkiOiJuR2JPT0RyWnAxM2NSdTVvIiwic3ViIjoiNjU0ZGYxODQ1NGY5NWJmZWY3MDkzMjEwIiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsInVpZCI6OTk4OTA3OTIsImNoYW5uZWxJZCI6IkFWRzEwMDAzIiwiY2xpZW50VmVyIjoiMS4yLjAwIiwiZGV2SWQiOiJmY2FhMTNmZTAwODc4OTI0IiwiZGV2TW9kZWwiOiJLT1otQUwwMCIsImxhbmciOiJlbiIsImFwaVZlcnNpb24iOiIxLjEuMiIsInNlc3NTaWduIjoiZDk2NTE0OTQ3YzcyMjMwZTdkZTE0YTU5OTE4YzNkZTEiLCJ0aW1lIjoxNjk5ODQzMjUzfQ.22TSnoGDHsTbpk8_S_iLKCCXYRxdV53WabRbCmOU6eY'
      }
    }).then((res) => {
      setLoading(false)
      if (res.code === 6200002) {
        setData(res)
        setLoading(true)
        document.getElementById('looding')!.style.display = 'none'
      }
      if (res.code === 0) {
        console.log('data', res.data)
        setData(res)
        setLoading(true)
        document.getElementById('looding')!.style.display = 'none'
        reportSDK.clickReport({
          eventName: 'h5_activity_black5_page_click',
          properties: {
            _action: 'show',
            _url: location.href
          }
        })
      }
    })
  }, [token])

  useEffect(() => {
    if (token) {
      getGoodsData()
      // BuyRef.current.show()
    }
  }, [token, getGoodsData])

  useEffect(() => {
    // 曝光埋点
    reportSDK.clickReport({
      eventName: 'h5_activity_black5_page_click',
      properties: {
        _action: 'loading',
        _url: location.href
      }
    })
  }, [])

  const getParams = (good: IData, buy_type: number) => {
    const { rent_product, buy_product } = good
    return [
      [
        'product_id',
        buy_type === 1 ? rent_product?.product_id : buy_product?.product_id
      ],
      ['gid', String(buy_type === 1 ? rent_product?.gid : buy_product?.gid)],
      ['price', buy_type === 1 ? rent_product?.price : buy_product?.price],
      [
        'from',
        `${
          buy_type === 1 ? 'activity_balck5_rent' : 'activity_balck5_purchase'
        }`
      ],
      ['_story_id', String(good?.book_id)],
      ['t_book_id', String(good?.t_book_id)],
      [
        'source',
        JSON.stringify({
          book_id: good?.book_id,
          buy_type: buy_type,
          hours: good?.hours
        })
      ]
    ]
  }

  const { run: toPurchase } = useThrottleFn(
    (goods: IData, index: number, buy_type: number) => {
      handleBuy(goods, index, buy_type)
    },
    { wait: 1000, trailing: false }
  )
  const handleBuy = (goods: IData, index: number, buy_type: number) => {
    const { rent_product, buy_product, valid_status, book_id } = goods
    if (!isApp) {
      location.href = openLink
      return
    }

    // if (valid_status !== 1) return
    if (data.code === 6200002) {
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
      eventName: 'h5_activity_black5_page_click',
      properties: {
        _action: buy_type === 1 ? 'rent_click' : 'purchase_click',
        _url: location.href,
        _app_sku: buy_type === 1 ? rent_product?.gid : buy_product?.gid,
        _channel_sku:
          buy_type === 1 ? rent_product?.product_id : buy_product?.product_id,
        story_rank: index + 1,
        _story_id: book_id
      }
    })

    try {
      webview.exec('toPurchase', {
        parameter: getParams(goods, buy_type),
        callback: (res: any) => {
          if (String(res.status) === '1') {
            setBuySuccessGoods({ ...goods, buy_type })
            getGoodsData()
            setBuySusscessModelOpen(true)

            // handleStatusChange(goods.gid, 0)
          }
        }
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  const getToVideoParams = (good: IData) => {
    const { book_id, buy_status } = good
    return [
      ['bookId', book_id],
      ['chapter_id', ''],
      ['shelf_id', '90007'],
      ['jump_type', `${buy_status === 1 ? '2' : buy_status === 0 ? '0' : '1'}`]
    ]
  }

  const toVedioClick = (item: IData) => {
    try {
      webview.exec('toAppPlayer', {
        parameter: getToVideoParams(item),
        callback: (res: any) => {
          if (String(res.status) === '1') {
            getGoodsData()
            // handleStatusChange(goods.gid, 0)
          }
        }
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  const bgStyle = useMemo(() => {
    if (data.data) {
      return {
        background: `url(https://v-mps.crazymaplestudios.com/images/084c34f0-85de-11ee-aed2-cfe3d80f70eb.png) no-repeat 0 0 /contain #000`,
        backgroundSize: '100% auto'
      }
    }
    return {}
  }, [data])

  // https://v-mps.crazymaplestudios.com/images/64b918c0-7f99-11ee-aed2-cfe3d80f70eb.png

  return (
    <div className='main' style={bgStyle}>
      {isLoading && (
        <>
          {/* {isApp && (
            <div className='nav-header' ref={refNav}>
              <div className='back' onClick={handlerBackToApp}></div>
              <div className='title'>{title}</div>
            </div>
          )} */}
          <div className='banner'></div>
          <div className='active_date'>
            <span>{`Super Sale:${data?.data?.event_time_start}-${data?.data?.event_time_end}`}</span>
          </div>
          <div className='goods'>
            <div className={`goods-list`}>
              {data?.data?.list.map((item: any, index: any) => {
                return (
                  <div
                    className={`goods-item `}
                    key={index}
                    onClick={() => toVedioClick(item)}
                  >
                    <div className='goods-item-left'>
                      <div
                        className='item-left-date'
                        style={{
                          color: `${
                            item.date === 'Today'
                              ? '#F52B97'
                              : item.valid_status === 2
                              ? '#fff'
                              : '#717171'
                          }`
                        }}
                      >
                        {item.date}
                      </div>
                      <div
                        className={
                          item.date === 'Today'
                            ? 'item-left-active-icon'
                            : item.valid_status === 2
                            ? 'item-left-icon'
                            : 'item-left-expired-icon'
                        }
                      ></div>
                      <div
                        className={
                          item.valid_status === 2
                            ? 'item-left-line'
                            : 'item-left-expired-line'
                        }
                      ></div>
                    </div>
                    <div
                      className='goods-item-center'
                      style={{
                        background: `url(${item.book_pic}) no-repeat 0 0  / cover`
                      }}
                    ></div>
                    <div className='goods-item-right'>
                      <div className='item-right-title'>{item.book_title}</div>
                      <div className='item-right-tag'>{item.tag[0]}</div>
                      <div className='item-right-btn'>
                        {item.buy_status ? (
                          <div
                            className='btn-buy'
                            onClick={(e) => {
                              e.stopPropagation()
                              toVedioClick(item)
                            }}
                          >
                            <div className='btn-text'>Watch Now</div>
                            <div className='btn-info'>
                              {item.buy_status === 1 ? (
                                'Permanent Access'
                              ) : item.buy_status === 2 ? (
                                <>
                                  {item.rent_count_down !== 0 ? (
                                    <>
                                      <CountdownTimer
                                        targetTimestamp={item.rent_count_down}
                                      />
                                    </>
                                  ) : (
                                    'Access Expired'
                                  )}
                                </>
                              ) : (
                                'with Regular Price'
                              )}
                            </div>
                          </div>
                        ) : item.valid_status === 0 ? (
                          <>
                            <div
                              className='btn-buy'
                              onClick={(e) => {
                                e.stopPropagation()
                                toVedioClick(item)
                              }}
                            >
                              <div className='btn-text'>Watch Now</div>
                              <div className='btn-info'>Event Expired</div>
                            </div>
                          </>
                        ) : (
                          <div
                            className='btn-no-buy'
                            ref={goodsNoBuyRef}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.valid_status === 2 && (
                              <div className='btn-no-start'>Coming Soon</div>
                            )}
                            <div className='btn-no-buy-box'>
                              <div
                                className='btn-lease'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toPurchase(item, index, 1)
                                }}
                              >
                                <div className='btn-price'>
                                  {`$${item.rent_product.price}`}
                                </div>
                                <div className='btn-info'>
                                  {`${item.hours}-Hour Access`}
                                </div>
                              </div>
                              <div
                                className='btn-permanent'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toPurchase(item, index, 2)
                                }}
                              >
                                <div className='btn-price'>
                                  {`$${item.buy_product.price}`}
                                </div>
                                <div className='btn-info'>
                                  {`Permanent Access`}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='footer_rules'>
            <div className='rules_title'>Super Sale Rules</div>
            <div className='rules_info'>
              <p>
                {`1. Each series can only be purchased once during the event ${data?.data?.event_time_start}-${data?.data?.event_time_end}.`}
              </p>
              <p>
                2. If a series is not purchased for 24-hour access or permanent
                access through this event, there will be no chance to rent or
                purchase the entire series at a discounted price after the event
                ends.
              </p>
              <p>
                3. The limited-time access for each series is 24 hours, starting
                from successful payment. Episodes that were not unlocked before
                the limited-time access purchase will be locked again when the
                access expires.
              </p>
              <p>
                4. If you have any questions, please contact us through the
                Feedback section on your Profile page.
              </p>
            </div>
          </div>
        </>
      )}
      <BuySusscess
        buySusscessModelOpen={buySusscessModelOpen}
        onClose={() => {
          setBuySusscessModelOpen(false)
        }}
        buySuccessGoods={buySuccessGoods}
      />
      <LowVersionModel
        LowVersionModelOpen={lowVersionModelOpen}
        onClose={() => {
          setLowVersionModelOpen(false)
        }}
      />
    </div>
  )
}

export default BlabkFridayPage
