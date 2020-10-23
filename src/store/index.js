import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_page: [],
    user: null,
    fixZero: function (x) {
      if (x<10) return '0'+x
      return ''+x
    },
    dateFormat: function (date) {
      let res = date.getFullYear() + '-'
      res += this.fixZero(date.getMonth()+1) + '-'
      res += this.fixZero(date.getDate()) + ' '
      res += this.fixZero(date.getHours()) + ':'
      res += this.fixZero(date.getMinutes())
      return res
    }
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
