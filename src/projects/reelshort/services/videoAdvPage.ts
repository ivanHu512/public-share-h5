import request from '@reelshort/utils/request'

/**
 * H5书籍引流
 * @param book_id 书籍id
 * @returns
 */
export const getDrainage = (data: { book_id: string }) => {
  return request(`/api/video/book/drainage`, {
    method: 'POST',
    data
  })
}
