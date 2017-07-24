import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { create, fetchTable, remove, update } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'adminSchoolAdmin',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/admin/schoolAdmin') {
          dispatch({type: 'adminContestRecord/fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * update ({payload}, {call, put, select}) {
      const {id} = yield select(({adminSchoolAdmin}) => adminSchoolAdmin.modalContent)
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
    * create ({payload}, {put, call}) {
      const data = yield call(create, payload)
      if (data.code === 0) {
        yield put({type: 'fetchTable', payload: {force: true}})
        message.success('添加成功')
        yield put({type: 'hideModal'})
      }
    }
  },
  reducers: {}
})
