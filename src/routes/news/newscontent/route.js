/**
 * Created by Pororo on 17/7/11.
 */
module.exports = {
  path: 'newscontent',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    }, 'newscontent.chunk')
  }
}
