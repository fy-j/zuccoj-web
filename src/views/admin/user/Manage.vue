<template>
  <title-box-frame title="用户管理">
    <template v-slot:content>
      <a-input-search v-model="username" placeholder="username" @search="getData" @change="userData=null"/>
      <user-full-info :loading="loading" :user-data="userData"></user-full-info>
      <template v-if="userData">
        <b>操作： </b>
        <a-button v-if="userData.status < 0" @click="updateUserStatus(username, PermissionLevel.COMMON)" :loading="submitting"> 解除禁用 </a-button>
        <a-button v-if="userData.status >= 0" type="danger" @click="updateUserStatus(username, PermissionLevel.FORBIDDEN)" :loading="submitting"> 禁用账号 </a-button>
      </template>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
import UserFullInfo from '@/components/user/user-full-info'
import {mapMutations, mapState} from "vuex";
export default {
  name: "Manage",
  components: {
    'title-box-frame': TitleBoxFrame,
    'user-full-info': UserFullInfo
  },
  data() {
    return {
      username: '',
      userData: null,
      loading: false,
      submitting: false
    }
  },
  computed: {
    ...mapState(['host', 'PermissionLevel', 'buildGetQuery'])
  },
  methods: {
    ...mapMutations(['permissionCheck']),
    getData() {
      let that = this
      if (that.username === '') {
        return
      }
      that.userData = null
      that.loading = true
      that.$http.get(that.host + `/user/full` + that.buildGetQuery({username: that.username}))
        .then(data => {
          if (data.data.code === 200) {
            that.userData = data.data.data
          } else {
            that.$message.error(data.data.msg)
            // that.$store.commit('errorPage', data.data.code)
          }
        })
        .catch(() => {
          that.$message.error('系统错误')
        })
        .finally(() => {
          that.loading = false
        })
    },
    updateUserStatus(username, status) {
      let that = this
      let sendData = new FormData()
      sendData.append('username', username)
      sendData.append('status', status)
      that.submitting = true
      that.$http.post(that.host + `/user/status`, sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              this.getData()
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.submitting = false
          })
    }
  },
  created() {
    this.permissionCheck(this.PermissionLevel.ADMIN)
  }
}
</script>

<style scoped>

</style>
