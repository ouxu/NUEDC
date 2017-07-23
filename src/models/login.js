import { getCode, login, register, schoolQuery } from '../services/login'
import { routerRedux } from 'dva/router'
import { queryURL, sleep } from '../utils'
import modelExtend from 'dva-model-extend'
import { counterModel, loadingModel, tableModel } from './modelExtend'

export default modelExtend(counterModel, tableModel, loadingModel, {
  namespace: 'login',
  state: {
    role: 'student'
  },
  subscriptions: {
    schoolsSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/register' || pathname === '/admin/contestRecord' || pathname === '/admin/schoolAdmin' || pathname === '/student/signup') {
          dispatch({type: 'querySchools'})
        }
      })
    }
  },
  effects: {
    * login ({payload}, {put, call, select}) {
      yield put({type: 'showLoading'})
      const {role} = yield select(({login}) => login)

      const data = yield call(login, payload, role)

      yield sleep(1000)
      yield put({type: 'hideLoading'})

      if (data.code === 0) {
        window.localStorage.setItem('nuedcToken', data.data.token)
        window.localStorage.setItem('nuedcRole', role)
        yield put({type: 'app/setUser', payload: data.data.user})
        yield put({type: 'app/setInfo', payload: {token: data.data.token, role: role}})
        const from = queryURL('from')
        yield put(routerRedux.push('/' + role))
      }
    },

    * logout ({}, {put}) {
      window.localStorage.removeItem('nuedcToken')
      window.localStorage.removeItem('nuedcRole')

      yield put({type: 'app/logout'})
      yield put(routerRedux.push('/'))
    },

    * getCode ({payload}, {call}) {
      const data = yield call(getCode, payload)
      console.log(data)
    },

    * register ({payload}, {put, call}) {
      const data = yield call(register, payload)
      if (data.code === 0) {
        const loginData = {
          identifier: payload.mobile,
          password: payload.password,
          client: 1
        }
        yield put({type: 'login', payload: loginData})
      }
    },
    * querySchools ({}, {put, call, select}) {
      const {table = []} = yield select(({login}) => login)
      if (table.length < 1) {
        const data = yield call(schoolQuery)
        if (data.code === 0) {
          yield put({type: 'setTable', payload: data.data.schools})
        }
      }
    }
  },
  reducers: {
    roleChange (state, {payload: role}) {
      return {
        ...state,
        role
      }
    }
  }
})
