export default {
  namespace: 'problem',
  state: {
    miaomiao: ''
  },
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/admin/problem') {
          dispatch({type: 'contest/fetchTable'})
        }
      })
    }
  },
  effects: {},
  reducers: {}
}
