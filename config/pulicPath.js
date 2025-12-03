/*
 * @Author: wuchuangzhen
 * @Date: 2021-04-02 14:20:45
 * @LastEditors: Zegel
 * @LastEditTime: 2021-04-08 11:35:22
 * @Description: file content
 */

const cdnDic = {
  prod: 'https://campaigns.oss-accelerate.aliyuncs.com/js_CDN/public-share-h5',
  test:
    'http://campaigns.oss-accelerate.aliyuncs.com/js_CDN/test-public-share-h5',
  gray: '//campaigns.oss-accelerate.aliyuncs.com/js_CDN/gray-public-share-h5'
}

function setPulicpath({ isEnvProduction, PROJECT_NAME, REACT_APP_ENV }) {
  const pathObj = {
    feedback: {
      prod:
        'https://campaigns.oss-accelerate.aliyuncs.com/js_CDN/public-share-h5/feedback',
      test:
        'http://campaigns.oss-accelerate.aliyuncs.com/js_CDN/test-public-share-h5/feedback'
    },
    chapters: {
      prod:
        'https://campaigns.oss-accelerate.aliyuncs.com/js_CDN/public-share-h5/chapters',
      test:
        'http://campaigns.oss-accelerate.aliyuncs.com/js_CDN/test-public-share-h5/chapters'
    },
    kiss: {
      // prod:
      //   '//campaigns.oss-accelerate.aliyuncs.com/js_CDN/public-share-h5/kiss',
      // //   'https://campaigns.oss-accelerate.aliyuncs.com/js_CDN/public-share-h5/kiss',
      // // prod: './',
      // gray:
      //   '//campaigns.oss-accelerate.aliyuncs.com/js_CDN/gray-public-share-h5/kiss',
      // test:
      //   '//campaigns.oss-accelerate.aliyuncs.com/js_CDN/test-public-share-h5/kiss'
      prod: '../',
      gray: '../',
      test: '../'
    },
    spotlight: {
      prod:
        'https://campaigns.oss-accelerate.aliyuncs.com/js_CDN/public-share-h5/spotlight',
      test:
        'http://campaigns.oss-accelerate.aliyuncs.com/js_CDN/test-public-share-h5/spotlight'
    },
    scream: {
      // prod:
      //   'https://campaigns.oss-accelerate.aliyuncs.com/js_CDN/public-share-h5/scream',
      prod: '../',
      gray: '../',
      test: '../'
      // 'http://campaigns.oss-accelerate.aliyuncs.com/js_CDN/test-public-share-h5/scream'
    },
    // cdn地址暂时是跟kiss一致为空
    reelshort: {
      prod: '../',
      gray: '../',
      test: '../'
    }
  }
  let publcPath = ''
  if (isEnvProduction) {
    publcPath = pathObj[PROJECT_NAME][REACT_APP_ENV]
  }
  return publcPath
}

const getCdnUrl = (REACT_APP_ENV, PROJECT_NAME) => {
  if (['kiss', 'scream', 'reelshort'].includes(PROJECT_NAME)) {
    return './'
  }
  return cdnDic[REACT_APP_ENV]
}

module.exports = {
  setPulicpath,
  getCdnUrl
}
