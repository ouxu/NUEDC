import modelExtend from 'dva-model-extend'
import {
  fetchJoinedTable,
  add,
  update,
  audit,
  remove,
  joinedExcelOut,
  fetchSelectOption,
  allChecked,
  downloadExcel,
  uploadExcel
} from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'joinedTeams',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        const match = pathname === '/school/joinedTeams'
        if (match) {
          dispatch({type: 'fetchJoinedTable', payload: query})
        }
      })
    }
  },
  effects: {
    * fetchJoinedTable ({payload}, {call, put, select}) {
      const selectOptions = yield call(fetchSelectOption)
      if (selectOptions.code === 0) {
        yield put({type: 'saveFilter', payload: selectOptions.data})
        yield put({type: 'onFilter', payload: selectOptions.data.contests[0].id})
        const {contestsId} = yield select(({joinedTeams}) => joinedTeams)
        const {contest_id, status, page, size} = payload
        const query = {
          page: page || undefined,
          size: size || undefined,
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
          yield put({type: 'setTable', payload: teams})
          yield put({type: 'setTableConfig', payload: tableConfig})
        }
      }
    },
    * edit ({payload}, {call, select, put}) {
      const {id} = yield select(({joinedTeams}) => joinedTeams.modalContent)
      const {form} = yield select(({joinedTeams}) => joinedTeams)
      const data = yield call(update, [form, id])
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        yield put({type: 'fetchJoinedTable', payload: {force: true}})
      }
    },
    * delete ({payload}, {put, call}) {
      const {id} = payload
      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        yield put({type: 'fetchJoinedTable', payload: {force: true}})
      }
    },
    * add ({payload}, {put, select, call}) {
      const form = yield select(({joinedTeams}) => joinedTeams.form)
      const data = yield call(add, form)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('创建成功')
        yield put({type: 'fetchJoinedTable', payload: {force: true}})
      }
    },
    * audit ({payload}, {put, call}) {
      const data = yield call(audit, payload)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('审核通过')
        yield put({type: 'fetchJoinedTable', payload: {force: true}})
      }
    },
    * joinedOut ({payload}, {call, select}) {
      const {contestsId} = yield select(({joinedTeams}) => joinedTeams)
      const date = new Date().valueOf() + ''
      const data = {
        ...payload,
        contest_id: contestsId
      }
      yield call(joinedExcelOut, {filename: date.substr(-3, 3) + '本校参赛队伍竞赛' + contestsId + '.xlsx'}, data)
    },
    * allChecked ({payload}, {call, select, put}) {
      const {school_team_ids} = yield select(({joinedTeams}) => joinedTeams.modalContent)
      const data = yield call(allChecked, {school_team_ids: school_team_ids})
      if (data.code === 0) {
        message.success('批量审核成功')
        yield put({type: 'fetchJoinedTable', payload: {force: true}})
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
    }
  }
})
