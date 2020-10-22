import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_page: [],
    user: null
  },
  mutations: {
    updateCurrentPage(state, data) {
      state.current_page = [data]
    },
    updateUserInfo(state, data) {
      state.user = data
    },
  },
  actions: {
  },
  modules: {
  }
})
