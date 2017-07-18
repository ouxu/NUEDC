/**
 * Created by Pororo on 17/7/14.
 */
import modelExtend from 'dva-model-extend'
import { fetchResultTable, resultExcelOut, fetchSelectOption } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'schoolResult',
  state: {
    input: ''
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/school/schoolResult'
        if (match) {
          dispatch({type: 'fetchResultTable'})
        }
      })
    }
  },
  effects: {
    * fetchResultTable ({payload}, {call, put, select}) {
      const table = yield select(({schoolResult}) => schoolResult.table)
      if (table.length > 0) {
        // 已有数据，不需要获取
      } else {
        const selectOptions = yield call(fetchSelectOption)
        if (selectOptions.code === 0) {
          yield put({type: 'updateModalContent', payload: selectOptions.data})
          yield put({type: 'onFilter', payload: selectOptions.data.contests[0].id})
          const {contestsId} = yield select(({schoolResult}) => schoolResult)
          const data = yield call(fetchResultTable, contestsId)
          if (data.code === 0) {
            yield put({type: 'setTable', payload: data.data.results})
          }
        }
      }
    },
    * filter ({payload}, {put, select, call}) {
      const {contestsId} = yield select(({schoolResult}) => schoolResult)
      const data = yield call(fetchResultTable, contestsId)
      if (data.code === 0) {
        yield put({type: 'setTable', payload: data.data.results})
      }
    },
    * ResultOut ({payload}, {put, call, select}) {
      const {contestsId} = yield select(({schoolResult}) => schoolResult)
      const date = new Date().valueOf() + ''
      yield call(resultExcelOut, {filename: date.substr(-3, 3) + '本校赛果竞赛' + contestsId + '.xlsx'}, contestsId)
    }
  },
  reducers: {
    onFilter (state, {payload}) {
      return {
        ...state,
        contestsId: payload
      }
    }
  }
})
