import modelExtend from 'dva-model-extend'
import { fetchDate } from './service'
import { routerRedux } from 'dva/router'
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
    * fetchTable ({payload}, {call, select, put}) {
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
    * update ({payload}, {call}) {
      // const data = yield call(edit, payload)
    },
    * delete ({payload}, {put, select}) {
      const input = yield select(({contest}) => contest.input)
      yield put(routerRedux.push(`/admin?${input}`))
      console.log(input)
    },
    * create ({payload}, {put}) {
      console.log('create')
    }
  },
  reducers: {
    onInputChange(state, {payload}) {
      console.log(payload)
      return {
        ...state,
        input: payload
      }
    }
  }
})
