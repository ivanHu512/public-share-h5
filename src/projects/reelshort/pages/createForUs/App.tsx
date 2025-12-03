/* eslint-disable @typescript-eslint/prefer-for-of */
import React, { useEffect } from 'react'
import group1Bg from '@reelshort/pages/createForUs/assets/group1.png'
import group2Bg from '@reelshort/pages/createForUs/assets/group2.png'
import logo from '@reelshort/pages/createForUs/assets/logo.png'
import bottomBar from '@reelshort/pages/createForUs/assets/bottom.png'

import './App.scss'

const App: React.FC = () => {
  useEffect(() => {
    fnResize()
    adjustSpace()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fnResize = () => {
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 600) {
      deviceWidth = 600
    }
    if (deviceWidth <= 350) {
      deviceWidth = 350
    }
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
  }

  const adjustSpace = () => {
    const subheaders = document.querySelectorAll<HTMLElement>(
      '.group-subheader'
    )
    const headers = document.querySelectorAll<HTMLElement>('.group-header')

    const contents = document.querySelectorAll<HTMLElement>('.group-content')
    const IOS = getIOS()
    console.log(IOS)
    if (IOS) {
      for (let i = 0; i < headers.length; i++) {
        headers[i].style.letterSpacing = '-0.017rem'
      }
      for (let i = 0; i < subheaders.length; i++) {
        subheaders[i].style.letterSpacing = '-0.015rem'
      }
      for (let i = 0; i < contents.length; i++) {
        contents[i].style.letterSpacing = '-0.003rem'
      }
    } else {
      for (let i = 0; i < contents.length; i++) {
        contents[i].style.letterSpacing = '-0.01rem'
      }
    }
  }

  const getIOS = () => {
    const UserAgent = navigator.userAgent.toLowerCase()
    if (
      UserAgent.indexOf('iphone') > -1 ||
      UserAgent.indexOf('ipod') > -1 ||
      UserAgent.indexOf('ipad') > -1
    ) {
      return true
    }
    return false
  }

  const handleCopy = (e: any) => {
    const toast = document.querySelector('.toast') as HTMLInputElement
    toast.setAttribute('class', 'toast')

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.setAttribute('value', e.target.innerText)
    input.select()
    const copyText = document.execCommand('copy')
    document.body.removeChild(input)

    if (copyText) {
      toast.innerText = 'Copy success'
      toast.classList.add('success', 'shortShow')
    }
  }

  return (
    <div className='main'>
      <div className='top-header'></div>

      <div className='central-content'>
        <div className='group1'>
          <img
            src={group1Bg}
            className='group-img group-img1'
            alt='group1-wrapper'
          />
          <div className='group-text-box'>
            <div className='group-header'>Create for Us</div>
            <div className='group-subheader'>
              Be part of ReelShort original bite-sized serialized Content
              Creator Team!
            </div>
            <div className='group-content'>
              <p className='more-row24'>
                If you are looking for the best platform to share your stories
                in video format, you&apos;re in the right place!
              </p>
              <p className='more-row24'>
                ReelShort is the most innovative streaming platform in the
                industry! Here you can create and develop your own serialized
                content, reach out to a wide audience and kickstart your career
                as an actor, actress or filmmaker.
              </p>
              <p>
                In ReelShort, YOU take control of your career as a Content
                Creator.
              </p>
            </div>
          </div>
        </div>

        <div className='group2'>
          <img src={group2Bg} className='group-img' alt='group2-wrapper' />
          <div className='group-text-box2'>
            <div className='toast'></div>
            <div className='group-header'>Contact Us</div>
            <div className='group-subheader'>How can I submit my stories?</div>
            <div className='group-content'>
              <p className='more-row24'>
                It&apos;s super easy! Send by email the first three episodes, a
                summary and a full outline of the series to:&nbsp;
                <span
                  className='red'
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleCopy(e)}
                >
                  reelshort.support@crazymaplestudio.com
                </span>
                . Our ultimate goal is for you to produce as many episodes as
                possible (50 is the minimum).
              </p>
              <p className='more-row24'>
                Remember, each episode needs to be no more than one minute, and
                have a strong, unique concept that hooks the audience.
              </p>
              <p>
                Our team will review your content and conduct testing to see how
                well it adapts within our community. Once we approve it,
                we&apos;ll make you an offer to produce and monetize the series!
              </p>
            </div>

            <div className='group-subheader subheader3'>
              Video Format Requirements
            </div>
            <div className='group-content'>
              <p className='more-row12'>Video resolution: 2160x3840</p>
              <p className='more-row12'>Ratio: 9:16</p>
              <p className='more-row12'>Format: MP4</p>
              <p>Language: English</p>
            </div>
          </div>
        </div>

        <div className='bottom-footer'>
          <img src={logo} className='logo' alt='reelshort-logo' />
          <img src={bottomBar} className='footer' alt='footer' />
        </div>
      </div>
    </div>
  )
}

export default App
