// import {
//   clickGet as _clickGet,
//   _currentGet
// } from '@reelshort/utils/reportInfo/reportedMethods'
import { IClickGet, ICurrentGet } from '@reelshort/utils/reportInfo/types'

export const clickGet = (param: Partial<IClickGet>) => {
  // const _param = {
  //   parm5: 'h5_activity_thanksgiving_page_click',
  //   parm10: location.href,
  //   ...param
  // }
  // return _clickGet(_param)
}
export const currentGet = (param: ICurrentGet) => {
  // const _param = {
  //   ...param
  // }
  // return _currentGet(_param)
}

/** 2022白色情人节点击上报
 * parm4 2
 */
export const clickChristmas = (param: Partial<IClickGet>) => {
  // const _param = {
  //   parm4: 2,
  //   parm5: '',
  //   parm9: location.href,
  //   ...param
  // }
  // return _clickGet(_param)
}
