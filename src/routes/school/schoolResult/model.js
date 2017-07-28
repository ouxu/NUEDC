import modelExtend from 'dva-model-extend'
import { fetchResultTable, fetchSelectOption, resultExcelOut } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { routerRedux } from 'dva/router'
export default modelExtend(modalModel, tableModel, {
  namespace: 'schoolResult',
  state: {
    input: '',
    contests: []
  },
  subscriptions: {
    schoolResultSubscriber ({dispatch, history}) {
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
      let {contests = [{}]} = yield select(({schoolResult}) => schoolResult)
      if (contests.length === 0) {
        const {data = {}} = yield call(fetchSelectOption)
        contests = data.contests || [{}]
        yield put({type: 'saveContest', payload: contests.reverse()})
      }

      const {contest_id, result_info, page = 1, size = 50} = payload
      if (!contest_id) {
        yield put(routerRedux.push(`/school/schoolResult?contest_id=` + (contests[0].id || 'none')))
      } else {
        if (contest_id === 'none') return
        const query = {
          page: page,
          size: size,
          contest_id: contest_id,
          result_info: result_info || undefined
        }
        const {code, data: {count, results}} = yield call(fetchResultTable, query)
        if (code === 0) {
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
        } else {
          yield put({type: 'setTable', payload: []})
          yield put({type: 'setTableConfig', payload: {}})
        }
      }
    },
    * ResultOut ({payload}, {put, call, select}) {
      const {contest_id: contestsId} = payload
      const date = new Date().valueOf() + ''
      const data = {
        ...payload,
        contest_id: contestsId
      }
      yield call(resultExcelOut, {filename: date.substr(-3, 3) + '本校赛果竞赛' + contestsId + '.xlsx'}, data)
    }
  },
  reducers: {
    saveContest (state, {payload}) {
      return {
        ...state,
        contests: payload
      }
    }
  }
})
