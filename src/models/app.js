import { config } from '../utils'
const {prefix} = config

export default {
  namespace: 'app',
  state: {
    user: {}
  },
  subscriptions: {},
  effects: {
    * query ({payload}, {call, put}) {
      const data = yield call(query, parse(payload))
      if (data.success && data.user) {
        yield put({
          type: 'querySuccess',
          payload: data.user
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        if (location.pathname !== '/login') {
          let from = location.pathname
          if (location.pathname === '/dashboard') {
            from = '/dashboard'
          }
          window.location = `${location.origin}/login?from=${from}`
        }
      }
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
    setUser(state, {payload: user}) {
      return {
        ...state,
        user
      }
    }
  }
}
