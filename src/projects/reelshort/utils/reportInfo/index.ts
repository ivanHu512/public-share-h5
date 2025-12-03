import { reportRequest } from '@reelshort/services/reportInfoServices'
import { getBrowser, getOperationSys, getPlatform } from './util'
import { IReportParams } from './types'

export class DataReportingSDK {
  /** 4.0上报版本号 */
  private VERSION = 'v1.0.0'
  /** 渠道号 */
  private CHANNEL_ID = 'WEB41001'
  /** 语言 */
  private LANGUAGE = ''
  /** 系统版本 */
  private OS_VERSION = ''
  /** 设备id */
  private DEVICE_ID = ''
  /** 修改公共参数方法
   */
  public setPublicParams({
    VERSION = 'v1.0.0',
    CHANNEL_ID = 'WEB41001',
    LANGUAGE = '',
    OS_VERSION = '',
    DEVICE_ID = ''
  }: {
    VERSION?: string
    CHANNEL_ID?: string
    LANGUAGE?: string
    OS_VERSION?: string
    DEVICE_ID?: string
  }) {
    this.VERSION = VERSION
    this.CHANNEL_ID = CHANNEL_ID
    this.LANGUAGE = LANGUAGE
    this.OS_VERSION = OS_VERSION?.replace(/(ios|android)/gi, '')?.trim() || ''
    this.DEVICE_ID = DEVICE_ID
  }
  /**
   * 通用事件上报
   * @param {string}  event_name 事件名
   * @param {string}  sub_event_name 子事件名
   * @param {string} properties 事件参数
   */
  public eventReport(params: {
    event_name: string
    sub_event_name?: string
    properties: any
  }) {
    const { event_name, sub_event_name, properties } = params
    const obj = {
      _event_name: event_name,
      _sub_event_name: sub_event_name,
      properties
    }
    !sub_event_name && delete obj._sub_event_name
    this.reportHandle(obj)
  }

  /**
   * 点击事件上报
   * @param {string}  eventName 子事件名
   * @param {string} properties 事件参数
   */
  public clickReport(params: { eventName: string; properties: any }) {
    const { eventName, properties } = params
    this.reportHandle({
      _event_name: 'm_custom_event',
      _sub_event_name: eventName,
      properties
    })
  }

  /**
   * 通用上报函数
   */
  public report(params: {
    _event_name: string
    properties: any
    _sub_event_name?: string
  }) {
    this.reportHandle(params)
  }

  /**
   * 错误日志上报
   */
  public errorLog = (params: {
    err_type:
      | 'login' // 登录失败
      | 'account_bind' // 账号绑定失败
      | 'pay' // 支付失败
      | 'play' // 播放失败
    [key: string]: any
  }) => {
    this.reportHandle({
      _event_name: 'm_error_log',
      properties: {
        ...params
      }
    })
  }

  /**
   * 处理上报参数函数
   * @param {string} _event_name 事件名
   * @param {string} _sub_event_name 子事件名
   * @param {any} properties 上报事件参数
   */
  private reportHandle(params: IReportParams) {
    const reportInfo = this.getBaseInfo()
    const data = {
      ...reportInfo,
      ...params
    }
    console.log('上报信息', params, data)
    // 调用上报接口函数
    this.reportInfoHandle(data)
  }

  /** 获取上报基本信息方法（因为基本信息包含时间类参数所以需要每次上报都重新获取一次） */
  private getBaseInfo() {
    /** 上报基本信息 */
    const baseInfo = {
      _app_id: 'cm1009',
      _package_name: 'h5',
      _app_channel_id: this.CHANNEL_ID,
      _app_version: this.VERSION,
      _app_game_version: '', // 传空
      _app_res_version: '', // 传空
      _app_install_id: localStorage.getItem('_app_install_id') || '', // install_id
      _app_activate_id: sessionStorage.getItem('_app_activate_id') || '', // 3.5 run_id
      _device_id: this.DEVICE_ID, // 传空
      _ad_id: '', // 传空
      _androidid: '', // 传空
      _idfv: '', // 传空
      _os_type: getPlatform(), // 获取平台id
      _os_version: this.OS_VERSION, // 有就报，没有就报空
      _os_timezone_offset: `utc_offset=-8:00`,
      _os_timestamp: Math.floor(new Date().getTime()), // 3.5 ctime
      _device_network_type: 0,
      _app_user_id: localStorage.getItem('uid') || '', // uuid
      _app_lang:
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.LANGUAGE || navigator?.language || navigator?.userLanguage || '', // 浏览器语言
      _event_name: '', // 之前的eid,A列的事件名称
      _sub_event_name: '', // 子事件名称， 默认传空字符串
      properties: {}
    }
    const h = new Date().getTimezoneOffset() / 60
    const m = (new Date().getTimezoneOffset() % 60).toString().padStart(2, '0')
    /** 时区 */
    baseInfo._os_timezone_offset = `utc_offset=${h}:${m}`
    /** 首次进入生成id */
    if (!localStorage.getItem('_app_install_id')) {
      const _app_install_id = String(
        Math.floor((Math.random() * 9 + 1) * 10000000)
      )
      baseInfo._app_install_id = _app_install_id
      localStorage.setItem('_app_install_id', _app_install_id.toString())
    }
    /** 每次打开会话生成id */
    if (!sessionStorage.getItem('_app_activate_id')) {
      const _app_activate_id = String(
        Math.floor((Math.random() * 9 + 1) * 10000000)
      )
      baseInfo._app_activate_id = _app_activate_id
      sessionStorage.setItem('_app_activate_id', _app_activate_id.toString())
    }
    return baseInfo
  }

  /** 发起上报、处理上报结果函数 */
  private async reportInfoHandle(data: any, _id = '') {
    const id = _id || String(new Date().getTime())

    const { res, error } = await reportRequest([data])

    console.log('上报结果', res, error)
    // 如果上报失败
    if (error || !res || res?.code !== 10000) {
      const local = JSON.parse(sessionStorage.getItem(id) || '{}')
      const step = local.step || 1

      // 如果步长大于3就直接取消这次上报
      if (step > 3) {
        sessionStorage.removeItem(id)
        return 0
      }
      // 将上报信息存在本地
      sessionStorage.setItem(id, JSON.stringify({ data, step }))
      setTimeout(() => {
        // 重新调用上报接口函数
        this.reportInfoHandle(JSON.parse(sessionStorage.getItem(id)!).data, id)
        // 步长加1
        sessionStorage.setItem(id, JSON.stringify({ data, step: step + 1 }))
      }, Math.pow(2, step) * 1000)
    } else {
      // 上报成功清除缓存

      sessionStorage.removeItem(id)
    }
  }
}

interface Window {
  reportSDK: any
}

const reportSDK = new DataReportingSDK()

export { reportSDK }
