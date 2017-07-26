import modelExtend from 'dva-model-extend'
import { getAllPassContest, getResult } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'

export default modelExtend(modalModel, tableModel, {
  namespace: 'studentScore',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/student/score'
        if (match) {
          dispatch({type: 'getAllPassContest', payload: query})
        }
      })
    }
  },
  effects: {
    * getAllPassContest ({payload}, {call, put, select}) {
      const allPassContest = yield call(getAllPassContest)
      if (allPassContest.code === 0) {
        yield put({type: 'saveFilter', payload: allPassContest.data.contestList})
        const {contest_id: contestId} = payload
        if (contestId) {
          const data = yield call(getResult, contestId)
          if (data.code === 0) {
            yield put({type: 'setTable', payload: data.data})
          }
        }
      }
    },
    * filter ({payload}, {put, select, call}) {
      const {contestsId} = yield select(({studentScore}) => studentScore)
      const data = yield call(getResult, contestsId)
      yield put({type: 'setTable', payload: data.data})
    }

  },
  reducers: {
    onFormSubmit (state, {payload}) {
      return {
        ...state,
        form: payload
      }
    },
    onFilter (state, {payload}) {
      return {
        ...state,
        contestsId: payload
      }
    },
    saveFilter (state, {payload}) {
      return {
        ...state,
        contest: payload
      }
    }
  }
})
