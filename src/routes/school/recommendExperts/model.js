/**
 * Created by Pororo on 17/7/14.
 */
import modelExtend from 'dva-model-extend'
import { fetchDate } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'recommendExperts',
  state: {
    input: ''
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/school/recommendexperts' || pathname === '/school'
        if (match) {
          dispatch({type: 'fetchDate'})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload}, {call, put}) {
      console.log('fetchDate')
      // const data = yield call(fetchTable)
    },
    * update ({payload}, {call}) {
      // const data = yield call(edit, payload)
    },
    * create ({payload}, {put}) {
      console.log('create')
    }
  },
  reducers: {
    onInputChange (state, {payload}) {
      console.log(payload)
      return {
        ...state,
        input: payload
      }
    }
  }
})
