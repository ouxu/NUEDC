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
    * init ({payload: pathname}, {call, select, put}) {
      let {tablePass = [], tableSignUp = [], table = []} = yield select(({studentContest}) => studentContest)
      if (pathname === '/student' && table.length === 0) {
        const {data: contestTable = []} = yield call(fetchTable)
        yield put({type: 'setTable', payload: contestTable.reverse()})
      }
      if (tablePass.length === 0) {
        yield put({type: 'fetchTablePass'})
      }
      if (tableSignUp.length === 0) {
        yield put({type: 'fetchTableSignUp'})
      }
    },
    * fetchTablePass ({}, {call, put}) {
      const {data: {contestList = []}} = yield call(fetchTablePass)
      yield put({type: 'setTablePass', payload: contestList.reverse()})
    },
    * fetchTableSignUp ({}, {call, put}) {
      const {data = []} = yield call(fetchTableSignUp)
      yield put({type: 'setTableSignUp', payload: data.reverse()})
    }
  },
  reducers: {
    setTablePass (state, {payload: tablePass}) {
      return {
        ...state,
        tablePass
      }
    },
    setTableSignUp (state, {payload: tableSignUp}) {
      return {
        ...state,
        tableSignUp
      }
    }
  }
})
