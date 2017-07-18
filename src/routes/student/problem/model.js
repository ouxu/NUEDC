import modelExtend from 'dva-model-extend'
import { getContestProblemList, fetchProblemTable } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'

export default modelExtend(modalModel, tableModel, {
  namespace: 'studentProblem',
  state: {},
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/student/problem' || pathname === 'student') {
          dispatch({type: 'fetchProblemTable'})
        }
      })
    }
  },
  effects: {
    * fetchProblemTable ({payload}, {call, put, select}) {
      console.log('fetchProblem')
      const table = yield select(({studentProblem}) => studentProblem.table)
      if (table.length === 0 || payload) {
        // 已有数据，不需要获取
        const data = yield call(getContestProblemList)
        if (data.code === 0) {
          const {studentProblem} = data.problemList
          console.log(data.problemList)
          yield put({type: 'setTable', payload: studentProblem})
        }
      } else {
        const data = []
        for (let i = 1; i < 8; i++) {
          data.push({
            id: i,
            name: `电子设计竞赛${i}题`,
            description: '电子设计竞赛',
            status: '不可选',
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
      const input = yield select(({studentProblem}) => studentProblem.input)
      console.log(input)
    },
    * add ({payload}, {put, select}) {
      const form = yield select(({studentProblem}) => studentProblem.form)
      console.log(form)
    },
    * audit ({payload}, {put}) {
      console.log('audit')
    },
    * filter ({payload}, {put, select}) {
      const filter = yield select(({studentProblem}) => studentProblem.filter)
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