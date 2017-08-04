import modelExtend from 'dva-model-extend'
import { fetchTable, fetchTablePass, fetchTableSchoolAdmins, fetchTableSignUp } from './service'
import pathToRegexp from 'path-to-regexp'
import { alertModel, inputModel, modalModel, tableModel } from '../../../models/modelExtend'
export default modelExtend(modalModel, tableModel, alertModel, inputModel, {
  namespace: 'studentContest',
  state: {
    tablePass: [],
    tableSignUp: [],
    tableSchoolAdmins: [],
    query: {}
  },
  subscriptions: {
    studentContestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/student/:params').exec(pathname)
        if (match || pathname === '/student') {
          dispatch({type: 'init', payload: pathname})
        }
      })
    }
  },
  effects: {
    * init ({payload: pathname}, {call, select, put}) {
      let {tablePass = [], tableSignUp = [], table = [], tableSchoolAdmins = [], query} = yield select(({studentContest}) => studentContest)
      if (pathname === '/student' && table.length === 0) {
        let {data: contestTable = []} = yield call(fetchTable)
        contestTable = Array.from(contestTable)
        yield put({type: 'setTable', payload: contestTable.reverse()})
      }
      if (tablePass.length === 0) {
        const {data: {contestList = []}} = yield call(fetchTablePass)
        yield put({type: 'setTablePass', payload: contestList})
        tablePass = contestList
      }
      if (tableSignUp.length === 0) {
        yield put({type: 'fetchTableSignUp'})
      }
      if (tableSchoolAdmins.length === 0) {
        yield put({type: 'fetchTableSchoolAdmins'})
      }
      if (JSON.stringify(query).length <= 2) {
        const defaultValue = tablePass[0] || {id: 'none'}
        const problem = {
          contest_id: defaultValue.id
        }
        const query = {problem, score: problem}
        yield put({type: 'saveQuery', payload: query})
      }
    },
    * fetchTablePass ({}, {call, put}) {
      const {data: {contestList = []}} = yield call(fetchTablePass)
      yield put({type: 'setTablePass', payload: contestList})
    },
    * fetchTableSignUp ({}, {call, put}) {
      let {data = []} = yield call(fetchTableSignUp)
      data = Array.from(data)
      yield put({type: 'setTableSignUp', payload: data.reverse()})
    },
    * fetchTableSchoolAdmins ({}, {call, put}) {
      let {data: {school_admins = []}} = yield call(fetchTableSchoolAdmins)
      school_admins = school_admins.map((item, i) => {
        return {
          ...item,
          fakeId: i + 1
        }
      })
      yield put({type: 'setTableSchoolAdmins', payload: school_admins})
    }
  },
  reducers: {
    setTablePass (state, {payload: tablePass}) {
      return {
        ...state,
        tablePass
      }
    },
    setTableSignUp (state, {payload: tableSignUp}) {
      return {
        ...state,
        tableSignUp
      }
    },
    setTableSchoolAdmins (state, {payload: tableSchoolAdmins}) {
      return {
        ...state,
        tableSchoolAdmins
      }
    },
    saveQuery (state, {payload: query}) {
      return {
        ...state,
        query
      }
    }
  }
})
