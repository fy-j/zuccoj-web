<template>
  <title-box-frame title="评测机器状态/Judgehost">
    <template v-slot:content>
      <loading-box-frame v-if="loading"></loading-box-frame>
      <template v-else>
        <a-card-grid v-for="(judgehost, index) in judgehostData" style="width:25%;text-align: center" :key="'judgehost'+index">
          <a-dropdown :trigger="['contextmenu']">
            <div>
              <b class="judgehost-name">{{ judgehost.judgehostName }}</b> / Judgehost-{{ $store.state.fixZero(index+1) }} <br>
              {{ judgehost.heartbeatTime }} <br> <br>
              <a-badge
                  :color="statusCalc(judgehost.status).color"
                  :status="statusCalc(judgehost.status).status"
                  :text="statusCalc(judgehost.status).text">
              </a-badge>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="1" v-show="user && user.admin" @click="editClick(judgehost.judgehostName)">
                <a-icon type="edit" />修改密码
              </a-menu-item>
              <a-menu-item key="2" @click="getData">
                <a-icon type="loading" />刷新状态
              </a-menu-item>
              <a-menu-item key="3" v-show="user && user.admin" style="color: red" @click="beforeDeleteSubmit(judgehost.judgehostName)">
                <a-icon type="delete" />删除账号
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-card-grid>
        <a-card-grid class="add-judgehost-button" v-if="user && user.admin" @click="addVisible = true; isEdit = false">
          + 新增评测姬
          <a-modal
              v-model="addVisible"
              :confirm-loading="addSubmitting"
              :title="isEdit? '修改评测姬密码' : '新增评测姬'"
              centered
              ok-text="提交"
              cancel-text="取消"
              @ok="beforeAddSubmit"
          >
            <a-alert
                message="警告"
                description="务必确保账号与评测服务一一对应，且确保评测姬密码不外泄"
                type="warning"
                show-icon
            />
            <a-input v-model="addData.username" placeholder="username" size="large" class="nav-input" :disabled="isEdit">
              <a-icon slot="prefix" type="user" />
            </a-input>
            <a-input v-model="addData.password" placeholder="password" size="large" type="password" class="nav-input" @pressEnter="beforeAddSubmit">
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-modal>
        </a-card-grid>
      </template>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
import {mapState} from "vuex";
export default {
  name: "judgehost-status",
  components: {
    'title-box-frame': TitleBoxFrame,
    'loading-box-frame': LoadingBoxFrame
  },
  data() {
    return {
      loading: false,
      judgehostData: [],
      addVisible: false,
      addSubmitting: false,
      addData: {
        username: '',
        password: ''
      },
      isEdit: false
    }
  },
  computed: {
    ...mapState(['host', 'user'])
  },
  methods: {
    statusCalc(s) {
      switch (s) {
        case -1:
          return {
            color: '',
            status: 'error',
            text: '离线'
          }
        case 0:
          return {
            color: '',
            status: 'default',
            text: '未知'
          }
        case 1:
          return {
            color: 'green',
            status: 'processing',
            text: '在线'
          }
        case 2:
          return {
            color: '',
            status: 'warning',
            text: '正忙'
          }
      }
    },
    getData() {
      let that = this
      that.loading = true
      that.$http.get(that.host + '/judgehost/status')
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.judgehostData = Data
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.loading = false
          })
    },
    beforeAddSubmit() {
      if (this.addData.username === '' || this.addData.password === '') {
        this.$message.error('用户名和密码为必填项')
        return
      }
      if (this.addData.username.length > 10) {
        this.$message.error('用户名长度最大为10')
        return
      }
      this.addSubmit()
    },
    addSubmit() {
      let that = this
      that.addSubmitting = true
      let sendData = new FormData()
      sendData.append('username', that.addData.username)
      sendData.append('password', that.addData.password)
      that.$http.post(that.host + `/judgehost/${that.isEdit? 'update' : 'new'}`, sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.addVisible = false
              that.addData = {
                username: '',
                password: ''
              }
              that.getData()
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.addSubmitting = false
          })
    },
    beforeDeleteSubmit(username) {
      let that = this
      this.$confirm({
        title: '删除确认',
        content: `真的要删除评测姬 ${username} 吗？删除后不可恢复。`,
        okText: '确认删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.deleteSubmit(username)
        },
        onCancel() {},
      });
    },
    deleteSubmit(username) {
      let that = this
      let sendData = new FormData()
      sendData.append('username', username)
      that.$http.post(that.host + '/judgehost/delete', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.getData()
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
          })
    },
    editClick(username) {
      this.addVisible = true
      this.isEdit = true
      this.addData = {
        username: username,
        password: ''
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
  .judgehost-name{
    font-size: 16px;
  }
  .add-judgehost-button{
    width: 25%;
    text-align: center;
    height: 135px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .nav-input{
    margin-top: 10px;
  }
</style>
