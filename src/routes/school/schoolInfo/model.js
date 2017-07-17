/**
 * Created by Pororo on 17/7/17.
 */
import modelExtend from 'dva-model-extend'
import {} from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'schoolInfo',
  state: {
    input: ''
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/school/schoolInfo'
        if (match) {
          dispatch({type: 'fetchInfo'})
        }
      })
    }
  },
  effects: {
    * fetchInfo ({payload}, {call, put, select}) {
      console.log('fetchInfo')
    }
  },
  reducers: {
    onFilter (state, {payload}) {
      return {
        ...state,
        filter: payload
      }
    }
  }
})
