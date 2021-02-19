<template>
  <base-box-frame>
    <template v-slot:content>
      <div class="user-page-box">
        <div class="user-info-box">
          <div class="user-info-left">
            <a-skeleton active :loading="infoLoading">
              <div class="user-info-nickname">
                {{userInfo.nickname}}
              </div>
              <div class="user-info-username">
                @{{userInfo.username}}
              </div>
              <div class="user-info-data">
                <div title="注册时间">
                  <a-icon type="clock-circle" /><span> 于{{ $moment(userInfo.regTime).format("YYYY-MM-DD")}}注册</span>
                </div>
                <div title="学校" v-if="userInfo.school">
                  <a-icon type="environment" /><span> {{userInfo.school}}</span><br>
                </div>
                <div title="总提交数">
                  <a-icon type="upload" /><span> 共 <b style="color: black">{{userInfo.submitted}}</b> 次提交</span>
                </div>
                <div title="总过题数">
                  <a-icon type="check-circle" /><span> 共解决 <b style="color: black">{{userInfo.solved}}</b> 个问题</span>
                </div>
                <div title="用户签名" v-if="userInfo.signature">
                  <a-icon type="sound" /><span> {{userInfo.signature}}</span>
                </div>
              </div>
              <div class="user-info-edit-button-box" v-if="(user) && (user.username === $route.params.username)">
                <a-button block @click="userEditClick">
                  个人设置
                </a-button>
              </div>
            </a-skeleton>
          </div>
          <div class="user-info-right">
            <h3><b>近一周的提交</b></h3>
            <loading-box-frame v-if="weekLoading"></loading-box-frame>
            <submit-ac-line-chart v-else :chart-data="weekDate"></submit-ac-line-chart>
            <h3 style="margin-bottom: 40px"><b>近一年的提交</b></h3>
            <loading-box-frame v-if="yearLoading" height="150px"></loading-box-frame>
            <submit-calendar-heatmap v-else :chart-data="yearDate"></submit-calendar-heatmap>
            <h3 style="margin-top: 40px"><b>所有过题记录</b></h3>
            <router-link :to="{name: 'status', query: {username: $route.params.username, result: 7}}">查看该用户所有过题记录 >>></router-link>
          </div>
        </div>
      </div>
      <a-modal
          v-model="userEditVisible"
          :confirm-loading="userEditSubmitting"
          title="个人设置"
          ok-text="提交"
          cancel-text="取消"
          @ok="userEditCheck"
      >
        <loading-box-frame v-if="userEditLoading" height="480px" />
        <a-form-model :rules="userEditRules" :model="userEditData" ref="userEditForm"  :label-col="{span:4}" :wrapper-col="{span:20}" v-else>
          <a-form-model-item prop="username" label="用户名">
            <a-input v-model="userEditData.username" placeholder="用户名" disabled>
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password" label="密码">
            <a-input v-model="userEditData.password" placeholder="密码" type="password">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="newPassword" label="新密码">
            <a-input v-model="userEditData.newPassword" placeholder="新密码，留空表示不修改" type="password">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="newPassword2" label="确认新密码" v-if="userEditData.newPassword">
            <a-input v-model="userEditData.newPassword2" placeholder="再次确认新密码" type="password">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="nickname" label="昵称">
            <a-input v-model="userEditData.nickname" placeholder="昵称">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="email" label="邮箱">
            <a-input v-model="userEditData.email" placeholder="邮箱">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="school" label="学校">
            <a-input v-model="userEditData.school" placeholder="学校">
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="signature" label="签名">
            <a-input v-model="userEditData.signature" placeholder="签名">
            </a-input>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import SubmitCalendarHeatmap from '@/components/user/submit-calendar-heatmap'
import SubmitAcLineChart from '@/components/user/submit-ac-line-chart'
import LoadingFrameBox from '@/components/frame/loading-box-frame'
import {mapMutations, mapState} from "vuex";

