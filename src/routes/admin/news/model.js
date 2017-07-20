import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { fetchTable, remove, update } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'adminNews',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/news' || pathname === '/admin/notices') {
          const type = pathname === '/admin/news' ? 0 : 1
          query = {
            ...query,
            type
          }
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload = {}}, {call, select, put}) {
      const {page, size, type} = payload
      const query = {
        page: page || 1,
        size: size || 50,
        type: type || 0
      }
      const data = yield call(fetchTable, query)
      if (data.code === 0) {
        const {data: {count, messages}} = data
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        yield put({type: 'setTable', payload: messages})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({adminNews}) => adminNews.modalContent)
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
