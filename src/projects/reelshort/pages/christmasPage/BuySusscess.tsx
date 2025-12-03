import React, { forwardRef, useState, useMemo, useEffect } from 'react'
import CustomModal from '@/components/CustomModal/CustomModal'
import './BuySusscess.scss'
import type { IData } from './types'
import webview from '@/utils/web-view'
import { on } from 'process'

interface IProps {
  buySusscessModelOpen: boolean
  onClose?: () => void
  buySuccessGoods: IData
  onChooseDrama?: () => void
}

/**
 * @page 播放器支付弹窗
 * @param props
 * @returns
 */
const BuySusscess = forwardRef((props: any, ref: any) => {
  const { buySusscessModelOpen, onClose, buySuccessGoods, onChooseDrama } =
    props
  console.log(
    '%c [ buySuccessGoods ]-20',
    'font-size:13px; background:pink; color:#bf2c9f;',
    buySuccessGoods
  )

  const [open, setOpen] = useState<boolean>(buySusscessModelOpen)

  const bgStyle = useMemo(() => {
    if (buySuccessGoods?.free_type === 1) {
      return {
        background: `url(https://v-mps.crazymaplestudios.com/images/ea6c0340-8ff9-11ee-aed2-cfe3d80f70eb.png) no-repeat center`,
        backgroundSize: '100% 100%'
      }
    } else {
      return {
        background: `url(https://v-mps.crazymaplestudios.com/images/2eef9220-8e7e-11ee-aed2-cfe3d80f70eb.png) no-repeat center`,
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
              <>
                <span>{`${
                  buySuccessGoods?.free_type === 1
                    ? `Now you can pick a series from the $${buySuccessGoods?.free_amount} section for FREE!`
                    : `You've picked all the available series, and we're converting the free series into ${buySuccessGoods?.free_amount} bonus for you. Enjoy!`
                } `}</span>
              </>
            </div>
          </div>
          <div className='model_content' style={bgStyle}></div>
          <div className='model_btn'>
            <div className='model_btn_watch' onClick={() => onChooseDrama()}>
              {`${
                buySuccessGoods?.free_type === 1
                  ? 'Choose My FREE Series'
                  : 'Claim'
              }`}
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  )
})
BuySusscess.displayName = 'BuySusscess'
export default BuySusscess
