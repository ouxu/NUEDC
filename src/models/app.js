import pathToRegexp from 'path-to-regexp'
export default {
  namespace: 'app',
  state: {
    user: {},
    token: window.localStorage.getItem('nuedcToken') || '',
    role: window.localStorage.getItem('nuedcRole') || 'student'
  },
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp(['/admin*', '/school*', '/student*']).exec(pathname)
        if (match) {
          dispatch({type: 'query'})
        }
      })
    }
  },
  effects: {
    * query ({payload}, {call, put, select}) {
      // const data = yield call(query, parse(payload))
      const {token, role} = yield select(({app}) => app)
    }
  },
  reducers: {
    querySuccess (state, {payload: user}) {
      return {
        ...state,
        user
      }
    },
    logout(state) {
      return {
        ...state,
        user: {}
      }
    },
    setInfo(state, {payload: {token, role}}) {
      return {
        ...state,
        token,
        role
      }
    },
    setUser(state, {payload: user}) {
      return {
        ...state,
        user
      }
    }
  }
}
