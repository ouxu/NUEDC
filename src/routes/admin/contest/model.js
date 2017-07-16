import modelExtend from 'dva-model-extend'
import { create, fetchDate, remove, update } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'contest',
  state: {
    input: ''
  },
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
    * fetchTable ({}, {call, select, put}) {
      const table = yield select(({contest}) => contest.table)
      if (table.length > 0) {
        // 已有数据，不需要获取
      } else {
        const data = []
        for (let i = 0; i < 10; i++) {
          data.push({
            id: i,
            title: `电子设计竞赛 ${i}`,
            description: `电子设计竞赛这里是描述！！！！ `,
            status: '未开始'
          })
        }
        yield put({type: 'setTable', payload: data})
      }
    },
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({contest}) => contest.modalContent)
      const data = yield call(update, payload, id)
      if (data.code === 0) {
        console.log('success' + data)
        yield put({type: 'hideModal'})
      }
    },

    * delete ({payload}, {put, select, call}) {
      const {id} = payload
      const {input} = yield select(({contest}) => contest)
      const data = yield call(remove, {password: input}, id)
      if (data.code === 0) {
        yield put({type: 'setTable', payload: {}})
      }
    },

    * create ({payload}, {put, call}) {
      const data = yield call(create, payload)
      if (data.code === 0) {
        console.log('success' + data)
        yield put({type: 'hideModal'})
      }
    }
  },
  reducers: {
    onInputChange(state, {payload}) {
      return {
        ...state,
        input: payload
      }
    },
    updateForm(state, {payload: form}) {
      return {
        ...state,
        form
      }
    }
  }
})
