import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../../models/modelExtend'
import { fetchTable, remove, update } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'adminNewsEditEdit',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (query.length > 0) {
          dispatch({type: 'fetchMessage', payload: {pathname, query}})
        }
      })
    }
  },
  effects: {
    * fetchMessage ({payload}, {call, select, put}) {
      const {pathname, query} = payload
      console.log(pathname)
      console.log(query)
      // const data = yield call(fetchTable, query)
      // if (data.code === 0) {
      //   const {data: {count, records}} = data
      //   const tableConfig = {
      //     tablePage: page,
      //     tableSize: size,
      //     tableCount: count
      //   }
      //   yield put({type: 'setTable', payload: records})
      //   yield put({type: 'setTableConfig', payload: tableConfig})
      // }
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({adminNewsEdit}) => adminNewsEdit.modalContent)
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
