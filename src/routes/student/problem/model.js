import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { API, urlEncode } from '../../../utils'
import { fetchTable, update } from './service'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
export default modelExtend(tableModel, modalModel, {
  namespace: 'studentProblems',
  state: {
    problemSelectInfo: {},
  },
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query = {}}) => {
        if (pathname === '/student/problem') {
          dispatch({type: 'fetchTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchTable ({payload}, {call, put, select}) {
      let {tablePass = [{}]} = yield select(({studentContest}) => studentContest)
      const {contest_id = ''} = payload
      if (tablePass.length === 0 || contest_id === 'none') {
        return
      }
      if (contest_id) {
        const {code = '', data: {problemList = [], problemSelectInfo = {}}} = yield call(fetchTable, contest_id)
        if (code === 0) {
          const table = problemList.map((item, i) => ({
            ...item,
            fakeId: String.fromCharCode(i + 65)
          }))
          let info = problemSelectInfo
          if (problemSelectInfo.problemId === -1) {
            info = {
              ...info,
              title: '未选题'
            }
          } else {
            table.forEach((item, i) => {
              if (item.id === problemSelectInfo.problemId) {
                info = {
                  ...info,
                  ...item,
                  title: `${String.fromCharCode(parseInt(problemList.length - i - 1) + 65)} ${item.title}`
                }
              }
            })
          }
          yield put({type: 'setTable', payload: table})
          yield put({type: 'setInfo', payload: info})
        } else {
          yield put({type: 'setTable', payload: []})
          yield put({type: 'setInfo', payload: {}})
        }
      } else {
        yield put(routerRedux.push(`/student/problem?contest_id=` + (tablePass[0].id || 'none')))
      }
    },
    * preview ({payload}, {put, call}) {
      const params = {
        token: window.localStorage.getItem('nuedcToken')
      }
      let url = API.getContestProblemFile.replace(':id', payload.id) + '?' + urlEncode(params)
      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    },
    * download ({payload}, {put, call}) {
      const params = {
        token: window.localStorage.getItem('nuedcToken'),
        download: 1
      }
      let url = API.getContestProblemFile.replace(':id', payload.id) + '?' + urlEncode(params)
      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    },
    * edit ({payload}, {call, put}) {
      const {body, query} = payload
      const data = yield call(update, body)
      if (data.code === 0) {
        yield put({type: 'fetchTable', payload: query})
        message.success('选题成功')
        yield put({type: 'hideModal'})
      }
    }
  },
  reducers: {
    setInfo (state, {payload: problemSelectInfo}) {
      return {
        ...state,
        problemSelectInfo
      }
    },
    setTablePass(state, {payload: tablePass}) {
      return {
        ...state,
        tablePass
      }
    },
  }
})
