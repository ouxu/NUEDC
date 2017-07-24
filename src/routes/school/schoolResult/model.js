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
          dispatch({type: 'selectFilter'})
          const {contest_id = ''} = query
          if (contest_id.length > 0) {
            dispatch({type: 'fetchResultTable', payload: query})
          }
        }
      })
    }
  },
  effects: {
    * selectFilter ({payload}, {call, put}) {
      const selectOptions = yield call(fetchSelectOption)
      if (selectOptions.code === 0) {
        yield put({type: 'saveFilter', payload: selectOptions.data})
        yield put({type: 'onFilter', payload: selectOptions.data.contests[0].id})
      }
    },
    * fetchResultTable ({payload}, {call, put, select}) {
      const {contestsId} = yield select(({schoolResult}) => schoolResult)
      const {contest_id, result_info, page=1, size=50} = payload
      const query = {
        page: page,
        size: size ,
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
        const table = results.map((t, i) => ({
          ...t,
          fakeId: i + 1 + (page - 1) * size
        }))
        yield put({type: 'setTable', payload: table})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * ResultOut ({payload}, {put, call, select}) {
      const {contestsId} = yield select(({schoolResult}) => schoolResult)
      const date = new Date().valueOf() + ''
      const data = {
        ...payload,
        contest_id: contestsId
      }
      yield call(resultExcelOut, {filename: date.substr(-3, 3) + '本校赛果竞赛' + contestsId + '.xlsx'}, data)
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
