import modelExtend from 'dva-model-extend'
import { remove, update, create, fetchProblemTable } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel,
  {
    namespace: 'studentProfile',
    state: {
      input: ''
    },
    subscriptions: {
      problemSubscriber ({dispatch, history}) {
        return history.listen(({pathname}) => {
          if (pathname === '/student/profile') {
            dispatch({type: 'fetchProblemTable'})
          }
        })
      }
    },
    effects: {
      * fetchProblemTable ({payload}, {call, put, select}) {
        console.log('fetchProblem')
        const table = yield select(({studentProfile}) => studentProfile.table)
        if (table.length > 0) {
          // 已有数据，不需要获取
        } else {
          const data = []
          for (let i = 0; i < 3; i++) {
            data.push({
              id: i,
              school: '东北大学秦皇岛分校',
              groupName: `NEUQer`,
              name:'Raoul',
              major: 'FE',
              mobile: '15035188985',
              stuId:'3154989',
              status: '未报名',
              guide: '王涛'
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
        const input = yield select(({studentProfile}) => studentProfile.input)
        console.log(input)
      },
      * add ({payload}, {put, select}) {
        const form = yield select(({studentProfile}) => studentProfile.form)
        console.log(form)
      },
      * audit ({payload}, {put}) {
        console.log('audit')
      },
      * filter ({payload}, {put, select}) {
        const filter = yield select(({studentProfile}) => studentProfile.filter)
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