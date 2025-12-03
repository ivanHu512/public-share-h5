export interface IBook {
  /** 书籍id */
  book_id?: string
  _id: string
  /** 书籍标题 */
  book_title: string
  /** 书籍封面 */
  book_pic: string
  /** 书籍简介 */
  book_desc: string
  /** 书籍剩余总花费 0表示已经拥有 */
  price: number
  /** 阅读数 */
  read_count?: number
  /** 主题 */
  theme?: string[]
  /** 标签 */
  tag?: string[]

  [rest: string]: any
}
