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
      'autoprefixer': {
        'browsers': [
          'iOS >= 8', 'Android >= 4'
        ]
      }
    },
    'production': {
      'extraBabelPlugins': [
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', {'libraryName': 'antd', 'style': true}]
      ],
      'autoprefixer': {
        'browsers': [
          'iOS >= 8', 'Android >= 4', 'ie >=9'
        ]
      },
    }
  }
}
