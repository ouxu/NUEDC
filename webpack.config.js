/**
 * Created by out_xu on 17/7/17.
 */
const webpack = require('webpack')

module.exports = function (webpackConfig, env) {
  // 对roadhog默认配置进行操作，比如：
  if (env === 'production') {
    webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  }
  return webpackConfig
}