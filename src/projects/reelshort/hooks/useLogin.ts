import React, { useEffect, useState, useRef } from 'react'
import webview from '@/utils/web-view'
import { useRequest } from 'ahooks'
import { getH5Loading } from '@reelshort/services/common'
import { handleH5LoadingMD5 } from '@reelshort/utils/urils'
import { Toast } from 'antd-mobile'

const useLogin = () => {
  // 登录失败后自动登录1次
  const loginFailTime = useRef<number>(1)
  // 全局context的值
  const [contextValue, setValue] = useState<any>({
    loginState: false,
    token: '',
    // 登录时页面白屏蒙层加载状态
    pageLoading: true
  })

  function getLoading({ clientToken, time }: any) {
    getH5Loading({
      clientToken: clientToken,
      time: time,
      sign: handleH5LoadingMD5({
        clientToken: clientToken,
        time: time
      })
    }).then((res) => {
      console.log('login res', res)
      if (res.code === 0) {
        // 缓存 token  uid 客户端版本号
        localStorage?.setItem('cToken', `${res.data.token}`)
        localStorage?.setItem('uid', res.data.uid)
        localStorage?.setItem('clientVer', res.data.clientVer)
        // 登录成功通知子组件要更新接口，失败不更新
        setValue((val: any) => ({
          ...val,
          loginState: true,
          token: res.data.token
        }))
      } else if (res.code === 103) {
        handleClientToken()
      } else {
        if (loginFailTime.current === 1) {
          // 自动登录
          handleClientToken()
          loginFailTime.current = 0
        } else {
          // 登录一次，重登一次失败，提示出去再进来
          Toast.info('Login failed. Please try again.')
        }
      }
    })
  }

  // const { run: getLoading } = useRequest(
  //   ({ clientToken, time }) =>
  //     getH5Loading({
  //       clientToken: clientToken,
  //       time: time,
  //       sign: handleH5LoadingMD5({
  //         clientToken: clientToken,
  //         time: time
  //       })
  //     }),
  //   {
  //     manual: true,
  //     onSuccess: (res) => {
  //       console.log('login res', res)
  //       if (res.code === 0) {
  //         // 缓存 token  uid 客户端版本号
  //         localStorage?.setItem('cToken', `${res.data.token}`)
  //         localStorage?.setItem('uid', res.data.uid)
  //         localStorage?.setItem('clientVer', res.data.clientVer)
  //         // 登录成功通知子组件要更新接口，失败不更新
  //         setValue((val: any) => ({
  //           ...val,
  //           loginState: true,
  //           token: res.data.token
  //         }))
  //       } else if (res.code === 103) {
  //         handleClientToken()
  //       } else {
  //         if (loginFailTime.current === 1) {
  //           // 自动登录
  //           handleClientToken()
  //           loginFailTime.current = 0
  //         } else {
  //           // 登录一次，重登一次失败，提示出去再进来
  //           Toast.info('Login failed. Please try again.')
  //         }
  //       }
  //     }
  //   }
  // )

  // 获取clientToken-登录
  const handleClientToken = () => {
    setValue((val: any) => ({
      ...val,
      pageLoading: true
    }))
    webview.exec('getCredentials', {
      callback: (res) => {
        const clientTokenStr = res?.credentials || ''
        const time = Math.floor(new Date().getTime() / 1000)
        console.log('开始登入')
        console.log(clientTokenStr)
        getLoading({ clientToken: clientTokenStr, time })
      }
    })
  }

  // 获取uid，校验uid是否是当前的uid
  const handleUserInfo = () => {
    webview.exec('getUserInfo', {
      callback: (res) => {
        const localUid = String(localStorage?.getItem('uid')) || ''
        const token = localStorage?.getItem('cToken')
        const localClientVer = String(localStorage?.getItem('clientVer')) || ''
        const lcalLang = localStorage?.getItem('lang') || ''
        // 缓存渠道id 设备型号  语言
        res.channelId && localStorage?.setItem('channelId', res.channelId)
        res.devModel && localStorage?.setItem('devModel', res.devModel)
        res.lang && localStorage?.setItem('lang', res.lang)

        /**
         * uid  clientVer跟上次登录缓存的值不匹配
         * 缓存中没有token的时候
         * 要重新触发登录
         */
        if (
          localUid !== String(res.uid) ||
          !token ||
          localClientVer !== res.clientVer ||
          res.lang !== lcalLang
        ) {
          // 重新请求clientToken凭证登录
          setValue({ ...contextValue, loginState: false })
          handleClientToken()
          return
        }
        setValue({ ...contextValue, loginState: true, token: token })
      }
    })
  }

  /** 重新登录 */
  // const handleReLogin = () => {
  //   handleClientToken()
  // }

  /** 登陆初始化 */
  const silentLogin = async () => {
    if (window.isApp) {
      if (window?.webkit) {
        // ios处理
        handleUserInfo()
      } else if (window?.Android) {
        // 安卓
        handleUserInfo()
      }
    } else {
      // 站外直接登录
      setValue({ ...contextValue, loginState: true, token: 'h5_no_token' })
    }
  }

  useEffect(() => {
    try {
      silentLogin()

      /**
       * 注意
       * 在./utils/pageRequest中有使用到该方法
       * */
      window.handleClientToken = handleClientToken
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  return contextValue
}

export default useLogin
