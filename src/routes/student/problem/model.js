/**
 * Created by Pororo on 17/7/14.
 */
import modelExtend from 'dva-model-extend'
import { fetchJoinedTable, add, update, audit, remove, joinedExcelOut, fetchSelectOption } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'
import { message } from 'antd'
export default modelExtend(modalModel, tableModel, {
  namespace: 'studentProblem',
  state: {
    input: ''
  },
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === '/school/studentProblem'
        if (match) {
          dispatch({type: 'fetchJoinedTable'})
        }
      })
    }
  },
  effects: {
    * fetchJoinedTable ({payload}, {call, put, select}) {
      const table = yield select(({studentProblem}) => studentProblem.table)
      if (table.length > 0) {
        // 已有数据，不需要获取
      } else {
        const selectOptions = yield call(fetchSelectOption)
        if (selectOptions.code === 0) {
          yield put({type: 'saveFilter', payload: selectOptions.data})
          yield put({type: 'onFilter', payload: selectOptions.data.contests[0].id})
          const {contestsId} = yield select(({studentProblem}) => studentProblem)
          const data = yield call(fetchJoinedTable, contestsId)
          if (data.code === 0) {
            yield put({type: 'setTable', payload: data.data.teams})
          }
        }
      }
    },
    * edit ({payload}, {call, select, put}) {
      const {id} = yield select(({studentProblem}) => studentProblem.modalContent)
      const {form} = yield select(({studentProblem}) => studentProblem)
      const data = yield call(update, [form, id])
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('修改成功')
        const {contestsId} = yield select(({studentProblem}) => studentProblem)
        const data = yield call(fetchJoinedTable, contestsId)
        yield put({type: 'setTable', payload: data.data.teams})
      }
    },
    * delete ({payload}, {put, select, call}) {
      const {id} = payload
      const data = yield call(remove, id)
      if (data.code === 0) {
        message.success('删除成功')
        const {contestsId} = yield select(({studentProblem}) => studentProblem)
        const data = yield call(fetchJoinedTable, contestsId)
        yield put({type: 'setTable', payload: data.data.teams})
      }
    },
    * add ({payload}, {put, select, call}) {
      const form = yield select(({studentProblem}) => studentProblem.form)
      const data = yield call(add, form)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('创建成功')
        const {contestsId} = yield select(({studentProblem}) => studentProblem)
        const data = yield call(fetchJoinedTable, contestsId)
        yield put({type: 'setTable', payload: data.data.teams})
      }
    },
    * audit ({payload}, {put, call, select}) {
      const data = yield call(audit, payload)
      if (data.code === 0) {
        yield put({type: 'hideModal'})
        message.success('审核通过')
        const {contestsId} = yield select(({studentProblem}) => studentProblem)
        const data = yield call(fetchJoinedTable, contestsId)
        yield put({type: 'setTable', payload: data.data.teams})
      }
    },
    * filter ({payload}, {put, select, call}) {
      const {contestsId} = yield select(({studentProblem}) => studentProblem)
      const data = yield call(fetchJoinedTable, contestsId)
      yield put({type: 'setTable', payload: data.data.teams})
    },
    * joinedOut ({payload}, {put, call, select}) {
      const {contestsId} = yield select(({studentProblem}) => studentProblem)
      const date = new Date().valueOf() + ''
      yield call(joinedExcelOut, {filename: date.substr(-3, 3) + '本校参赛队伍竞赛' + contestsId + '.xlsx'}, contestsId)
      console.log('joinedOut')
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
