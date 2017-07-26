import { getCode, login, register, schoolQuery } from '../services/login'
import { routerRedux } from 'dva/router'
import { sleep } from '../utils'
import modelExtend from 'dva-model-extend'
import { counterModel, loadingModel, tableModel } from './modelExtend'
import pathToRegexp from 'path-to-regexp'
export default modelExtend(counterModel, tableModel, loadingModel, {
  namespace: 'login',
  state: {
    role: ''
  },
  subscriptions: {
    schoolsSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/admin/:params').exec(pathname)
        if (pathname === '/register' || match || pathname === '/student/signup') {
          dispatch({type: 'querySchools'})
        } else if (pathname === '/login') {
          dispatch({type: 'roleChange', payload: 'student'})
        }
      })
    }
  },
  effects: {
    * login ({payload}, {put, call, select}) {
      yield put({type: 'showLoading'})
      const {role = 'student'} = yield select(({login}) => login)

      const data = yield call(login, payload, role)

      yield sleep(1000)
      yield put({type: 'hideLoading'})

      if (data.code === 0) {
        const {data: {token, user}} = data
        if (user.role === 'school_admin') {
          user.role = 'school'
        }
        window.localStorage.setItem('nuedcToken', token)
        window.localStorage.setItem('nuedcRole', user.role)
        yield put({type: 'app/setUser', payload: user})
        yield put({type: 'app/setInfo', payload: {token: token, role: user.role}})

        yield put(routerRedux.push('/' + user.role))
      } else {
        window.localStorage.removeItem('nuedcToken')
        window.localStorage.removeItem('nuedcRole')
        yield put({type: 'app/setUser', payload: {}})
        yield put({type: 'app/setInfo', payload: {}})
      }
    },

    * logout ({}, {put}) {
      window.localStorage.removeItem('nuedcToken')
      window.localStorage.removeItem('nuedcRole')
      yield put({type: 'app/logout'})
      yield put(routerRedux.push('/'))
    },

    * getCode ({payload}, {call, put}) {
      const data = yield call(getCode, payload)
      if (data.code !== 0) {
        yield put({type: 'login/counterReset'})
      }
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
