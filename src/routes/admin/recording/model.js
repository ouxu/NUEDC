import modelExtend from 'dva-model-extend'
import { downloadExcel, resultUpdate } from './service'
import { alertModel, modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'recording',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/recording' || pathname === '/admin/team') {
          const {contest_id = ''} = query
          if (contest_id.length > 0) {
            dispatch({type: 'adminContestRecord/fetchTable', payload: query})
          }
        }
      })
    }
  },
  effects: {
    * downloadExcel ({payload}, {call}) {
      yield call(downloadExcel, {filename: '成绩导入Excel模板.xlsx'}, payload)
    },
    * checkRecording ({payload}, {call, put}) {
      const {query, body} = payload
      const data = yield call(resultUpdate, body)
      if (data.code === 0) {
        yield put({type: 'adminContestRecord/hideModal'})

        yield put({type: 'adminContestRecord/fetchTable', payload: query})
        message.success('成绩录入成功')
        message.success('成绩已更新')

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
