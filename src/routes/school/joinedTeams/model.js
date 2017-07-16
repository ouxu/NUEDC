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
        const match = pathname === '/school/joinedTeams' || pathname === '/school'
        if (match) {
          dispatch({type: 'fetchJoinedTable'})
        }
      })
    }
  },
  effects: {
    * fetchJoinedTable ({payload}, {call, put, select}) {
      console.log('fetchjoined')
      const table = yield select(({joinedTeams}) => joinedTeams.table)
      if (table.length > 0) {
        // 已有数据，不需要获取
      } else {
        const data = []
        for (let i = 0; i < 10; i++) {
          data.push({
            id: i,
            name: `电子设计竞赛 ${i}`,
            description: '电子设计竞赛',
            status: '未开始',
            year: 2012 + i + ''
          })
        }
        yield put({type: 'setTable', payload: data})
      }
    },
    * edit ({payload}, {call}) {
      console.log('edit')
      // const data = yield call(edit, payload)
    },
    * delete ({payload}, {put, select}) {
      const input = yield select(({joinedTeams}) => joinedTeams.input)
      console.log(input)
    },
    * add ({payload}, {put, select}) {
      const form = yield select(({joinedTeams}) => joinedTeams.form)
      console.log(form)
    },
    * audit ({payload}, {put}) {
      console.log('audit')
    },
    * filter ({payload}, {put, select}) {
      const filter = yield select(({joinedTeams}) => joinedTeams.filter)
      console.log(filter)
    },
    * joinedOut ({payload}, {put}) {
      console.log('joinedOut')
    }
  },
  reducers: {
    onInputChange (state, {payload}) {
      return {
        ...state,
        input: payload
      }
    },
    onFormSubmit (state, {payload}) {
      return {
        ...state,
        form: payload
      }
    },
    onFilter (state, {payload}) {
      return {
        ...state,
        filter: payload
      }
    }
  }
})
