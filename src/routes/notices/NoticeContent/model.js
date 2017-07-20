/**
 * Created by Pororo on 17/7/19.
 */
import modelExtend from 'dva-model-extend'
import { fetchPassage } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'noticeContent',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const id = pathname.substr(9, 2)
        console.log(id)
        const match = pathname === `/notices/${id}`
        if (match) {
          dispatch({type: 'fetchPassage', payload: id})
        }
      })
    }
  },
  effects: {
    * fetchPassage ({payload}, {call, put}) {
      const query = {
        messageId: payload,
        type: 1
      }
      const data = yield call(fetchPassage, query)
      if (data.code === 0) {
        yield put({type: 'updateModalContent', payload: data.data})
      }
    }
  }
})
