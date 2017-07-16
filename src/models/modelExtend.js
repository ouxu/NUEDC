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
    table: []
  },
  reducers: {
    setTable (state, {payload: table}) {
      return {
        ...state,
        table
      }
    }
  }
}

const counterModel = {
  state: {
    counter: false
  },
  subscriptions: {
    counterSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/register') {
          dispatch({type: 'counterReset'})
        }
      })
    }
  },
  reducers: {
    counterReset (state) {
      return {
        ...state,
        counter: false
      }
    },
    counterStart (state) {
      return {
        ...state,
        counter: true
      }
    }
  }
}

export { modalModel, tableModel, counterModel }