<template>
  <title-box-frame title="用户密码">
    <template v-slot:content>
      <a-input-search v-model="username" placeholder="username" @search="getData" @change="userData=null"/>
      <user-full-info :loading="loading" :user-data="userData"></user-full-info>
      <template v-if="userData">
        <b>操作： </b>
        <a-button type="danger" @click="beforeResetSubmit" :loading="submitting"> 重置密码 </a-button>
      </template>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
import UserFullInfo from '@/components/user/user-full-info'
import {mapMutations, mapState} from "vuex";
export default {
  name: "Password",
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
    beforeResetSubmit() {
      let that = this
      this.$confirm({
        title: '删除重置密码',
        content: `真的将 ${that.username} 的密码重置为其用户名吗？确认后无法撤回。`,
        okText: '确认重置',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.resetUserPassword(that.username)
        },
        onCancel() {},
      });
    },
    resetUserPassword(username) {
      let that = this
      let sendData = new FormData()
      sendData.append('username', username)
      sendData.append('password', username)
      sendData.append('newPassword', username)
      that.submitting = true
      that.$http.post(that.host + `/user/update`, sendData)
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
