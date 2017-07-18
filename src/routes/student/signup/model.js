import modelExtend from 'dva-model-extend'
import { signUpContest } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'

export default modelExtend(modalModel, tableModel,
  {
    namespace: 'studentSignUp',
    state: {
      input: ''
    },
    subscriptions: {
      problemSubscriber ({dispatch, history}) {
        return history.listen(({pathname}) => {
          if (pathname === '/student/signup') {
            dispatch({type: 'fetchSignUpTable'})
          }
        })
      }
    },
    effects: {
      * fetchSignUpTable ({payload}, {call, put, select}) {
        console.log('fetchSignUp')
        const table = yield select(({studentSignUp}) => studentSignUp.table)
        if (table.length > 0) {
          // 已有数据，不需要获取
          const data = yield call(fetchSignUpTable)
          console.log(data)
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
        const input = yield select(({studentSignUp}) => studentSignUp.input)
        console.log(input)
      },
      * add ({payload}, {put, select}) {
        const form = yield select(({studentSignUp}) => studentSignUp.form)
        console.log(form)
      },
      * audit ({payload}, {put}) {
        console.log('audit')
      },
      * filter ({payload}, {put, select}) {
        const filter = yield select(({studentSignUp}) => studentSignUp.filter)
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