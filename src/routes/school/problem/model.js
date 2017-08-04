/**
 * Created by out_xu on 17/8/1.
 */

import modelExtend from 'dva-model-extend'
import { alertModel, modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'
import { fetchTable, getInfo, update } from './service'
export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'schoolProblem',
  state: {
    contests: [],
    status: '未审核'
  },
  subscriptions: {
    schoolProblemSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/school/problem'
        if (match) {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload}, {call, put, select}) {
      const {contest_id, status, page = 1, size = 50} = payload

      if (contest_id === 'none') return
      const query = {
        page: page,
        size: size,
        contest_id,
        status: status || undefined
      }
      const {data: {count = '', teams = []}, code} = yield call(fetchTable, query)
      const {data: {status: statusNow = '未审核'}} = yield call(getInfo, {contest_id})
      yield put({type: 'changeStatus', payload: statusNow})
      if (code === 0) {
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        const table = teams.map((t, i) => ({
          ...t,
          fakeId: i + 1 + (page - 1) * size
        }))
        yield put({type: 'setTable', payload: table})
        yield put({type: 'setTableConfig', payload: tableConfig})
      } else {
        yield put({type: 'setTable', payload: []})
        yield put({type: 'setTableConfig', payload: {}})
      }
    },
    * edit ({payload}, {call, put}) {
      const {query, body} = payload
      const data = yield call(update, body)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchTable', payload: query})
      }
    }
  },
  reducers: {
    saveContest (state, {payload}) {
      return {
        ...state,
        contests: payload
      }
    },
    changeStatus(state, {payload: status}) {
      return {
        ...state,
        status
      }
    }
  }
})
