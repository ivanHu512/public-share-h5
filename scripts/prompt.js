let inquirer = require('inquirer')
const promptStartList = [
  {
    type: 'list',
    message: '请选择项目:',
    name: 'project',
    choices: [
      'kiss',
      'chapters',
      'spotlight',
      'feedback',
      'scream',
      'reelshort'
    ],
    default: 'reelshort', // 默认值
    show: !process.env.PROJECT_NAME // 是否显示
  },
  {
    type: 'list',
    message: '请选择接口环境',
    name: 'env',
    choices: ['test', 'prod', 'dev', 'gray'],
    default: 'test',
    show: !process.env.REACT_APP_ENV // 是否显示
  }
]

const promptBuildList = [
  {
    type: 'list',
    message: '请选择项目:',
    name: 'project',
    choices: [
      'kiss',
      'chapters',
      'spotlight',
      'feedback',
      'scream',
      'reelshort'
    ],
    default: 'reelshort', // 默认值
    show: !process.env.PROJECT_NAME // 是否显示
  }
]

const promptStart = () => {
  return inquirer
    .prompt(promptStartList.filter((item) => item.show))
    .then((answers) => {
      if (answers.project) process.env.PROJECT_NAME = answers.project
      if (answers.env) process.env.REACT_APP_ENV = answers.env
      console.log('running')
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(error.isTtyError)
        // Prompt couldn't be rendered in the current environment
      } else {
        console.log('Something is wrong')
        // Something else when wrong
      }
      process.exit(1)
    })
}

const promptBuild = () => {
  return inquirer
    .prompt(promptBuildList.filter((item) => item.show))
    .then((answers) => {
      if (answers.project) process.env.PROJECT_NAME = answers.project
      if (answers.env) process.env.REACT_APP_ENV = answers.env
      console.log('Building')
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(error.isTtyError)
        // Prompt couldn't be rendered in the current environment
      } else {
        console.log('Something is wrong')
        // Something else when wrong
      }
      process.exit(1)
    })
}

module.exports.promptStart = promptStart
module.exports.promptBuild = promptBuild
