/**
 * Created by Pororo on 17/7/14.
 */
import modelExtend from 'dva-model-extend'
import { fetchProblems } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'studentProblem',
  state: {
    selectInfo: {}
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/student/problem'
        if (match) {
          console.log(query)
          dispatch({type: 'fetchProblems', payload: {query}})
        }
      })
    }
  },
  effects: {
    * fetchProblems ({query}, {call, put, select}) {
      if (!!query) {
        const data = yield call(fetchProblems, query.contest_id)
        if (data.code === 0) {
          const {problemList, problemSelectInfo} = data.data
        }
      }
    },

  },
  reducers: {
    setSelectInfo (state, {payload: selectInfo}) {
      return {
        ...state,
        selectInfo
      }
    }
  }
})
