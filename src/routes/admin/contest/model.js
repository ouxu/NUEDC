import modelExtend from 'dva-model-extend'
import { create, fetchTable, remove, update } from './service'
import { inputModel, modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'
export default modelExtend(modalModel, tableModel, inputModel, {
  namespace: 'contest',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/admin/contest' || pathname === '/admin'
        if (match) {
          dispatch({type: 'fetchTable'})
        }
      })
    }
  },

  effects: {
    * fetchTable ({payload = false}, {call, select, put}) {
      const table = yield select(({contest}) => contest.table)
      if (table.length === 0 || payload) {
        // 已有数据或者不需要强制跟新，不需要获取
        const data = yield call(fetchTable)
        if (data.code === 0) {
          const {contests} = data.data
          yield put({type: 'setTable', payload: contests})
        }
      }
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({contest}) => contest.modalContent)
      const data = yield call(update, payload, id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchTable', payload: true})
      }
    },

    * delete ({payload}, {put, select, call}) {
      const {id} = payload
      const {input} = yield select(({contest}) => contest)
      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: true})
      }
    },

    * create ({payload}, {put, call}) {
      const data = yield call(create, payload)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('创建成功')
        yield put({type: 'fetchTable', payload: true})
      }
    }
  },
  reducers: {}
})
