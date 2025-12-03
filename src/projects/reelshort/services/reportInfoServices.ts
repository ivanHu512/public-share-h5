import request from 'umi-request'
import { getEnv } from '@/utils/utils'
import zlib from 'zlib'

// todo 埋点待优化

const domains = {
  '4.0': {
    dev: 'https://dev-public-dta.stardustworld.cn/dt/api/event/log',
    test: 'https://dev-public-dta.stardustworld.cn/dt/api/event/log',
    gray: 'https://public-dta.stardustgod.com/dt/api/event/log',
    prod: 'https://public-dta.stardustgod.com/dt/api/event/log'
  }
}
const URL = domains['4.0'][getEnv()]

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function reportRequest(params: any): Promise<any> {
  const realParamsStr = JSON.stringify(params)
  const zlibStr = await zlib.deflateSync(realParamsStr)
  return new Promise<any>((resolve, reject) => {
    fetch(`${URL}`, {
      method: 'POST',
      keepalive: true,
      body: zlibStr.toString('base64')
    })
      .then((response) => {
        response.json().then((res) => {
          resolve({ res })
        })
      })
      .catch((error) => {
        resolve({ error })
      })
  })

  // return request(`${URL}`, {
  //   method: 'post',
  //   data: zlibStr.toString('base64')
  // })
  //   .then((response) => ({ response, error: null }))
  //   .catch((error) => ({ error, response: null }))
}
