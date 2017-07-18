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
      return history.listen(({pathname, query}) => {
        const match = pathname === '/school/schoolResult'
        if (match) {
          dispatch({type: 'fetchResultTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchResultTable ({payload}, {call, put, select}) {
      const selectOptions = yield call(fetchSelectOption)
      if (selectOptions.code === 0) {
        yield put({type: 'saveFilter', payload: selectOptions.data})
        yield put({type: 'onFilter', payload: selectOptions.data.contests[0].id})
        const {contestsId} = yield select(({schoolResult}) => schoolResult)
        const {contest_id, result_info, page, size} = payload
        const query = {
          page: page || undefined,
          size: size || undefined,
          contest_id: contest_id || contestsId,
          result_info: result_info || undefined
        }
        const data = yield call(fetchResultTable, query)
        if (data.code === 0) {
          const {data: {count, results}} = data
          const tableConfig = {
            tablePage: page,
            tableSize: size,
            tableCount: count
          }
          yield put({type: 'setTable', payload: results})
          yield put({type: 'setTableConfig', payload: tableConfig})
        }
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
    },
    saveFilter (state, {payload}) {
      return {
        ...state,
        contest: payload
      }
    }
  }
})
