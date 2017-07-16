export default {
  namespace: 'chooseProblem',
  state: {
    miaomiao: ''
  },
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/student/choose') {
          dispatch({type: 'contest/fetchTable'})
        }
      })
    }
  },
  effects: {},
  reducers: {}
}
