const path = require('path')

export default {
  'entry': 'src/index.js',
  'disableCSSModules': true,
  'theme': './theme.config.js',
  'env': {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', {'libraryName': 'antd', 'style': true}]
      ],
    },
    'production': {
      'extraBabelPlugins': [
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', {'libraryName': 'antd', 'style': true}]
      ],
      "externals": {
        "react": "window.React",
        "react-dom": "window.ReactDOM"
      },
      // 'publicPath':'http://osxp7rsod.bkt.clouddn.com/',
      'autoprefixer': {
        'browsers': [
          'iOS >= 8', 'Android >= 4'
        ]
      }
    }
  }
}
