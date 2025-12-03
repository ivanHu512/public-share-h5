export interface IData {
  book_id?: string
  t_book_id?: string
  book_pic?: string
  chapter_id?: string
  shelf_id?: string
  hours?: number
  valid_status?: number
  date?: string
  rent_count_down?: number
  book_title?: string
  buy_status?: number
  buy_type?: number
  chapter_count?: number
  tag?: Array<string>
  rent_product?: {
    gid: number
    type: number
    channel_id: string
    gname: string
    coins: number
    original_coins: number
    price: string
    product_id: string
    rate_tag: number
    bonus: number
    bonus_expire_day: number
    web_product_id: string
    days: number
    limit_times: number
  }
  buy_product?: {
    gid: number
    type: number
    channel_id: string
    gname: string
    coins: number
    original_coins: number
    price: string
    product_id: string
    rate_tag: number
    bonus: number
    bonus_expire_day: number
    web_product_id: string
    days: number
    limit_times: number
  }
}
