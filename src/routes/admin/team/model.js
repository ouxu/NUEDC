import { audit, auditAll } from './service'
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
    * auditAll ({payload}, {call, put, select}) {
      const query = payload
      const {selected} = yield select(({teamManage}) => teamManage)
      const updates = selected.map((item) => ({
        record_id: item,
        status: '已审核'
      }))
      const data = yield call(auditAll, {updates})
      if (data.code === 0) {
        yield put({type: 'teamManage/selectChange', payload: []})
        yield put({type: 'adminContestRecord/fetchTable', payload: query})
        message.success('批量审核成功')
      }
    }
  },
  reducers: {
    selectChange(state, {payload: selected}) {
      return {
        ...state,
        selected
      }
    }
  }
}
