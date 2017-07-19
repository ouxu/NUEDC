import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { fetchTable, remove, update } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'teamManage',
  state: {
    checked: []
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/teamManage') {
          dispatch({type: 'adminContestRecord/fetchTable', payload: query})
        }
      })
    }
  },
  effects: {

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
