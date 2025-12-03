import React, { useEffect, useState } from 'react'

import './App.scss'
import webview from '../../utils/web-view'
import { i18n } from './locales'

/**
 * app内 - 福利页规则
 */
const App: React.FC = () => {
  const [lang, setLang] = useState<string>(
    () => localStorage?.getItem('lang') || 'en'
  )

  useEffect(() => {
    document.title = i18n('pageTitle')
  }, [])

  useEffect(() => {
    if (lang === 'ar') document.body.style.direction = 'rtl'
  }, [lang])

  return (
    <div className='main'>
      <div className='each_module'>
        <div className='title'>{i18n('activityDescriptionTitle')}</div>
        <div className='desc'>{i18n('activityDescriptionDesc1')}</div>
        <div className='desc'>{i18n('activityDescriptionDesc2')}</div>
      </div>
      <div className='each_module'>
        <div className='title'>{i18n('participationMethodTitle')}</div>
        <div className='desc'>{i18n('participationMethodDesc')}</div>
      </div>
      <div className='each_module'>
        <div className='title'>{i18n('activityDetailsTitle')}</div>
        <div className='second_content'>
          <div className='second_headings'>
            {i18n('activityDetailsCheckIn')}
          </div>
          <div className='desc'>{i18n('activityDetailsCheckInDesc')}</div>
        </div>
        <div className='second_content'>
          <div className='second_headings'>{i18n('activityDetailsNewer')}</div>
          <div className='desc'>{i18n('activityDetailsNewerDesc')}</div>
        </div>
        <div className='second_content' style={{ marginBottom: 0 }}>
          <div className='second_headings'>{i18n('todayBenefits')}</div>
          <div className='desc'>{i18n('todayBenefitsDesc')}</div>
          <div className='three_headings'>·{i18n('watchEewards')}</div>
          <div className='desc'>{i18n('watchEewardsDesc1')}</div>
          <div className='desc'>{i18n('watchEewardsDesc2')}</div>
          <div className='three_headings'>·{i18n('watchAdsRewards')}</div>
          <div className='desc'>{i18n('watchAdsRewardsDesc')}</div>
          <div className='three_headings'>·{i18n('otherTask')}</div>
          <div className='desc'>{i18n('otherTaskDesc')}</div>
        </div>
      </div>
      <div className='each_module'>
        <div className='title'>{i18n('importantNotesTitle')}</div>
        <div className='desc golden_color'>{i18n('importantNotesDesc1')}</div>
        <div className='desc'>{i18n('importantNotesDesc2')}</div>
        <div className='desc'>{i18n('importantNotesDesc3')}</div>
        <div className='desc'>{i18n('importantNotesDesc4')}</div>
      </div>
      <div className='each_module'>
        <div className='title'>{i18n('contactInformationTitle')}</div>
        <div className='desc'>{i18n('contactInformationDesc')}</div>
      </div>
    </div>
  )
}

export default App
