import React, { forwardRef, useState, useMemo, useEffect } from 'react'
import CustomModal from '@/components/CustomModal/CustomModal'
import './LowVersionModel.scss'
import { getUA } from '@/utils/utils'
import { reportSDK } from '@reelshort/utils/reportInfo/index'

import webview from '@/utils/web-view'

interface IProps {
  LowVersionModelOpen: boolean
  onClose?: () => void
}

/**
 * @page 播放器支付弹窗
 * @param props
 * @returns
 */
const LowVersionModel = forwardRef((props: any, ref: any) => {
  const { LowVersionModelOpen, onClose } = props

  const downLoadUrlDic = useMemo(() => {
    return {
      googlePlay:
        'https://play.google.com/store/apps/details?id=com.newleaf.app.android.victor',
      appStore: 'https://apps.apple.com/us/app/reelshort/id1636235979'
    }
  }, [])

  const [downLoadUrl, setDownLoadUrl] = useState<any>()

  const isIOS = getUA().ios

  const JumpWebview = () => {
    reportSDK.clickReport({
      eventName: 'h5_upgrade_popup_click',
      properties: {
        _action: 'upgrede_click',
        _url: location.href,
        app_version: localStorage?.getItem('clientVer')
      }
    })

    try {
      webview.exec('toOneLink', {
        parameter: [['onelink', `${downLoadUrl}`]],
        callback: (res: any) => {
          console.log('[ res ] >', res)
        }
      })
    } catch (e) {
      console.log('e', e)
    }
  }

  useEffect(() => {
    if (isIOS) {
      setDownLoadUrl(downLoadUrlDic.appStore)
    } else {
      setDownLoadUrl(downLoadUrlDic.googlePlay)
    }
  }, [isIOS, downLoadUrlDic])
  return (
    <div>
      <CustomModal
        open={LowVersionModelOpen}
        width={289}
        height={432}
        onClose={onClose}
      >
        <div
          className={`lowVersionModel ${!isIOS && 'lowVersionModel_Android'}`}
        >
          <div className='lowVersionModel_logo'></div>
          <div className='lowVersionModel_info'>
            {isIOS
              ? 'The current version is out of date. Please upgrade to join this event'
              : 'The current version is outdated. Please go to Google Play to upgrade'}
          </div>
          {isIOS && (
            <div
              className='lowVersionModel_btn'
              onClick={() => {
                JumpWebview()
              }}
            >
              {'Upgrade'}
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  )
})
LowVersionModel.displayName = 'LowVersionModel'
export default LowVersionModel
