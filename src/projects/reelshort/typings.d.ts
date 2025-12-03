interface Window {
  handleClientToken: () => void
  isApp: boolean
  /** 用于闪屏页跳转限制 解决fbp和fbc上报失败问题 - 倒计时时间戳 */
  countdownRef: number
  /** 用于闪屏页跳转限制 解决fbp和fbc上报失败问题 - 是否禁止首次send跳转 */
  notAllowW2AJump: boolean
  /** 用于闪屏页跳转限制 解决fbp和fbc上报失败问题 - 上报重试次数 */
  reportRetry: number
  /** 自定义提示 */
  rs_toast?: RsToastProps
}

interface RsToastProps {
  show?: (text: string) => void
}
