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
          dispatch({type: 'fetchTable'})
        }
      })
    }
  },

  effects: {
    * fetchTable ({payload = false}, {call, select, put}) {
      const data = yield call(fetchTable)
      const dataPass = yield call(fetchTablePass)
      const dataSignUp = yield call(fetchTableSignUp)
      if (data.code === 0) {
        yield put({type: 'setTable', payload: data.data})
      }
      if (dataSignUp.code === 0) {
        yield put({type: 'setTableSignUp', payload: dataSignUp.data})
      }
      if (dataPass.code === 0) {
        yield put({type: 'setTablePass', payload: dataPass.data.contestList})

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
