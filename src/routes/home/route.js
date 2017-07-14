module.exports = {
  path: 'home',
  // childRoutes: [
  //   require('./info/route'),
  // ],
  getComponents(nextState, callback){
    require.ensure([], () => {
      callback(null, require('./index'))
    }, 'home.chunk')
  }
}
