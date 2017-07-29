import { audit, auditAll } from './service'
import { message } from 'antd'
import { sleep } from '../../../utils'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'teamManage',
  state: {
    selected: []
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/team') {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {contest_id,} = payload
      if (!contest_id) {
        let {table: contest = [{}]} = yield select(({contest}) => contest)
        if (contest.length === 0) {
          yield call(sleep, 1000)
          let {table: contestNow} = yield select(({contest}) => contest)
          contest = contestNow
        }
        const preId = contest[0] || {id: 'none'}
        yield call(sleep, 10)
        yield put(routerRedux.push(`/admin/team?contest_id=` + preId.id))
      } else {
        if (contest_id === 'none') return
        yield put({type: 'adminContestRecord/fetchTable', payload: payload})
      }
    },
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
    selectChange (state, {payload: selected}) {
      return {
        ...state,
        selected
      }
    }
  }
}
