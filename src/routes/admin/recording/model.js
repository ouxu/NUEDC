import modelExtend from 'dva-model-extend'
import { downloadExcel, fetchSelectOption, fetchTable, resultUpdate } from './service'
import { alertModel, modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'recording',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/recording' || pathname === '/admin/team') {
          dispatch({type: 'selectFilter'})
          const {contest_id = ''} = query
          if (contest_id.length > 0) {
            dispatch({type: 'contest/fetchTable'})
            dispatch({type: 'fetchTable', payload: query})
          }
        }
      })
    }
  },
  effects: {
    * selectFilter ({payload}, {call, put}) {
      const options = yield call(fetchSelectOption)
      const {data} = options
      yield put({type: 'onFilter', payload: data.schools})
    },
    * fetchTable ({payload = {}}, {call, put}) {
      const {contest_id, status, result, school_id, page, size} = payload
      const query = {
        page: page || 1,
        size: size || 50,
        contest_id: contest_id || undefined,
        status: status || undefined,
        result: result || undefined,
        school_id: school_id || undefined
      }
      const table = yield call(fetchTable, query)
      if (table.code === 0) {
        const {data: {count, records}} = table
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        yield put({type: 'setTable', payload: records})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * downloadExcel ({payload}, {call}) {
      yield call(downloadExcel, {filename: '成绩导入Excel模板.xlsx'}, payload)
    },
    * checkRecording ({payload}, {call, put, select}) {
      const {query, body} = payload
      const data = yield call(resultUpdate, body)
      if (data.code === 0) {
        message.success('成绩录入成功')
        yield put({type: 'fetchTable', payload: query})
      }
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
        schools: payload
      }
    },
    saveSuccessExcel (state, {payload}) {
      return {
        ...state,
        content: payload
      }
    }
  }
})
