import Clipboard from 'clipboard'

/**
 * 复制到剪贴板
 * @params {string} text 复制到剪贴板的文字
 * @params {DOMElement string} nodeLink 触发复制的dom元素地址 querySeletor的参数
 * @params {function} successCallback 成功的回调
 * @params {function} errorCallback 失败的回调
 */
const bindElementToClipBoard = (text: string, nodeLink: string, successCallback: () => void, errorCallback: () => void) => {
  const clipboard = (event: any) => {
    const cb = new Clipboard('.t', {
      text: () => text
    })
    cb.on('success', () => {
      successCallback?.()
      cb.off('success')
    })
    cb.on('error', () => {
      errorCallback?.()
      cb.off('error')
    })
    cb.onClick(event)
  }
  const btn = document.querySelector(nodeLink)
  btn?.addEventListener('click', (event) => {
    clipboard?.(event)
  })
}

export default bindElementToClipBoard
