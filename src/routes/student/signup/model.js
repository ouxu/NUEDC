import modelExtend from 'dva-model-extend'
import { signUpContest } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'

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
      * signUpContest ({payload}, {call, put, select}) {
        console.log('SignUp')
        // 已有数据，不需要获取
        const data = yield call(signUpContest, payload)
        console.log(data)
        if (data.code === 0) {
          message.success('报名成功，请等待审核')
          // yield put({type: 'fetchTable', payload: true})
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