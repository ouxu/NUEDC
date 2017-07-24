import { auditAll, remove, update } from './service'
import { message } from 'antd'

export default  {
  namespace: 'teamManage',
  state: {
    selected: []
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
    },
    * auditAll ({}, {call, put, select}) {
      const {selected} = yield select(({teamManage}) => teamManage)
      const updates = selected.map((item) => ({
        record_id: item,
        status: '已审核'
      }))
      const data = yield call(auditAll, {updates})
      if (data.code === 0) {
        yield put({type: 'teamManage/selectChange', payload: []})

        message.success('批量审核成功')
      }
    }
  },
  reducers: {
    queryChange(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    selectChange(state, {payload: selected}) {
      return {
        ...state,
        selected
      }
    }
  }
}
