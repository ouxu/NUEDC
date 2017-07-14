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
        ['import', {'libraryName': 'antd', 'style': true}]
      ],
    },
    'production': {
      'extraBabelPlugins': [
        'transform-runtime',
        ['import', {'libraryName': 'antd', 'style': true}]
      ],
      // 'publicPath':'http://osxp7rsod.bkt.clouddn.com/',
      'autoprefixer': {
        'browsers': [
          'iOS >= 8', 'Android >= 4'
        ]
      }
    }
  }
}
