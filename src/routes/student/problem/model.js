import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { API, urlEncode } from '../../../utils'
import { fetchTable } from './service'
export default modelExtend(tableModel, modalModel, {
  namespace: 'studentProblems',
  state: {},
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
    * fetchTable({payload}, {call, put}) {
      const {contest_id} = payload
      const data = yield call(fetchTable, contest_id)
      if (data.code === 0) {
        const {problemList = [], problemSelectInfo = {}} = data.data
        const table = problemList.map((item, i) => ({
          ...item,
          fakeId: String.fromCharCode(parseInt(problemList.length - i - 1) + 65)
        }))
        yield put({type: 'setTable', payload: table})
      }
    },
    * preview ({payload}, {put, call}) {
      const params = {
        path: payload.attach_path,
        token: window.localStorage.getItem('nuedcToken')
      }
      let url = API.viewPrivateFile + '?' + urlEncode(params)
      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    },
    * download ({payload}, {put, call}) {
      const params = {
        path: payload.attach_path,
        token: window.localStorage.getItem('nuedcToken'),
        download: 1
      }
      let url = API.viewPrivateFile + '?' + urlEncode(params)
      let a = document.createElement('a')
      a.href = url
      a.target = '_blank'
      a.click()
    }
  },
  reducers: {}
})
