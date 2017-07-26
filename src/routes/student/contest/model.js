import modelExtend from 'dva-model-extend'
import { fetchTable, fetchTablePass, fetchTableSignUp } from './service'
import pathToRegexp from 'path-to-regexp'
import { alertModel, inputModel, modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, alertModel, inputModel, {
  namespace: 'studentContest',
  state: {
    tablePass: [],
    tableSignUp: []
  },
  subscriptions: {
    studentContestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/student/:params').exec(pathname)
        if (match || pathname === '/student') {
          dispatch({type: 'init', payload: pathname})
        }
      })
    }
  },
  effects: {
    * init  ({payload: pathname}, {call, select, put}) {
      if (pathname === '/student') {
        const {data: contestTable = []} = yield call(fetchTable)
        yield put({type: 'setTable', payload: contestTable})
      }
      let {tablePass = [], tableSignUp = []} = yield select((studentContest) => studentContest)
      if (tablePass.length === 0) {
        const {data: {contestList = []}} = yield call(fetchTablePass)
        yield put({type: 'setTablePass', payload: contestList.reverse()})
      }
      if (tableSignUp.length === 0) {
        const {data = []} = yield call(fetchTableSignUp)
        yield put({type: 'setTableSignUp', payload: data.reverse()})
      }
    }
  },
  reducers: {
    setTablePass(state, {payload: tablePass}) {
      return {
        ...state,
        tablePass
      }
    },
    setTableSignUp(state, {payload: tableSignUp}) {
      return {
        ...state,
        tableSignUp
      }
    }
  }
})
