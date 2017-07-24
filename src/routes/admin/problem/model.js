import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'
import { add, fetchTable, remove, update } from './service'
export default modelExtend(tableModel, modalModel, {
  namespace: 'adminProblems',
  state: {},
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query = {}}) => {
        if (pathname === '/admin/problem') {
          const {contest_id = ''} = query
          if (contest_id.length > 0) {
            dispatch({type: 'fetchTable', payload: query})
          }
        }
      })
    }
  },
  effects: {
    * fetchTable({payload}, {call, put}) {
      const data = yield call(fetchTable, payload)
      if (data.code === 0) {
        const {problems = []} = data.data
        yield put({type: 'setTable', payload: problems})
      }
    },
    * add ({payload}, {call, put}) {
      const {body, query} = payload
      const data = yield call(add, body)
      if (data.code === 0) {
        message.success('添加成功')
        yield put({type: 'hideModal'})
        yield put({type: 'fetchTable', payload: query})
      }
    },
    * edit ({payload}, {call, put, select}) {
      const {body, query} = payload
      const {modalContent: {id = ''}} = yield select(({adminProblems}) => adminProblems)
      const data = yield call(update, body, id)
      if (data.code === 0) {
        message.success('修改成功')
        yield put({type: 'hideModal'})
        yield put({type: 'fetchTable', payload: query})
      }
    },
    * delete ({payload}, {put, call}) {
      const {record: {id}, query} = payload
      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchTable', payload: query})
      }
    }
  },
  reducers: {}
})
