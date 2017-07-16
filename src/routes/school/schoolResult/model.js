/**
 * Created by Pororo on 17/7/14.
 */
import modelExtend from 'dva-model-extend'
import { fetchDate } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, {
  namespace: 'schoolResult',
  state: {
    input: ''
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/school/schoolResult'
        if (match) {
          dispatch({type: 'fetchResultTable'})
        }
      })
    }
  },
  effects: {
    * fetchResultTable ({payload}, {call, put, select}) {
      console.log('fetchresult')
      const table = yield select(({schoolResult}) => schoolResult.table)
      if (table.length > 0) {
        // 已有数据，不需要获取
      } else {
        const data = []
        for (let i = 0; i < 10; i++) {
          data.push({
            id: i,
            info: `信息${i}`,
            name: `电子设计竞赛 ${i}`,
            status: '未开始',
            result: '一等',
            audit_time: '2017-3-5',
            time: 2012 + i + '届河北省决赛'
          })
        }
        yield put({type: 'setTable', payload: data})
      }
    },
    * filter ({payload}, {put, select}) {
      const filter = yield select(({schoolResult}) => schoolResult.filter)
      console.log(filter)
    },
    * ResultOut ({payload}, {put}) {
      console.log('ResultOut')
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
