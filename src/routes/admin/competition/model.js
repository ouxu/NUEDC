import { edit } from './service'
export default {
  namespace: 'competition',
  state: {
    targetId: undefined
  },
  effects: {
    * edit ({payload}, {call}) {
      console.log(payload)
      console.log('edit')
      const data = yield call(edit, payload)
    },
    * delete ({payload}, {put}) {
      console.log('delete')
    },
    * delete ({payload}, {put}) {
      console.log('delete')
    }
  },
  reducers: {
    test (state, {payload: targetId}) {
      return {
        ...state,
        targetId
      }
    }
  }
}
