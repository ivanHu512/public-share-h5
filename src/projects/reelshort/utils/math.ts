/**
 * 生成kiss人数或阅读量字符串
 */
export const getKissNumber = (count: number): string => {
  if (count > 1000) {
    if (count < 1000000) {
      if (count % 1000 === 0) {
        return `${Math.floor(count / 1000)}k`
      } else {
        return `${Math.floor(count / 1000)}k+`
      }
    }
    if (count < 1000000000) {
      if (count % 1000000 === 0) {
        return `${Math.floor(count / 1000000)}m`
      } else {
        return `${Math.floor(count / 1000000)}m+`
      }
    }
    return `999m+`
  }
  return `${count}`
}

export const getKissDecimalsNumber = (count: number): string => {
  if (count >= 1000) {
    if (count < 1000000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    if (count < 1000000000) {
      return `${(count / 1000000).toFixed(1)}m`
    }
    return `999.9m`
  }
  return `${count}`
}
