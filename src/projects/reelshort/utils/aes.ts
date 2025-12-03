import CryptoJS from 'crypto-js'
import { decode, encode } from 'js-base64'
import { decompressSync, deflateSync, strFromU8, strToU8 } from 'fflate'

const AES_KEY = 'VvRSNGFynLBW7aCP'
const AES_IV = 'gLn8sxqpzyNjehDP'

/** aes解密 */
export function aesDescryptResponse(textStr = '') {
  if (
    !textStr ||
    textStr.indexOf('Error') > -1 ||
    typeof textStr !== 'string'
  ) {
    return {}
  }
  const key = CryptoJS.enc.Utf8.parse(AES_KEY)
  const iv = CryptoJS.enc.Utf8.parse(AES_IV)
  const bytes = CryptoJS.AES.decrypt(textStr, key, {
    mode: CryptoJS.mode.CBC,
    iv
  })
  const resultDecipher = bytes.toString(CryptoJS.enc.Base64)
  const secendDecodedText = decode(resultDecipher)
  const thirdDecodedText = atob(secendDecodedText)
  const willDecompressString = thirdDecodedText
  const charData = willDecompressString.split('').map(function (x) {
    return x.charCodeAt(0)
  })
  const binData = new Uint8Array(charData)
  const decompressed = decompressSync(binData)
  const origText = strFromU8(decompressed)
  return JSON.parse(origText)
}

/** aes加密 */
export const aesEncryptRequest = (params: object | string) => {
  if (!params) return ''
  const paramsText = JSON.stringify(params)
  const paramsTextToU8 = strToU8(paramsText)
  const compressedText: any = deflateSync(paramsTextToU8)
  const willDecompressString = String.fromCharCode(...compressedText)
  const firstBase64Text = btoa(willDecompressString)
  const secondBase64Text = encode(firstBase64Text)
  const decipherText = CryptoJS.enc.Base64.parse(secondBase64Text)
  const encryptedText = CryptoJS.AES.encrypt(
    decipherText,
    CryptoJS.enc.Utf8.parse(AES_KEY),
    {
      iv: CryptoJS.enc.Utf8.parse(AES_IV),
      mode: CryptoJS.mode.CBC
    }
  ).toString()

  return encryptedText
}

// 加密
export function aesEncrypt(text: string) {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      text,
      CryptoJS.enc.Utf8.parse(AES_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(AES_IV),
        mode: CryptoJS.mode.CBC
      }
    )
    return encode(encrypted.toString())
  } catch (error) {
    console.error('加密失败:', error)
    return ''
  }
}

/**
 * 解密方法
 */
export function aesDecrypt(textStr: string) {
  try {
    if (!textStr || typeof textStr !== 'string') {
      return ''
    }

    const decodedBase64 = decode(textStr)
    const key = CryptoJS.enc.Utf8.parse(AES_KEY)
    const iv = CryptoJS.enc.Utf8.parse(AES_IV)
    const decrypted = CryptoJS.AES.decrypt(decodedBase64, key, {
      iv,
      mode: CryptoJS.mode.CBC
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('解密失败:', error)
    return ''
  }
}
