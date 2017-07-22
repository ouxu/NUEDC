import modelExtend from 'dva-model-extend'
import {
  fetchTable,
  allChecked,
  downloadExcel,
  fetchSelectOption
} from './service'
import { modalModel, tableModel, alertModel } from '../../../models/modelExtend'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'recording',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/recording' || pathname === '/admin/team') {
          dispatch({type: 'contest/fetchTable'})
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const options = yield call(fetchSelectOption)
      const {data} = options
      yield put({type: 'onFilter', payload: data.schools})
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
    * downloadExcel ({payload}, {call, put, select}) {
      yield call(downloadExcel, {filename: '成绩导入Excel模板.xlsx'}, payload)
    },
    * checkRecording ({payload}, {call, put}) {
      console.log(payload)
      const body = {
        results: [
          {
            record_id: parseInt(payload.id),
            result: payload.result,
            result_info: payload.result_info
          }
        ]
      }
      const data = yield call(allChecked, body)
      if (data.code === 0) {
        message.success('成绩录入成功')
        yield put({type: 'fetchTable', payload: {force: true}})
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
