/**
 * Created by Pororo on 17/7/14.
 */
export default {
  namespace: 'schoolResult',
  state: {},
  effects: {},
  reducers: {
    querySuccess (state, {payload: user}) {
      return {
        ...state,
        user
      }
    }
  }
}
