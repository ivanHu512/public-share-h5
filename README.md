# 构建分支说明
由于分享页h5涉及不同项目，所以按照项目分别分为:
```bash
项目名     测试环境分支         正式环境分支
kiss      test-kiss-k8s      kiss-k8s
scream    test-scream-k8s    scream-k8s
chapter   test-chapter-k8s   chapter-k8s
feedback  test-feedback-k8s  feedback-k8s
reelshort test-reelshort-k8s reelshort-k8s
```

# 使用文档

stardust 的多项目移动端项目的整合项目，故在本项目内区分了将父级项目`chapters, spotlight, kiss, feedback, scream`进行了区分，将每一个父级项目看做一个多页面项目构建和打包，不能同时操作多个父级项目。运行或打包时通过可命令行选择打包项目和环境。

该项目基于[Create React App](https://github.com/facebook/create-react-app)构建.
要求 node.js 版本 > 14.13.0

具体技术栈请查看 package.json

## 项目域名

- Chapter

  - 测试环境: http://dev-h5.stardustworld.cn/chapters/join/?language=pt-PT
  - 正式环境: https://chapters.crazymaplestudios.com/chapters/join/?language=it-IT

- Feedback

  - 测试环境: http://dev-h5.stardustworld.cn/feedback/allfb/#/?version=622.0.2&channel=AVG10003&deviceName=samsung%20SM-G960U1&appid=cm1001&package-name=com.mars.avgchapters&uuid=40640254&devicePlatform=Android%20OS%2010%20%2F%20API-29%20%28QP1A.190711.020%2FG960U1UEU9FUE4%29&caseType=2&language=en-US&from=HelpFeedback&did=fe722b3a845fdc51
  - 正式环境: https://feedback.crazymaplestudios.com/feedback/allfb/#/?version=622.0.2&channel=AVG10003&deviceName=samsung%20SM-G960U1&appid=cm1001&package-name=com.mars.avgchapters&uuid=40640254&devicePlatform=Android%20OS%2010%20%2F%20API-29%20%28QP1A.190711.020%2FG960U1UEU9FUE4%29&caseType=2&language=en-US&from=HelpFeedback&did=fe722b3a845fdc51

- Kiss

  - 测试环境: http://dev-h5.stardustworld.cn/kiss/shareBookPage.html?bookId=5f80899554ba1e74b8578306
  - 正式环境:

- Spotlight

  - 测试环境:
  - 正式环境:

- Scream
  - 测试环境:
  - 正式环境:

## 开发运行时

```bash
# 1. 第一种通过命令行选择构建项目和环境
$ npm run start
$ npm run start-test
$ npm run start-prod

# 2. 直接在package.json的script中指定项目和环境
# "start-kiss-dev": "cross-env PROJECT_NAME=kiss REACT_APP_ENV=dev node scripts/start.js $*",
# "build-kiss-prod": "cross-env PROJECT_NAME=kiss REACT_APP_ENV=prod node scripts/build.js $*",
```

## 打包

```bash
# 1. 第一种通过命令行选择构建项目和环境
$ npm run build:test
$ npm run build:gray
$ npm run build:prod

# 2. 直接在package.json的script中指定项目和环境
# "build-kiss-dev": "cross-env PROJECT_NAME=kiss REACT_APP_ENV=dev node scripts/build.js $*",
# "build-kiss-prod": "cross-env PROJECT_NAME=kiss REACT_APP_ENV=prod node scripts/build.js $*",
```

运行和打包命令具体请查看 package.json

## 父级项目的子项目页面入口

**该项目将`/src/projects/${env.PROJECTNAME}/pages`的下一级所有文件夹中的 index.js 或 index.tsx 作为入口文件**

请遵守该规则

## 目录结构

```bash
├── README.md
├── config
│   ├── env.js
│   ├── getHttpsConfig.js
│   ├── jest
│   ├── modules.js
│   ├── paths.js # webpack paths
│   ├── pnpTs.js
│   ├── proxy.js # 代理地址
│   ├── webpack.config.js  # webpack 公共配置
│   └── webpackDevServer.config.js # webpack-dev-server 配置
├── public
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js # run build逻辑文件
│   ├── prompt.js # 构建时命令行获取项目信息的方法
│   ├── start.js # run start逻辑文件
│   └── test.js
├── src
│   ├── projects
│   │   ├── kiss
│   │   │   ├── assets # 父项目的公共静态文件
│   │   │   │   ├── icons
│   │   │   │   └── logos
│   │   │   ├── components # 父项目的公共组件
│   │   │   │   ├── CopyRight
│   │   │   │   └── ToKissFooter
│   │   │   ├── pages # 子项目列表
│   │   │   │   └── shareBookPage
│   │   │   │       ├── App.scss
│   │   │   │       ├── App.tsx
│   │   │   │       ├── assets # 子项目的静态文件
│   │   │   │       │   ├── bg_shade.png
│   │   │   │       │   ├── icon_complete.png
│   │   │   │       │   ├── icon_ongoing.png
│   │   │   │       │   ├── icon_read.png
│   │   │   │       │   └── icon_tag.png
│   │   │   │       ├── index.html # 子项目模板
│   │   │   │       └── index.js # 子项目入口文件
│   │   │   ├── services # 子项目接口
│   │   │   └── utils # 子项目公共函数
│   │   ├── chapters
│   │   └── spotlight
│   ├── react-app-env.d.ts # 父项目公共d.ts
│   ├── serviceWorker.ts
│   ├── styles
│   │   └── defaultStyles.scss # 公共默认样式
│   └── utils # 公共函数
│       ├── clip.ts
│       ├── domains.js # 公共项目域名 (已有feedback上报)
│       ├── rem.ts # 移动端rem相关函数
│       ├── request.js # umi-request
│       └── utils.ts
├── package-lock.json
├── package.json
├── prettier.config.js
└── tsconfig.json
```

> 待完善


##### import { Button } from 'antd-mobile-v5'