import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import { codeHelper, queryURL } from '../utils'

export default {
  namespace: 'login',
  state: {
    loginLoading: false
  },
  effects: {
    * login ({payload}, {put, call}) {
      yield put({type: 'showLoginLoading'})
      const data = yield call(login, payload)
      yield put({type: 'hideLoginLoading'})
      if (data.code === '0') {
        const from = queryURL('from')
        yield put({type: 'app/query'})
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/admin'))
        }
      } else {
        codeHelper(data.code)
      }
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
