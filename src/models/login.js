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
        const user = {
          code_length: 0,
          created_at: '2017-01-07 10:39:16',
          email: 'out_xu@outlook.com',
          id: 5807,
          login_name: 'out_xu',
          mobile: '15603315002',
          name: 'out_xu',
          school: 'neuq',
          signature: null,
          solved: 0,
          status: 1,
          submit: 5,
          updated_at: '2017-04-23 03:34:23',
          privilege: 'admin'
        }
        yield put({type: 'app/setUser', payload: user})
        const from = queryURL('from')
        yield put(routerRedux.push(from || '/admin'))
      }
    },
    * logout ({}, {put, call}) {
      window.localStorage.removeItem('nuedcToken')
      yield put({type: 'app/logout'})
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
