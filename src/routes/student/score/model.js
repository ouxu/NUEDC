import modelExtend from 'dva-model-extend'
import { getAllPassContest, getResult } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { routerRedux } from 'dva/router'
export default modelExtend(modalModel, tableModel, {
  namespace: 'studentScore',
  state: {
    contest: []
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/student/score'
        if (match) {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload}, {call, put, select}) {
      let {contest = []} = yield select(({studentScore}) => studentScore)
      if (contest.length === 0) {
        const {data: allPassContest = {}} = yield call(getAllPassContest)
        contest = allPassContest.contestList || [{}]
        yield put({type: 'saveContest', payload: contest.reverse()})
      }
      const {contest_id: contestId} = payload
      if (contestId) {
        if (contestId === 'none') return

        const data = yield call(getResult, contestId)
        if (data.code === 0) {
          yield put({type: 'setTable', payload: data.data})
        }
      } else {
        yield put(routerRedux.push(`/student/score?contest_id=` + (contest[0].id || 'none')))
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
    saveContest (state, {payload}) {
      return {
        ...state,
        contest: payload
      }
    }
  }
})
