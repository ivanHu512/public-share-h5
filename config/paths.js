const path = require('path')
const fs = require('fs')
const glob = require('glob')
const chalk = require('react-dev-utils/chalk')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')

// 通过命令获取到的项目名称
// 需要保证大小写一致
const { PROJECT_NAME } = process.env

// 通过命令获取到的页面文件夹名称
const pageNameList = process.argv.slice(2)

// if (pageNameList.length !== 1) {
//   console.log(chalk.red('error: 一次只能运行或打包一个子项目'))
//   process.exit(1)
// }

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
)

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx'
]

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  )

  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }

  return resolveFn(`${filePath}.js`)
}

// 读取src目录该主项目下的该子项目中所有page入口
const entryPath = `./src/projects/${PROJECT_NAME}/pages/*/index`
// const entryPath = `./src/projects/${PROJECT_NAME}/${pageNameList[0]}/index`
const entriesPath = glob
  .sync(`${entryPath}.js`)
  .concat(glob.sync(`${entryPath}.tsx`))
  .map(function (filePath) {
    let tmp = filePath.split('/')
    let name = tmp[tmp.length - 2]
    return { path: filePath, name }
  })

// TODO: 停滞在 一个父项目是作为多页面项目 还是 每一个父项目的子项目作为一个单页面项目打包

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  dist: resolveApp(`dist`),
  appPath: resolveApp('.'),
  // appBuild: resolveApp('build'),
  appBuild: resolveApp(`dist/${PROJECT_NAME}`),
  // 分项目的build路径
  // projectBuild: resolveApp(`build-${PROJECT_NAME}`),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  // appIndexJs: resolveModule(resolveApp, getEntry()),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrlOrPath,
  // 区分项目
  entriesPath,
  pageNameList,
  PROJECT_NAME,
  // 父项目相对路径
  projectPublic: resolveApp(`src/projects/${PROJECT_NAME}/pages/`)
  // 子项目(页面)路径
  // pagePublic: resolveApp(`src/${PROJECT_NAME}/${pageNameList[0]}`),
}

module.exports.moduleFileExtensions = moduleFileExtensions
