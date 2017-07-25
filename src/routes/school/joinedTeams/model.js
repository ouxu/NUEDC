import modelExtend from 'dva-model-extend'
import {
  add,
  allChecked,
  audit,
  downloadExcel,
  fetchJoinedTable,
  fetchSelectOption,
  joinedExcelOut,
  remove,
  update
} from './service'
import { alertModel, modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'joinedTeams',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/school/joinedTeams'
        if (match) {
          dispatch({type: 'selectFilter'})
          const {contest_id = ''} = query
          if (contest_id.length > 0) {
            dispatch({type: 'fetchJoinedTable', payload: query})
          }
        }
      })
    }
  },
  effects: {
    * selectFilter ({payload}, {call, put}) {
      const selectOptions = yield call(fetchSelectOption)
      if (selectOptions.code === 0) {
        yield put({type: 'saveFilter', payload: selectOptions.data})
        yield put({type: 'onFilter', payload: selectOptions.data.contests[0].id})
      }
    },
    * fetchJoinedTable ({payload}, {call, put, select}) {
      const {contestsId} = yield select(({joinedTeams}) => joinedTeams)
      const {contest_id, status, page = 1, size = 50} = payload
      const query = {
        page: page,
        size: size,
        contest_id: contest_id || contestsId,
        status: status || undefined
      }
      const data = yield call(fetchJoinedTable, query)
      if (data.code === 0) {
        const {data: {count, teams}} = data
        const tableConfig = {
          tablePage: page,
          tableSize: size,
          tableCount: count
        }
        const table = teams.map((t, i) => ({
          ...t,
          fakeId: i + 1 + (page - 1) * size
        }))
        yield put({type: 'setTable', payload: table})
        yield put({type: 'setTableConfig', payload: tableConfig})
      }
    },
    * edit ({payload}, {call, select, put}) {
      const {id} = yield select(({joinedTeams}) => joinedTeams.modalContent)
      const {form} = yield select(({joinedTeams}) => joinedTeams)
      const {query} = payload
      const data = yield call(update, form, id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchJoinedTable', payload: query})
        yield put({type: 'joinedTeams/hideModal'})
      }
    },
    * delete ({payload}, {put, call}) {
      const {query, record} = payload
      const {id} = record

      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchJoinedTable', payload: query})
      }
    },
    * add ({payload}, {put, select, call}) {
      const {query, values} = payload
      const form = yield select(({joinedTeams}) => joinedTeams.form)
      const data = yield call(add, form)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('创建成功')
        yield put({type: 'fetchJoinedTable', payload: query})
      }
    },
    * audit ({payload}, {put, call}) {
      const {query, record} = payload
      const data = yield call(audit, record.id)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('审核通过')
        yield put({type: 'fetchJoinedTable', payload: query})
      }
    },
    * joinedOut ({payload}, {call, select}) {
      const {contest_id: contestsId} = payload
      const date = new Date().valueOf() + ''
      const data = {
        ...payload,
        contest_id: contestsId
      }
      yield call(joinedExcelOut, {filename: date.substr(-3, 3) + '本校参赛队伍竞赛' + contestsId + '.xlsx'}, data)
    },
    * allChecked ({payload}, {call, select, put}) {
      const query = payload
      const {school_team_ids} = yield select(({joinedTeams}) => joinedTeams.modalContent)
      const data = yield call(allChecked, {school_team_ids: school_team_ids})
      if (data.code === 0) {
        message.success('批量审核成功')
        yield put({type: 'fetchJoinedTable', payload: query})
      }
    },
    * downloadExcel ({payload}, {call, put, select}) {
      yield call(downloadExcel, {filename: '队伍导入Excel模板.xlsx'})
    }
  },
  reducers: {
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
    },
    saveSuccessExcel (state, {payload}) {
      return {
        ...state,
        content: payload
      }
    }
  }
})
