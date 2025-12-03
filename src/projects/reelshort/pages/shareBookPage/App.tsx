/* eslint-disable @typescript-eslint/prefer-for-of */
import React, { useState, useEffect } from 'react'
import ToReelshortFooter from './components/ToReelshortFooter'
import { getSearchData } from '@reelshort/utils/urils'
import { useRequest } from 'ahooks'
import { getBookInfo } from '@reelshort/services/shareBookPage'
import { reportSDK } from '@reelshort/utils/reportInfo/index'
import './App.scss'
const App: React.FC = () => {
  const { book_id = '' } = getSearchData(location.href)
  reportSDK.setPublicParams({
    CHANNEL_ID: 'WEB43001'
  })
  console.log(getSearchData(location.href))

  /** 书籍信息 */
  const [bookInfo, setBookInfo] = useState<any>({})
  const { loading } = useRequest(() => getBookInfo(book_id), {
    onSuccess: (res) => {
      if (res.code === 0) {
        console.log('书籍信息', res.data)
        setBookInfo(res.data)

        reportSDK.clickReport({
          eventName: 'h5_share_page_click',
          properties: {
            _action: 'page_show',
            _story_id: book_id,
            page_type:
              res.data?.status !== 1 || res.data?.book_source === 5 ? 1 : 2
          }
        })
      }
    }
  })

  if (!book_id)
    return <div style={{ color: '#fff' }}>Missing required parameters</div>
  if (loading) return null

  /** 是否跳转播放器：存在视频 && 非无版权 && 上架状态 */
  const jumpToVideo =
    bookInfo?.have_trailer &&
    bookInfo?.book_source !== 5 &&
    bookInfo?.status === 1

  /** 是否空数据 */
  const isNoData = bookInfo?.status !== 1 || bookInfo?.book_source === 5

  /** 书籍信息UI */
  const BookInfo = (
    <>
      <div className='cover'>
        <div className='overspread'></div>
        {!!bookInfo?.book_pic && <img src={bookInfo?.book_pic} alt='cover' />}
      </div>
      <div className='book_info'>
        <div className='title'>{bookInfo?.book_title}</div>
        <div className='state_info'>
          <span>{bookInfo?.theme?.[0]}</span>
          {bookInfo?.chapter_count ? (
            <span>
              &nbsp;·&nbsp;
              {bookInfo?.update_status === 0
                ? `Updated to ${bookInfo?.chapter_count}`
                : `${bookInfo?.chapter_count} Episodes`}
            </span>
          ) : null}
          &nbsp;&nbsp; |&nbsp;&nbsp;
          <span
            className={
              bookInfo?.update_status === 0 ? 'update_status_color' : ''
            }
          >
            {bookInfo?.update_status === 0 ? 'Ongoing' : 'Completed'}
          </span>
        </div>
        <div className='synopsis'>{bookInfo?.special_desc}</div>
      </div>
      <ToReelshortFooter
        book_id={book_id}
        type={jumpToVideo ? 1001 : 1000}
        book_type={bookInfo?.book_type}
        isNoData={isNoData}
      />
    </>
  )
  /**  缺省UI */
  const NoData = (
    <div className='no_data'>
      <img
        src='https://v-mps.crazymaplestudios.com/images/ac9f7660-2fc1-11ef-a6eb-0925fdddfb71.png'
        alt=''
      />
      <div className='text'>Oops, this content cannot be found.</div>
      <ToReelshortFooter
        book_id={book_id}
        type={jumpToVideo ? 1001 : 1000}
        book_type={bookInfo?.book_type}
        isNoData={isNoData}
      />
    </div>
  )

  return <div className='share_body'>{isNoData ? NoData : BookInfo}</div>
}

export default App
