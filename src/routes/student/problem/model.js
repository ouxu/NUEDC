import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { API, urlEncode } from '../../../utils'
import { fetchTable, update } from './service'
import { message } from 'antd'
export default modelExtend(tableModel, modalModel, {
  namespace: 'studentProblems',
  state: {
    problemSelectInfo: {}
  },
  subscriptions: {
    problemSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query = {}}) => {
        if (pathname === '/student/problem') {
          const {contest_id = ''} = query
          if (contest_id.length > 0) {
            dispatch({type: 'fetchTable', payload: query})
          }
        }
      })
    }
  },
  effects: {
    * edit ({payload}, {call, put}) {
      const {body, query} = payload
      const data = yield call(update, body)
      if (data.code === 0) {
        yield put({type: 'fetchTable', payload: query})
        message.success('选题成功')
        yield put({type: 'hideModal'})
      }
    },
    * fetchTable({payload}, {call, put}) {
      const {contest_id} = payload
      const data = yield call(fetchTable, contest_id)
      if (data.code === 0) {
        const {problemList = [], problemSelectInfo = {}} = data.data
        const table = problemList.map((item, i) => ({
          ...item,
          fakeId: String.fromCharCode(parseInt(problemList.length - i - 1) + 65)
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
    }
  },
  reducers: {
    setInfo(state, {payload: problemSelectInfo}) {
      return {
        ...state,
        problemSelectInfo
      }
    }
  }
})
