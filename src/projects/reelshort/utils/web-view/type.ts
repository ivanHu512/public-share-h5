export type ICallback = (response?: any) => void
export interface WebviewParams {
  callback?: ICallback
  parameter?: Array<Array<any>>
}

export class IWebView {
  [key: string]: any
}
