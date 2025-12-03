/** 上报数据参数 */
export interface IReportParams {
  _event_name: string
  _sub_event_name?: string
  properties: { [key: string]: any }
  [key: string]: any
}

/** 基础对象接口 */
interface IBaseInfo {
  eid?: number // 上报事件id
  channel_id: number // 渠道id(详见说明)
  install_id: number // 第一次加载网站生成，8位随机码
  run_id: number //	每个对话session刷新一次，8位随机码
  ctime: number // 客户端事件触发时间戳
  netstatus: number // 当前网络环境（未知=0，wifi=1 蜂窝网络=2）
  platform: number // 设备平台（Android=1 IOS=2 WINDOWS/MAC=3 WEB浏览器=3）
  uuid: string // 用户UUID
  language: string // 语言属性值
  version: string // WEB更新版本号
  cversion: string // 不上报
}

/** click_get接口、event_get接口 */
interface IClickGet {
  eid?: number // 上报事件id
  parm1?: number // 自定义参数
  parm2?: number // 自定义参数
  parm3?: number // 自定义参数
  parm4?: number // 自定义参数
  parm5: string //	事件名称
  parm6?: string // 自定义参数
  parm7?: string // 自定义参数
  parm8?: string // 自定义参数
  parm9?: string // 前页面URL
  parm10?: string // AB测配置信息
  parm11?: number // 自定义参数
}

/** book_get接口 */
interface IBookGet {
  eid?: number // 上报事件id
  parm1: number // 相关操作ID
  parm3?: number //	当前自动解锁章节开启状态（1=开启 2=关闭）
  parm4?: number // 默认为0
  parm5?: string // 当前阅读章节ID
  parm6: string //	当前阅读进入书籍ID
  parm7: string //	当前游戏场景位置
  parm8: string // 书籍入口
  parm9?: string // 前页面URL
  parm10: string // "当前书籍类型：1=Novel 2=Audio 3=Comic"
}

/** bookGetParam参数 */
interface bookGetParam {
  book_id: string
  scenario?: string
  chapter_id?: string
  percent?: number
  book_type: string
  source: string
  type: number
}

/** 默认各种_get接口 */
interface ICurrentGet {
  eid?: number //   上报事件id 5
  parm1?: number // 虚拟币类型(金币=1 付费bonus=2 免费bonus=3)
  parm2?: number // 变化增量
  parm3?: number // 变化前数值
  parm5?: string //	游戏场景位置
  parm6?: string // 虚拟币变化触发位置
  parm7?: string // 如果有，相关联的章节ID
  parm8?: string // 如果有，相关联的书籍ID(如果有多本，用’,’拼接上报)
  parm9?: string // tag来源 (1=Novel 2=Audio 3=Comic，若不区分小说和漫画，默认上报 1) (历史原因所以写了两种类型)
  parm10?: string // 变化增量按照 COINS+BONUS方式上报，例如4coins 2bouns报4+2，消耗则直接报总和
  parm11?: number // 用户标记（非订阅用户=0 订阅用户=1 有过订阅但是过期的用户=2）
}

/** error事件上报参数 */
interface IErrorGet {
  eid?: number // 上报事件id 8
  parm1?: number // 失败业务id
  parm2?: number // error code
  parm5?: string // 失败接口名/失败文件名/解压失败文件名
  parm6?: string // 接口域名
  parm8?: string // 失败相关详细信息（支付失败错误信息/接口错误信息/下载失败错误信息）
}

/** 支付事件上报参数 */
interface IPayGet {
  eid?: number // 上报事件id
  parm1?: number // 默认0
  parm2?: number //	场景位置 0
  parm3?: number //	页面ID(1=常规H5页面 2=H5独立商城页,即从app跳转到此商城页)
  parm4?: number // 当处于折扣购买时，报折扣前价格(单位：美分)
  parm5?: string // 付费状态（详见底部说明）
  parm6?: string //	服务器生成订单号（transaction_id）
  parm7?: string //	支付平台订单号（order_id）
  parm8?: string // 计费点代码(sku)
  parm9?: string // 快捷支付对应书籍章节ID 0
  parm10?: string // 快捷支付对应书籍ID 0
  parm11?: number // 计费点价格（单位：美分）
}

/** reportHandle 函数接口 */
interface IReportHandleParm {
  type: number
  param?: IBookGet | IClickGet | number | ICurrentGet | IErrorGet | IPayGet
}

export {
  IBaseInfo,
  IReportHandleParm,
  IClickGet,
  IBookGet,
  bookGetParam,
  ICurrentGet,
  IErrorGet,
  IPayGet
}
