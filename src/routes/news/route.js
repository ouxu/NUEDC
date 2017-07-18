const News = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./index'))
  })
}
const NewsContent = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./newscontent/index'))
  })
}

export { News, NewsContent }