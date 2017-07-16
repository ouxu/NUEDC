/**
 * Created by out_xu on 17/7/15.
 */
const modalModel = {
  state: {
    modal: false,
    modalContent: {}
  },
  reducers: {
    showModal (state, {payload: modal}) {
      return {
        ...state,
        modal
      }
    },
    hideModal (state) {
      return {
        ...state,
        modal: false
      }
    },
    updateModalContent(state, {payload: modalContent}) {
      return {
        ...state,
        modalContent
      }
    }
  },
}

const loadingModel = {
  state: {
    loading: false
  },
  reducers: {
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    }
  }
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

export { modalModel, tableModel, counterModel, loadingModel }