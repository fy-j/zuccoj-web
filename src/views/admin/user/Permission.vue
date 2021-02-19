<template>
  <title-box-frame title="用户权限">
    <template v-slot:content>

      <a-table :columns="columns" :data-source="listData" size="middle" :loading="listLoading">
        <span slot="action" slot-scope="record">
          <a-button type="link" @click="username=record.username;getData()">修改权限</a-button>
        </span>
      </a-table>

      <a-input-search style="margin-top: 20px" v-model="username" placeholder="username" @search="getData" @change="userData=null"/>
      <user-full-info :loading="loading" :user-data="userData"></user-full-info>
      <template v-if="userData">
        <b>修改权限： </b>

        <a-select style="width: 150px; margin-right: 10px" v-model="status">
          <a-select-option :value="PermissionLevel.FORBIDDEN">
            FORBIDDEN
          </a-select-option>
          <a-select-option :value="PermissionLevel.COMMON">
            COMMON
          </a-select-option>
          <a-select-option :value="PermissionLevel.DATA_VIEWER">
            DATA_VIEWER
          </a-select-option>
          <a-select-option :value="PermissionLevel.CODE_VIEWER">
            CODE_VIEWER
          </a-select-option>
          <a-select-option :value="PermissionLevel.ADMIN">
            ADMIN
          </a-select-option>
        </a-select>

        <a-button @click="updateUserStatus(username, status)">提交</a-button>
      </template>
    </template>
  </title-box-frame>
</template>

<script>
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
    scopedSlots: { customRender: 'username' },
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
    key: 'nickname',
    align: 'center',
    scopedSlots: { customRender: 'nickname' },
    width: '500px'
  },
  {
    title: '用户权限',
    dataIndex: 'statusText',
    key: 'statusText',
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
];
import TitleBoxFrame from '@/components/frame/title-box-frame'
import UserFullInfo from '@/components/user/user-full-info'
import {mapMutations, mapState} from "vuex";
export default {
  name: "Permission",
  components: {
    'title-box-frame': TitleBoxFrame,
    'user-full-info': UserFullInfo
  },
  data() {
    return {
      columns,
      username: '',
      userData: null,
      loading: false,
      submitting: false,
      status: '',
      listLoading: false,
      listData: []
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
              that.status = that.userData.status
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
    getUserList() {
      let that = this
      that.listLoading = true
      that.$http.get(that.host + `/user/permission`)
          .then(data => {
            if (data.data.code === 200) {
              that.listData = data.data.data
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.listLoading = false
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
              this.getUserList()
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
    // this.permissionCheck(this.PermissionLevel.ADMIN)
    this.getUserList()
  }
}
</script>

<style scoped>

</style>
