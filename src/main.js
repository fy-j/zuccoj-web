import Vue from 'vue'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VeLine from 'v-charts/lib/line.common'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(mavonEditor)
Vue.component(VeLine.name, VeLine)

axios.defaults.withCredentials = true
Vue.prototype.$http = axios
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('updateUser')
  }
}).$mount('#app')

router.afterEach(() => {
  document.querySelector('#page-top').scrollIntoView()
})
