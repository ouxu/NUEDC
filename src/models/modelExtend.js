/**
 * Created by out_xu on 17/7/15.
 */
const modalModel = {
  state: {
    modal: false
  },
  reducers: {
    showModal (state, {payload}) {
      return {
        ...state,
        modal: payload
      }
    },
    hideModal (state) {
      return {
        ...state,
        modal: false
      }
    },
  },
}

const tableModel = {
  state: {
    table: {}
  },
  reducers: {
    setTable (state, {payload: table}) {
      return {
        ...state,
        table
      }
    }
  },
}

export { modalModel, tableModel }