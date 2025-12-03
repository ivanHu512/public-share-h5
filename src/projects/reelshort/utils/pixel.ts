import { getLocationVars } from '@/utils/utils'

/** 域名pixel映射 */
const pixelMap: {
  hostname: string
  pixel?: any
  fb: string
  tt: string
}[] = [
  {
    hostname: 'stardust-h5.stardustgod.com',
    fb: '1176033869759437',
    tt: 'CI45HM3C77UBJAEBML5G'
  }
]

/** 获取对应域名下的配置 */
export const getDomainConfig = () => {
  const hostname = location.hostname
  const { mediaType = 'fb' }: { mediaType: 'fb' | 'tt' } = getLocationVars()
  const config =
    pixelMap.find((item) => item.hostname === hostname) || pixelMap[0]
  config.pixel = config[mediaType]
  // 没匹配上取kiss原来的配置
  return config
}
