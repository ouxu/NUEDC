import { exportF, query } from '../services/app'
export default {
  namespace: 'app',
  state: {
    user: {},
    token: window.localStorage.getItem('nuedcToken') || '',
    role: window.localStorage.getItem('nuedcRole') || 'student'
  },
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(() => {
        !!window.localStorage.getItem('nuedcToken') && dispatch({type: 'query'})
      })
    }
  },
  effects: {
    * query ({}, {call, put, select}) {
      const data = yield call(query)
      // const res = yield call(exportF, {filename: '1.xlsx'})
      if (data.code === 0) {
        const {user} = yield select(({app}) => app)
        if (!user.id) {
          yield put({type: 'setUser', payload: data.user})
        }
      } else {
        yield put({type: 'setInfo', payload: {token: '', role: 'student'}})
        window.localStorage.removeItem('nuedcToken')
        window.localStorage.removeItem('nuedcRole')
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
