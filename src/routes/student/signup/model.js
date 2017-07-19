import modelExtend from 'dva-model-extend'
import { getAllContest, signUpContest, getContestSignUpStatus, userSchools } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'studentSignUp',
  state: {
    input: '',
    info: '',
    userSchools: ''
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/student'
        if (match) {
          dispatch({type: 'getContestSignUpStatus'})
          dispatch({type: 'getUserSchool'})
        }
      })
    }
  },
  effects: {
    * getUserSchool ({payload}, {call, put, select}) {
      const data = yield call(userSchools)
      if (data.code === 0) {
        yield put({type: 'schools', payload: data.data.schools})
      }
    },
    * signUpContest ({payload}, {call, put, select}) {
      const data = yield call(signUpContest, payload)
      console.log(data)
      if (data.code === 0) {
        message.success('报名成功，请等待审核')
        yield put({type: 'onFormSubmit', payload: payload})
      }
    },
    * getContestSignUpStatus ({payload}, {call, put, select}) {
      const table = yield select(({studentSignUp}) => studentSignUp.table)
      if (table.length > 0) {
        // 已有数据，不需要获取
      } else {
        const selectOptions = yield call(getAllContest)
        console.log(selectOptions.data)
        if (selectOptions.code === 0) {
          yield put({type: 'saveFilter', payload: selectOptions.data})
          yield put({type: 'onFilter', payload: selectOptions.data[0].id})
          const {contestsId} = yield select(({studentSignUp}) => studentSignUp)
          const data = yield call(getContestSignUpStatus, contestsId)
          if (data.code === 0) {
            yield put({type: 'studentInfo', payload: data.data})
          }
        }
      }
    },
    * filter ({payload}, {put, select, call}) {
      const {contestsId} = yield select(({studentSignUp}) => studentSignUp)
      const data = yield call(getContestSignUpStatus, contestsId)
      yield put({type: 'studentInfo', payload: data.data})
    }
  },
  reducers: {
    schools (state, {payload}) {
      return {
        ...state,
        schools: payload
      }
    },
    studentInfo (state, {payload}) {
      return {
        ...state,
        info: payload
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
        contestsId: payload
      }
    },
    saveFilter (state, {payload}) {
      return {
        ...state,
        contest: payload
      }
    }
  }
})
