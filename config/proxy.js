const kiss = {
  dev: {
    target: 'http://172.16.20.51:16001', // kiss开发环境接口地址
    // target: 'http://dev_projecty_api.stardustworld.cn',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  test: {
    target: 'http://dev_projecty_api.stardustworld.cn',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  prod: {
    target: 'http://kiss-api-dcdn.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  gray: {
    target: 'http://gray-kiss-game-api-aws.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  }
}

const feedback = {
  dev: {
    target: 'http://dev_feedback_api_sz.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  test: {
    target: 'http://dev_feedback_api_sz.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  prod: {
    target: 'https://feedback-api.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  }
}

const spotlight = {
  dev: {
    target: 'http://dev_projecty_api.stardustworld.cn/',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  test: {
    target: 'http://dev_projecty_api.stardustworld.cn/',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  prod: {
    target: 'http://projecty_api.stardustworld.cn/',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  }
}
// chapters 还没有代理路径，先拿feedbac的顶一下
const chapters = {
  dev: {
    target: 'http://dev_feedback_api_sz.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  test: {
    target: 'http://dev_feedback_api_sz.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  prod: {
    target: 'http://dev_feedback_api_sz.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  }
}

const scream = {
  dev: {
    target: 'https://dev-project-t-api.stardustworld.cn',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  test: {
    target: 'https://dev-project-t-api.stardustworld.cn',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  prod: {
    target: 'https://kiss-api-dcdn.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  gray: {
    target: 'https://gray-kiss-game-api-aws.stardustgod.com',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  }
}

// reelshort接口
const reelshort = {
  dev: {
    target: 'https://dev-project-v-api.stardustworld.cn/',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  test: {
    target: 'https://dev-project-v-api.stardustworld.cn/',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  prod: {
    target: 'https://v-api.stardustgod.com/',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  },
  gray: {
    target: 'https://gray-v-api.stardustgod.com/',
    changeOrigin: true,
    pathRewrite: {
      '^': ''
    }
  }
}

module.exports = {
  kiss,
  feedback,
  spotlight,
  chapters,
  scream,
  reelshort
}