export default {
  name: "User",
  components: {
    'base-box-frame': BaseBoxFrame,
    'submit-calendar-heatmap': SubmitCalendarHeatmap,
    'submit-ac-line-chart': SubmitAcLineChart,
    'loading-box-frame': LoadingFrameBox
  },
  data() {
    return {
      userInfo: {},
      weekDate: [],
      yearDate: [],
      infoLoading: false,
      weekLoading: false,
      yearLoading: false,
      userEditVisible: false,
      userEditLoading: false,
      userEditSubmitting: false,
      userEditData: {
        username: '',
        nickname: '',
        email: '',
        signature: '',
        school: '',
        password: '',
        newPassword: '',
        newPassword2: ''
      },
      userEditRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在6-16之间', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请验证密码以确认身份', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在6-20之间', trigger: 'blur'},
        ],
        newPassword: [
          {min: 6, max: 20, message: '长度在6-20之间', trigger: 'blur'},
        ],
        newPassword2: [
          { validator: this.password2Check, trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapState([
        'host',
        'buildGetQuery',
        'user'
    ])
  },
  methods: {
    ...mapMutations(['updateUser']),
    password2Check(rule, value, callback) {
      if (value !== this.userEditData.newPassword) {
        callback(new Error('两次新密码不一致'))
      } else {
        callback()
      }
    },
    getUserInfo() {
      let that = this
      let username = this.$route.params.username
      that.infoLoading = true
      that.$http.get(that.host + '/user/info' + that.buildGetQuery({username: username}))
          .then(data => {
            if (data.data.code === 200) {
              that.userInfo = data.data.data
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.infoLoading = false
          })
    },
    getWeekData() {
      let that = this
      let username = this.$route.params.username
      that.weekDate = []
      that.weekLoading = true
      that.$http.get(that.host + '/solution/weekStat' + that.buildGetQuery({username: username}))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              for (let item of Data) {
                that.weekDate.push({
                  Date: item.date,
                  Submit: item.submitted,
                  Accept: item.solved
                })
              }
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.weekLoading = false
          })
    },
    getYearData() {
      let that = this
      let username = this.$route.params.username
      that.yearDate = []
      that.yearLoading = true
      that.$http.get(that.host + '/solution/yearStat' + that.buildGetQuery({username: username}))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              for (let item of Data) {
                that.yearDate.push({
                  date: item.date,
                  count: item.submitted
                })
              }
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.yearLoading = false
          })
    },
    getUserEditData() {
      let that = this
      let username = this.$route.params.username
      that.userEditLoading = true
      that.$http.get(that.host + '/user/edit' + that.buildGetQuery({username: username}))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.userEditData = {
                username: Data.username,
                nickname: Data.nickname,
                email: Data.email,
                signature: Data.signature,
                school: Data.school,
                password: '',
                newPassword: '',
                newPassword2: ''
              }
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.userEditLoading = false
          })
    },
    userEditClick() {
      this.userEditVisible = true
      this.getUserEditData()
    },
    userEditCheck() {
      let that = this
      that.$refs["userEditForm"].validate(valid => {
        if (valid) {
          that.userEditSubmit()
        }
      })
    },
    userEditSubmit() {
      let that = this
      let username = this.$route.params.username
      that.userEditSubmitting = true
      let sendData = new FormData()
      sendData.append('username', username)
      sendData.append('nickname', that.userEditData.nickname)
      sendData.append('email', that.userEditData.email)
      sendData.append('signature', that.userEditData.signature)
      sendData.append('school', that.userEditData.school)
      sendData.append('password', that.userEditData.password)
      if (that.userEditData.newPassword !== '') {
        sendData.append('newPassword', that.userEditData.newPassword)
      }
      that.$http.post(that.host + '/user/update', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.updateUser(false)
              that.userEditVisible = false
              that.$router.push({name: 'refresh'})
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.userEditSubmitting = false
          })
    },
    getAllData() {
      this.getUserInfo()
      this.getWeekData()
      this.getYearData()
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'user')
    this.getAllData()
  },
  watch: {
    '$route': function () {
      this.getAllData()
    }
  }
}
</script>

<style scoped>
.user-page-box{
  padding: 20px 30px;
}
.user-info-box{
  width: 100%;
  color: black;
  display: flex;
  justify-content: space-between;
}
.user-info-left{
  width: 250px;
  border-right: solid #e0e0e0 1px;
  padding-right: 10px;
}
.user-info-nickname{
  font-size: 24px;
  font-weight: bolder;
}
.user-info-username{
  font-size: 16px;
  color: #616161;
}
.user-info-data{
  margin-top: 30px;
}
.user-info-data div{
  margin-top: 8px;
  width: calc(100% - 10px);
  display: flex;
  align-items: flex-start;
  line-height: 18px;
}
.user-info-data div span{
  margin-left: 5px;
  color: #586069;
}
.user-info-right{
  width: 760px
}
.user-info-edit-button-box{
  margin-top: 30px;
  padding-right: 13px;
}
</style>
