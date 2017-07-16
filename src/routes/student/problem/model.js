export default {
  namespace: 'studentProblem',
  state: {
    miaomiao: ''
  },
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/student/problem') {
          dispatch({type: 'contest/fetchTable'})
        }
      })
    }
  },
  effects: {},
  reducers: {}
}
