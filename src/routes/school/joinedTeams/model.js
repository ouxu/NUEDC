/**
 * Created by Pororo on 17/7/14.
 */
import modelExtend from 'dva-model-extend'
import { fetchDate } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'joinedTeams',
  state: {
    input: ''
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/school/joinedteams' || pathname === '/school'
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
    * delete ({payload}, {put, select}) {
      const input = yield select(({joinedTeams}) => joinedTeams.input)
      console.log(input)
    },
    * create ({payload}, {put}) {
      console.log('create')
    },
    * audit ({payload}, {put}) {
      console.log('审核')
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
