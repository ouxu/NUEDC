import modelExtend from 'dva-model-extend'
import { fetchTable, fetchTablePass } from './service'
import { alertModel, inputModel, modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, alertModel, inputModel, {
  namespace: 'studentContest',
  state: {
    tablePass: []
  },
  subscriptions: {
    studentContestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/student/contest' || pathname === '/student'
        if (match) {
          dispatch({type: 'fetchTable'})
        }
      })
    }
  },

  effects: {
    * fetchTable ({payload = false}, {call, select, put}) {
      const table = yield select(({studentContest}) => studentContest.table)
      if (table.length === 0 || payload) {
        // 已有数据或者不需要强制跟新，不需要获取
        const data = yield call(fetchTable)
        const dataPass = yield call(fetchTablePass)
        if (data.code === 0) {
          yield put({type: 'setTable', payload: data.data})
        }
        if (dataPass.code === 0) {
          yield put({type: 'setTablePass', payload: data.contestList})
        }
      }
    }
  },
  reducers: {
    setTablePass(state, {payload: tablePass}) {
      return {
        ...state,
        tablePass
      }
    }
  }
})
