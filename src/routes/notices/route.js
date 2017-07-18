const Notice = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./index'))
  })
}
const NoticeContent = (nextState, callback) => {
  require.ensure([], () => {
    callback(null, require('./NoticeContent/index'))
  })
}

export { Notice, NoticeContent }