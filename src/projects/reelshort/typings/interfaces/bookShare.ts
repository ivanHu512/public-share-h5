export interface IBookSharePageURLQueryParams {
  bookId: string
  type: number
  randomId?: string
  pushType: number
  isForTest?: boolean
}

export interface CustomDeeplinkParams {
  parm1: string
  [other: string]: string
}
export interface ISharePageURLQueryParams {
  customParams: CustomDeeplinkParams
  parm1?: string // 不知道做什么先作为选填项
  type: number
  randomId?: string
  pushType: number
  isForTest?: boolean
  // 进入app的阅读器类型  1=>小说  2=> 听书  3=>漫画
  contentType?: 1 | 2 | 3
}
