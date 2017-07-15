import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import { queryURL, sleep } from '../utils'

export default {
  namespace: 'login',
  state: {
    loginLoading: false
  },
  effects: {
    * login ({payload}, {put, call}) {
      yield put({type: 'showLoginLoading'})
      const data = yield call(login, payload)
      yield sleep(1000)
      yield put({type: 'hideLoginLoading'})
      if (data.code === 0) {
        window.localStorage.setItem('nuedcToken', data.data.token)
        const from = queryURL('from')
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          window.localStorage.removeItem('nuedcToken')
          yield put(routerRedux.push('/admin'))
        }
      }
    },
    * logout ({payload}, {put, call}) {
      yield put(routerRedux.push('/'))
    }
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false
      }
    }
  }
}
