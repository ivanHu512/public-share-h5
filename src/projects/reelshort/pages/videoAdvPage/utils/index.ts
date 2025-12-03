export * from './env'

export * from './type'

// export * from './buried-point'

// 获取屏幕缩放比例
export function getRatio() {
  let ratio = 0
  const screen = window.screen
  const ua = navigator.userAgent.toLowerCase()

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio
  } else if (ua.indexOf('msie') !== -1) {
    // @ts-ignore
    if (screen?.deviceXDPI && screen?.logicalXDPI) {
      // @ts-ignore
      ratio = screen?.deviceXDPI / screen?.logicalXDPI
    }
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    ratio = window.outerWidth / window.innerWidth
  }

  if (ratio) {
    ratio = Math.round(ratio * 100)
  }
  return ratio
}
