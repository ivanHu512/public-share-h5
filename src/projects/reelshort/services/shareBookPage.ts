import request from '@reelshort/utils/request'

/**
 * 获取书籍信息
 * @param book_id 书籍id
 * @returns
 */
export const getBookInfo = (book_id: string) => {
  return request(`/api/video/book/getH5ShareInfo?book_id=${book_id}`)
}
