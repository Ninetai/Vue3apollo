import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'

export default createStore({
  state: {
    loading: false,
    orders: [],
    order: null
  },
  actions,
  mutations
})