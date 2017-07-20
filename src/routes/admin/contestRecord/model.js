import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { fetchTable, remove, update } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'adminContestRecord',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/contestRecord' || pathname === '/admin/team') {
          dispatch({type: 'contest/fetchTable'})
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {contest_id, status, result, school_id, page, size} = payload
      const query = {
        page: page || 1,
        size: size || 50,
        contest_id: contest_id || undefined,
        status: status || undefined,
        result: result || undefined,
        school_id: school_id || undefined
      }
      const data = yield call(fetchTable, query)
      if (data.code === 0) {
        const {data: {count, records}} = data
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        yield put({type: 'setTable', payload: records})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({adminContestRecord}) => adminContestRecord.modalContent)
      const data = yield call(update, payload, id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchTable', payload: {force: true}})
      }
    },
    * delete ({payload}, {put, call}) {
      const {id} = payload
      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: {force: true}})
      }
    }
  },
  reducers: {
    queryChange(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
})
