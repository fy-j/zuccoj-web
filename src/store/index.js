import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const host = 'https://api.zuccacm.top/zuccoj'
const file_host = 'https://api.zuccacm.top/zuccoj'

const PermissionLevel = {
  ANYONE: -999,
  FORBIDDEN: -1,
  COMMON: 0,
  DATA_VIEWER: 100,
  CODE_VIEWER: 200,
  ADMIN: 999
}

const ContentTypeText = [
  'UNKNOWN',
  'ACM/ICPC',
  'OI',
  'IOI',
  'Codeforces'
]

const ContestProblemLabel = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

export default new Vuex.Store({
  state: {
    PermissionLevel,
    ContentTypeText,
    ContestProblemLabel,
    host: host,
    file_host: file_host,
    current_page: [],
    user: null,
    getContestProblemLabel: function(id, is_contest, problem_cnt) {
      if (!is_contest) {
        return id
      }
      if (problem_cnt > ContestProblemLabel.length) {
        return id
      }
      return ContestProblemLabel[id]
    },
    getContestProblemIdFromLabel: function (id) {
      id = String(id)
      let i = ContestProblemLabel.indexOf(id)
      return (i===-1)?(id):(i)
    },
    buildGetQuery: function (data) {
      let res = ''
      for (let item in data) {
        if (res) {
          res += '&'
        }
        res += `${item}=${encodeURIComponent(data[item])}`
      }
      if (res) {
        res = '?' + res
      }
      return res
    },
    fixZero: function (x) {
      if (x<10) return '0'+x
      return ''+x
    },
    dateFormat: function (date, second) {
      let res = date.getFullYear() + '-'
      res += this.fixZero(date.getMonth()+1) + '-'
      res += this.fixZero(date.getDate()) + ' '
      res += this.fixZero(date.getHours()) + ':'
      res += this.fixZero(date.getMinutes())
      if (second) {
        res += ':' + this.fixZero(date.getSeconds())
      }
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
    updateUser(state, showMsg) {
      let that = this._vm
      that.$http.get(state.host + '/user/get')
        .then(data => {
          if (data.data.code === 200) {
            let Data = data.data.data
            state.user = Data
            if (showMsg) {
              that.$message.success('欢迎你, ' + Data.nickname)
            }
          } else {
            if (showMsg) {
              that.$message.error(data.data.msg)
            }
          }
        })
        .catch(() => {
          that.$message.error('系统错误')
        })
        .finally(() => {
        })
    },
    logout(state) {
      let that = this._vm
      that.$http.post(state.host + '/user/logout')
        .then(data => {
          if (data.data.code === 200) {
            that.$message.success(data.data.msg)
            state.user = null
            router.replace({name:'refresh'})
          } else {
            that.$message.error(data.data.msg)
          }
        })
        .catch(() => {
          that.$message.error('系统错误')
        })
        .finally(() => {
        })
    },
    permissionCheck(state, level) {
      let that = this._vm
      if (state.user) {
        if (state.user.status < level) {
          router.replace({
            name: 'error',
            params: {
              code: String(403)
            }
          })
        }
      } else {
        that.$http.get(state.host + '/user/check?level='+level)
          .then(data => {
            if (data.data.code === 403) {
              router.replace({
                name: 'error',
                params: {
                  code: String(403)
                }
              })
            }
          })
      }
    },
    errorPage(state, code) {
      if ([403, 404, 500, '403', '404', '500'].indexOf(code) !== -1) {
        router.replace({
          name: 'error',
          params: {
            code: String(code)
          }
        })
      } else {
        if (code == -1) {
          router.go(-1)
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
