import React, { forwardRef, useState, useMemo, useEffect } from 'react'
import CustomModal from '@/components/CustomModal/CustomModal'
import './BuySusscess.scss'
import type { IData } from './types'
import CountdownTimer from './CountdownTimer'
import webview from '@/utils/web-view'

interface IProps {
  buySusscessModelOpen: boolean
  onClose?: () => void
  buySuccessGoods: IData
}

/**
 * @page 播放器支付弹窗
 * @param props
 * @returns
 */
const BuySusscess = forwardRef((props: any, ref: any) => {
  const { buySusscessModelOpen, onClose, buySuccessGoods } = props

  const [open, setOpen] = useState<boolean>(buySusscessModelOpen)

  const bgStyle = useMemo(() => {
    if (buySuccessGoods) {
      return {
        background: `url(${buySuccessGoods.book_pic}) no-repeat 0 0 /contain #000`,
        backgroundSize: '100% auto'
      }
    }
    return {}
  }, [buySuccessGoods])

  const getToVideoParams = (good: IData) => {
    const { book_id, buy_status, buy_type } = good
    return [
      ['bookId', book_id],
      ['chapter_id', ''],
      [
        'shelf_id',
        `${buy_type === 1 ? '90005' : buy_type === 2 ? '90006' : '90007'}`
      ],
      ['jump_type', `${buy_status === 1 ? '1' : buy_status === 0 ? '0' : '2'}`]
    ]
  }

  useEffect(() => {
    setOpen(buySusscessModelOpen)
  }, [buySusscessModelOpen])

  const toVedioClick = (item: IData) => {
    try {
      webview.exec('toAppPlayer', {
        parameter: getToVideoParams(item),
        callback: (res: any) => {
          if (String(res.status) === '1') {
            // handleStatusChange(goods.gid, 0)
          }
        }
      })
    } catch (e) {
      console.log('e', e)
    }
    setOpen(false)
  }

  return (
    <div>
      <CustomModal open={open} width={289} height={432} onClose={onClose}>
        <div className='buySusscessModel'>
          <div className='model_Header'>
            <div className='header_title'></div>
            <div className='header_info'>
              {buySuccessGoods?.buy_type === 1 ? (
                <>
                  You can now enjoy {buySuccessGoods?.book_title} for free for
                  the next <span>{`${buySuccessGoods.hours} hours.`}</span>
                </>
              ) : (
                `You've purchased permanent access to ${buySuccessGoods?.book_title}. Now, you can enjoy the series whenever you want!`
              )}
            </div>
          </div>
          <div className='model_content' style={bgStyle}></div>
          <div className='model_btn'>
            <div className='model_btn_CountdownTimer'>
              {buySuccessGoods?.buy_type === 1 && (
                <>
                  <CountdownTimer
                    targetTimestamp={buySuccessGoods.hours * 3600}
                  />
                </>
              )}
            </div>
            <div
              className='model_btn_watch'
              onClick={() => toVedioClick(buySuccessGoods)}
            >
              Watch Now!
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
})
BuySusscess.displayName = 'BuySusscess'
export default BuySusscess
