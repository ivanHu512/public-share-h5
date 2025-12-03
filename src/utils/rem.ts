export function initRem(): void {
  const docEle = document.documentElement
  function setHtmlFontSize() {
    let deviceWidth = docEle.clientWidth || window.innerWidth
    if (deviceWidth >= 750) {
      deviceWidth = 750
    }
    if (deviceWidth <= 320) {
      deviceWidth = 320
    }
    const fontSize = deviceWidth / 7.5

    docEle.style.fontSize = fontSize.toFixed(3) + 'px'
  }
  setHtmlFontSize()
  window.addEventListener('resize', setHtmlFontSize)
}
