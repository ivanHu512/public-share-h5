import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import request from '@reelshort/utils/request'
import {
  useThrottleFn,
  useTitle,
  useInterval,
  useDocumentVisibility
} from 'ahooks'
import { Toast } from 'antd-mobile'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
import webview from '@/utils/web-view'
import { getPageQuery, setUrlParams } from '@/utils/utils'
import type { IData } from './types'
import { createVDeeplink } from '../../utils/url'
import useLogin from '@reelshort/hooks/useLogin'
import BuySusscess from './BuySusscess'
import RedeemCofirmModel from './RedeemCofirmModel'
import LowVersionModel from '@/components/LowVersionModel/LowVersionModel'

import './App.scss'
import { log } from 'console'

const openLink = createVDeeplink({
  fromType: 5,
  parm1: '',
  chapterId: '',
  type: 1000
})

const ChristmasPage: React.FC = () => {
  const isApp = window.isApp
  const [data, setData] = useState<any>({})
  const [process, setProcess] = useState<number>(0)
  const [freeChance, setFreeChance] = useState<number>(0)

  const refNav = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { token } = useLogin()
  const [buySuccessGoods, setBuySuccessGoods] = useState<IData>()
  const [buySusscessModelOpen, setBuySusscessModelOpen] = useState(false)
  const [lowVersionModelOpen, setLowVersionModelOpen] = useState(false)
  const [redeemBookModelOpen, setredeemBookModelOpen] = useState(false)
  const [appVersion, setAppVersion] = useState<number>(0)
  const redeemType = useRef<number>(1)
  const modelOpenType = useRef<boolean>(false)
  const [loading, setLoading] = useState(false)

  const [isReedemLoading, setIsReedemLoading] = useState(false)

  const redeemBookId = useRef<any>()

  const freeAmount = useRef<number>(0)

  const uid = localStorage.getItem('uid')

  useEffect(() => {
    if (uid) {
      reportSDK.report({
        _event_name: 'm_page_enter',
        properties: {
          _scene_name: 'main_scene',
          _page_name: 'h5_activity_christmas_page',
          _url: location.href
        }
      })
    }
  }, [uid])

  const redeemBooks = useCallback(() => {
    setIsReedemLoading(true)

    const opt = { token, book_id: redeemBookId.current }
    const api = `/api/innerH5api/activity/christmasFree`
    request(api, {
      method: 'post',
      data: {
        ...opt
      }
    }).then((res) => {
      setIsReedemLoading(false)
      if (redeemType?.current === 2) {
        console.log('[ data.free_amount ] >', buySuccessGoods)
        setProcess(res.data.process)
        setFreeChance(res.data.free_chance)
        getGoodsData()
        setredeemBookModelOpen(false)
        modelOpenType.current = false
        reportSDK.report({
          _event_name: 'm_currency_change',
          properties: {
            _scene_name: 'main_scene',
            _page_name: 'h5_activity_christmas_page',
            _vc_id: 'vc_02',
            _change_amount: freeAmount.current,
            _latter_amount: res.data.bonus,
            _change_reason: 'earned_free_drama_popup_get'
          }
        })
      }
      // setIsLoading(false)
      if (res.code === 0 && redeemType?.current === 1) {
        getGoodsData()
        setredeemBookModelOpen(false)
        modelOpenType.current = false
        Toast.info('Redeem Success', 1)
      }
      if (res.code === 6100013) {
        Toast.info(
          'Account logged in on another device. Please use the original device.',
          1
        )
      }
      if (res.code === 6100012) {
        Toast.info('Not in compliance with redemption requirements.', 1)
      }
    })
  }, [token])

  const getGoodsData = useCallback(() => {
    const opt = { token }
    const api = `/api/innerH5api/activity/christmas`
    setLoading(true)
    setIsReedemLoading(true)
    request(api, {
      method: 'post',
      data: {
        ...opt
      }
    }).then((res) => {
      setLoading(false)
      setIsReedemLoading(false)

      if (res.code === 6200002) {
        setAppVersion(res.code)
        setData(res.data)
        setIsLoading(true)
        document.getElementById('looding')!.style.display = 'none'
      }
      if (res.code === 0) {
        setAppVersion(res.code)
        setData(res.data)
        setProcess(res.data.process)
        setFreeChance(res.data.free_chance)
        redeemType.current = res.data.free_type
        setIsLoading(true)
        document.getElementById('looding')!.style.display = 'none'
        reportSDK.clickReport({
          eventName: 'h5_activity_christmas_page_click',
          properties: {
            _action: 'show',
            _url: location.href
          }
        })
        if (res.data.process === 3 && modelOpenType.current) {
          setBuySusscessModelOpen(true)
          setBuySuccessGoods(res.data)
          freeAmount.current = res.data.free_amount
          reportSDK.clickReport({
            eventName: 'earned_free_drama_popup',
            properties: {
              _action: 'show',
              _scene_name: 'main_scene',
              _page_name: 'h5_activity_christmas_page',
              popup_type: res.data.free_type, // # 弹窗类型：1 免费兑换作品、2 获得bonus
              reward_info: res.data.free_amount
            }
          })
        }
        if (res.data.free_type === 2 && res.data.process === 3) {
          redeemBookId.current = ''
          redeemBooks()
          setIsReedemLoading(false)
        }
      }
    })
  }, [token])

  const onCoverClick = (
    action: string,
    index?: number,
    shelf_id?: string,
    book_id?: string
  ) => {
    reportSDK.clickReport({
      eventName: 'h5_activity_christmas_page_click',
      properties: {
        _action: action,
        _url: location.href,
        item_list: `${index}#${book_id}#${shelf_id}`
      }
    })
  }

  useEffect(() => {
    if (token) {
      getGoodsData()
      // BuyRef.current.show()
    }
  }, [token, getGoodsData])

  const getParams = (good: IData) => {
    const { buy_product } = good
    return [
      ['product_id', buy_product?.product_id],
      ['gid', String(buy_product?.gid)],
      ['price', buy_product?.price],
      ['from', 'activity_christmas'],
      ['_story_id', String(good?._id)],
      ['t_book_id', String(good?.t_book_id)],
      [
        'source',
        JSON.stringify({
          book_id: good?._id,
          buy_type: 3,
          from: 'christmas'
        })
      ]
    ]
  }

  const { run: toPurchase } = useThrottleFn(
    (goods: IData) => {
      if (loading) return
      if (goods.buy_status) {
        onCoverClick('watch', goods.index, goods.shelf_id, goods._id)
        toVedioClick(goods)
        return
      }
      handleBuy(goods)
    },
    { wait: 1000, trailing: false }
  )
  const handleBuy = (goods: IData) => {
    const { buy_product, _id, shelf_id, index } = goods
    if (!isApp) {
      location.href = openLink
      return
    }
    console.log('[ data.code ] >', data.code)

    if (appVersion === 6200002) {
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
      eventName: 'h5_activity_christmas_page_click',
      properties: {
        _action: 'sku_click',
        _url: location.href,
        _app_sku: buy_product?.gid,
        _channel_sku: buy_product?.product_id,
        price: buy_product?.price,
        item_list: `${index}#${_id}#${shelf_id}`
      }
    })

    try {
      webview.exec('toPurchase', {
        parameter: getParams(goods),
        callback: (res: any) => {
          if (String(res.status) === '1') {
            setBuySuccessGoods({ ...goods })
            modelOpenType.current = true
            getGoodsData()
          }
        }
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  const getToVideoParams = (good: IData) => {
    const { _id, shelf_id } = good
    return [
      ['bookId', _id],
      ['chapter_id', ''],
      ['shelf_id', shelf_id],
      ['jump_type', '0']
    ]
  }

  const toVedioClick = (item: IData) => {
    console.log(item)

    try {
      webview.exec('toAppPlayer', {
        parameter: getToVideoParams(item),
        callback: (res: any) => {
          console.log('[ res ] >', res)
          if (String(res.status) === '1') {
            getGoodsData()
          }
        }
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  useEffect(() => {
    if (refNav.current) {
      console.log('offset', refNav?.current?.offsetTop)
      isApp && stickyNav()
    }
  }, [refNav.current])

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

  const handlerBackToApp = () => {
    webview.exec('backToApp')
  }
  // 二次确认弹窗上报
  useEffect(() => {
    if (redeemBookModelOpen) {
      redeemReport('show')
    }
  }, [redeemBookModelOpen])

  const redeemReport = (action: string) => {
    reportSDK.clickReport({
      eventName: 'redeem_popup',
      properties: {
        _action: action,
        _scene_name: 'main_scene',
        _page_name: 'h5_activity_christmas_page'
      }
    })
  }

  return (
    <div className='main'>
      <>
        {isApp && (
          <div className='nav-header' ref={refNav}>
            {isLoading && (
              <div className='back' onClick={handlerBackToApp}></div>
            )}
            <div className='title'>{'Glowing Christmas'}</div>
          </div>
        )}
        {isLoading && (
          <>
            {' '}
            <div className='banner'></div>
            {isReedemLoading && (
              <div className='loading'>
                <span></span>
              </div>
            )}
            <div
              className={`content ${
                data.super_sale ? 'content_max_height' : 'content_min_height'
              }`}
            >
              <div className='schedule_box'>
                <div className='schedule_title'>
                  {process !== 0 && freeChance === 0
                    ? `${3 - process} more purchases to get 1 FREE series`
                    : freeChance !== 0
                    ? `${freeChance} FREE series for you to redeem`
                    : '3 more purchases to get 1 FREE series'}
                </div>
                <div className='schedule_line'>
                  <div className='progress_header'>{'Buy Series'}</div>
                  <div className='progress_box'>
                    <div className='progress_line'>
                      <div
                        className='progress_bar'
                        style={{
                          width: process
                            ? process % 3 === 0
                              ? `${100}%`
                              : `${25 * process}%`
                            : 0
                        }}
                      ></div>
                    </div>
                    <div className='progress_num'>
                      {[1, 2, 3, 4].map((el) => {
                        return (
                          <div key={el} className='progress_num_item'>
                            {el !== 4 && <div className='item'>{el}</div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className='progress_free_btn'></div>
                </div>
              </div>
              {data.super_sale && (
                <div className='super_sale_box'>
                  <div className='super_sale_header'>
                    <div className='super_sale_title'>
                      {'Enjoy the rest of the series for'}
                    </div>
                    <div className='super_sale_price'></div>
                    <div className='super_sale_info'>
                      {'Discover more thrilling twists in the story!'}
                    </div>
                  </div>
                  <div className='super_sale_book'>
                    <div
                      className='book_info'
                      onClick={() => {
                        onCoverClick(
                          'cover_click',
                          1,
                          '98001',
                          data?.super_sale._id
                        )
                        toVedioClick({
                          ...data?.super_sale,
                          shelf_id: '98001'
                        })
                      }}
                    >
                      <div
                        className='book_info_pic'
                        style={{
                          background: `url(${data?.super_sale?.book_pic}) no-repeat 0 0  / cover`
                        }}
                      ></div>
                      <div className='book_info_text'>
                        <div className='book_info_title'>
                          {data?.super_sale?.book_title}
                        </div>
                        <div className='book_info_theme'>
                          {data?.super_sale?.special_desc}
                        </div>
                        <div className='book_info_episodes'>
                          {`episodes:${data?.super_sale?.chapter_count}`}
                        </div>
                      </div>
                    </div>
                    <div className='book_buy_box'>
                      <div className='book_buy_price'>
                        {`$${data?.super_sale?.buy_product?.price}`}
                      </div>
                      <div
                        className='book_buy_btn'
                        onClick={(e) => {
                          e.stopPropagation()
                          toPurchase({
                            ...data?.super_sale,
                            index: 1,
                            shelf_id: '98001'
                          })
                        }}
                      >
                        {`${
                          data?.super_sale?.buy_status === 0 ? `BUY` : 'Watch'
                        } `}
                      </div>
                    </div>
                  </div>
                  <div className='super_sale_similar_book'>
                    <div className='similar_info'>{`More series like ${data?.super_sale?.book_title}`}</div>
                    <div className='super_sale_similar_list'>
                      {data?.super_sale?.similar?.map(
                        (item: any, index: any) => {
                          return (
                            <div className='similar_item' key={index}>
                              <div
                                className='similar_item_pic'
                                style={{
                                  background: `url(${item?.book_pic}) no-repeat 0 0  / cover`
                                }}
                                onClick={() => {
                                  onCoverClick(
                                    'cover_click',
                                    index + 1,
                                    '98002',
                                    item?._id
                                  )
                                  toVedioClick({
                                    ...item,
                                    shelf_id: '98002'
                                  })
                                }}
                              >
                                {item?.corner_mark ? (
                                  <div className='corner_mark'>
                                    {item?.corner_mark === 1
                                      ? 'Collected'
                                      : 'Watched'}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div
                                className='similar_item_title'
                                onClick={() => {
                                  onCoverClick(
                                    'cover_click',
                                    index + 1,
                                    '98002',
                                    item?._id
                                  )
                                  toVedioClick({
                                    ...item,
                                    index: index,
                                    shelf_id: '98001'
                                  })
                                }}
                              >
                                {item?.book_title}
                              </div>
                              {item?.free_status === 1 ? (
                                <div
                                  className='similar_item_btn similar_item_btn_redeem'
                                  onClick={() => {
                                    redeemBookId.current = item?._id
                                    setredeemBookModelOpen(true)
                                    onCoverClick(
                                      'redeem_click',
                                      index + 1,
                                      '98002',
                                      item?._id
                                    )
                                  }}
                                >
                                  {'Redeem'}
                                  <span></span>
                                </div>
                              ) : (
                                <div
                                  className={'similar_item_btn'}
                                  onClick={() => {
                                    toPurchase({
                                      ...item,
                                      index: index + 1,
                                      shelf_id: '98002'
                                    })
                                  }}
                                >
                                  {`${
                                    item?.buy_status === 0
                                      ? `$${item?.buy_product?.price}`
                                      : 'Watch'
                                  } `}
                                </div>
                              )}
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='content_footer'>
              <div className='recommended_works'>
                {data?.lists?.map((item: any, index: any) => {
                  return (
                    <div
                      className={`${
                        item.price === '9.99'
                          ? 'recommended_works_nine'
                          : item.price === '4.99'
                          ? 'recommended_works_four'
                          : 'recommended_works_one'
                      }
                    } recommended_works_box`}
                      key={index}
                    >
                      <div className='recommended_works_item'>
                        <div className='recommended_works_item_title'>
                          <span> {`$${item.price}`}</span>
                        </div>
                        <div className='recommended_works_item_books'>
                          {item?.books?.map((el: any, index: any) => {
                            return (
                              <div className='item_books_box' key={index}>
                                <div
                                  className='item_books_pic'
                                  style={{
                                    background: `url(${el?.book_pic}) no-repeat 0 0  / cover`
                                  }}
                                  onClick={() => {
                                    onCoverClick(
                                      'cover_click',
                                      index + 1,
                                      `${
                                        item.price === '9.99'
                                          ? '98003'
                                          : item.price === '4.99'
                                          ? '98004'
                                          : '98005'
                                      }`,
                                      el?._id
                                    )
                                    toVedioClick({
                                      ...el,
                                      index: index + 1,
                                      shelf_id: `${
                                        item.price === '9.99'
                                          ? '98003'
                                          : item.price === '4.99'
                                          ? '98004'
                                          : '98005'
                                      }`
                                    })
                                  }}
                                >
                                  {el?.corner_mark ? (
                                    <div className='corner_mark'>
                                      {el?.corner_mark === 1
                                        ? 'Collected'
                                        : 'Watched'}
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div
                                  className='item_books_title'
                                  onClick={() => {
                                    onCoverClick(
                                      'cover_click',
                                      index + 1,
                                      `${
                                        item.price === '9.99'
                                          ? '98003'
                                          : item.price === '4.99'
                                          ? '98004'
                                          : '98005'
                                      }`,
                                      el?._id
                                    )
                                    toVedioClick({
                                      ...el,
                                      index: index + 1,
                                      shelf_id: `${
                                        item.price === '9.99'
                                          ? '98003'
                                          : item.price === '4.99'
                                          ? '98004'
                                          : '98005'
                                      }`
                                    })
                                  }}
                                >
                                  {el?.book_title}
                                </div>
                                {el?.free_status === 1 ? (
                                  <div
                                    className='item_books_btn item_books_btn_redeem'
                                    onClick={() => {
                                      redeemBookId.current = el?._id
                                      setredeemBookModelOpen(true)
                                      onCoverClick(
                                        'redeem_click',
                                        index + 1,
                                        `${
                                          item.price === '9.99'
                                            ? '98003'
                                            : item.price === '4.99'
                                            ? '98004'
                                            : '98005'
                                        }`,
                                        el?._id
                                      )
                                    }}
                                  >
                                    {'Redeem'}
                                    <span></span>
                                  </div>
                                ) : (
                                  <div
                                    className={`item_books_btn ${
                                      el?.free_status === 1 &&
                                      'item_books_btn_redeem '
                                    }`}
                                    onClick={() => {
                                      toPurchase({
                                        ...el,
                                        index: index + 1,
                                        shelf_id: `${
                                          item.price === '9.99'
                                            ? '98003'
                                            : item.price === '4.99'
                                            ? '98004'
                                            : '98005'
                                        }`,
                                        buy_product: item.buy_product
                                      })
                                    }}
                                  >
                                    {`${
                                      el?.buy_status === 0
                                        ? `$${item?.price}`
                                        : 'Watch'
                                    } `}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='christmas_rule'>
                <div className='christmas_tree'></div>
                <div className='christmas_rule_title'>
                  Christmas Special Rules
                </div>
                <div className='rules_info'>
                  <p>
                    Week-Long Event: The Christmas Special will last for a week,
                    December 20th-26th, 2023.
                  </p>
                  <p>
                    Buy 3 Get 1 Free: During the event, purchasing three series
                    earns you a free redemption for another series from a
                    section that costs the same or less than your most expensive
                    pick.
                  </p>
                  <p>
                    {`Purchased Series: Series successfully purchased will show up in "My List" on your profile.`}
                  </p>
                  <p>
                    Permanent Access: Any series bought during the Christmas
                    Special will stay accessible permanently.
                  </p>
                </div>
                <div className='christmas_footer'></div>
              </div>
            </div>
          </>
        )}
      </>
      {/* )} */}
      <BuySusscess
        buySusscessModelOpen={buySusscessModelOpen}
        onClose={() => {
          setBuySusscessModelOpen(false)
          modelOpenType.current = false
          if (buySuccessGoods?.free_type === 2) {
            Toast.info('Success', 1)
          }
        }}
        onChooseDrama={() => {
          modelOpenType.current = false
          setBuySusscessModelOpen(false)
          reportSDK.clickReport({
            eventName: 'earned_free_drama_popup',
            properties: {
              _action: 'click',
              _scene_name: 'main_scene',
              _page_name: 'h5_activity_christmas_page',
              popup_type: data.free_type, // # 弹窗类型：1 免费兑换作品、2 获得bonus
              reward_info: data.free_amount
            }
          })
          if (buySuccessGoods?.free_type === 2) {
            Toast.info('Success', 1)
          }
        }}
        buySuccessGoods={buySuccessGoods}
      />
      <LowVersionModel
        LowVersionModelOpen={lowVersionModelOpen}
        onClose={() => {
          setLowVersionModelOpen(false)
        }}
      />
      <RedeemCofirmModel
        redeemBookModelOpen={redeemBookModelOpen}
        onClose={() => {
          redeemReport('close')
          setredeemBookModelOpen(false)
        }}
        onConfirm={() => {
          redeemReport('click')
          setredeemBookModelOpen(false)
          redeemBooks()
        }}
      />
    </div>
  )
}

export default ChristmasPage
