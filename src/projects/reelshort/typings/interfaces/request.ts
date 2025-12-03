export interface ResponseData<T> {
  readonly code: number
  readonly data: T | any
  readonly msg: string
  readonly server_time?: number
}

export interface IDrainageData {
  drainage_id: string
  book_id: string

  next_chapter_id: number
  // 标题
  title: string
  // 推荐语
  recommend: string
  // 封面
  cover: string
  // 章节数据
  chapters: Array<{
    title: string
    content: Array<string>
  }>
}
