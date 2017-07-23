import modelExtend from 'dva-model-extend'
import { tableModel } from '../../../models/modelExtend'
import { fetchTable } from './service'
export default modelExtend(tableModel, {
  namespace: 'adminProblems',
  state: {},
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query = {}}) => {
        if (pathname === '/admin/problem') {
          const {contest_id = ''} = query
          if (contest_id.length > 0) {
            dispatch({type: 'fetchTable', payload: query})
          }
        }
      })
    }
  },
  effects: {
    * fetchTable({payload}, {call, put}) {
      const data = yield call(fetchTable, payload)
      if (data.code === 0) {
        const {problems = []} = data.data
        yield put({type: 'setTable', payload: problems})
      }
    }
  },
  reducers: {}
})
