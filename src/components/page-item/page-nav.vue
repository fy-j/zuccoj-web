<template>
  <a-affix :offset-top="0">
    <div class="page-nav">
      <div class="middle-box">
        <a-menu v-model="$store.state.current_page" mode="horizontal" @click="navClick" class="nav-menu">
          <a-menu-item key="home"> <a-icon type="home" theme="filled"/>首页 </a-menu-item>
          <a-menu-item key="problems"> <a-icon type="read" theme="filled" />题库 </a-menu-item>
          <a-menu-item key="rank"> <a-icon type="crown" theme="filled" />排名 </a-menu-item>
          <a-menu-item key="contests"> <a-icon type="flag" theme="filled" />比赛 </a-menu-item>
          <a-menu-item key="gym" disabled> <a-icon type="tags" theme="filled" />题集 </a-menu-item>
        </a-menu>
        <div class="user-box">
          <template v-if="user">
            <a-dropdown>
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="user" /> {{user.nickname}} <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1" @click="gotoUserPage">账号设置</a-menu-item>
                <a-menu-item key="2" @click="gotoUserSubmissions">提交记录</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3" @click="logoutSubmit">退出登录</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <template v-else>
            <a-button type="primary" @click="()=>(loginModalVisible = true)">登录</a-button>
            <a-button @click="()=>(regModalVisible = true)" style="margin-left: 10px">注册</a-button>
          </template>
        </div>
      </div>
    </div>
    <a-modal
        v-model="loginModalVisible"
        :confirm-loading="loginSubmitting"
        title="登录"
        centered
        ok-text="登录"
        cancel-text="取消"
        @ok="loginCheck"
    >
      <a-input v-model="login.username" placeholder="username" size="large" class="nav-input">
        <a-icon slot="prefix" type="user" />
      </a-input>
      <a-input v-model="login.password" placeholder="password" size="large" type="password" class="nav-input" @pressEnter="loginCheck">
        <a-icon slot="prefix" type="lock" />
      </a-input>
    </a-modal>

    <a-modal
        v-model="regModalVisible"
        :confirm-loading="regSubmitting"
        title="注册"
        centered
        ok-text="注册"
        cancel-text="取消"
        @ok="regCheck"
    >
      <a-form-model :rules="regRules" :model="reg" ref="regForm">
        <a-alert
            message="校内同学请使用学号作为username，使用真实姓名作为nickname"
            type="info"
            show-icon
        />
        <a-form-model-item prop="username">
          <a-input v-model="reg.username" placeholder="Username *" size="large" class="nav-input">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="nickname">
          <a-input v-model="reg.nickname" placeholder="Nickname *" size="large" class="nav-input">
            <a-icon slot="prefix" type="smile" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input v-model="reg.password" placeholder="Password *" size="large" type="password" class="nav-input">
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password2">
          <a-input v-model="reg.password2" placeholder="Repeat Password *" size="large" type="password" class="nav-input">
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="email">
          <a-input v-model="reg.email" placeholder="Email" size="large" type="email" class="nav-input">
            <a-icon slot="prefix" type="mail" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="school">
          <a-input v-model="reg.school" placeholder="School" size="large" class="nav-input">
            <a-icon slot="prefix" type="home" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="captcha">
          <a-input v-model="reg.captcha" placeholder="Captcha *" size="large" class="nav-input">
            <a-icon slot="prefix" type="safety" />
            <img slot="suffix" :src="captchaUrl" @click="() => {this.captchaUrl = this.host+'/captcha/get?p='+new Date().getTime()}" alt="看不清? 单击更换图片" width="100%" title="看不清? 单击更换图片">
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-affix>
</template>

<script>
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "page-nav",
    data() {
      return {
        loginModalVisible: false,
        loginSubmitting: false,
        regModalVisible: false,
        regSubmitting: false,
        captchaUrl: this.$store.state.host+'/captcha/get?p='+new Date().getTime(),
        login: {
          username: '',
          password: ''
        },
        reg: {
          username: '',
          nickname: '',
          password: '',
          password2: '',
          school: '',
          email: '',
          captcha : ''
        },
        regRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在6-16之间', trigger: 'blur'},
            { validator: this.usernameCheck, trigger: 'change' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在2-16之间', trigger: 'blur'},
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在6-20之间', trigger: 'blur'},
          ],
          password2: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: this.password2Check, trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        }
      }
    },
    computed: {
      ...mapState(['host', 'user', 'current_page'])
    },
    methods: {
      ...mapMutations(['updateUser', 'logout']),
      navClick(item) {
        this.$router.push({name:item.key})
      },
      loginCheck() {
        let that = this
        if (!that.login.username) {
          that.$message.error('请输入用户名')
          return
        }
        if (!that.login.password) {
          that.$message.error('请输入密码')
          return
        }
        that.loginSubmit()
      },
      loginSubmit() {
        let that = this
        that.loginSubmitting = true
        let sendData = new FormData()
        sendData.append('username', that.login.username)
        sendData.append('password', that.login.password)
        that.$http.post(that.host + '/user/login', sendData)
        .then(data => {
          if (data.data.code === 200) {
            that.updateUser(true)
            that.loginModalVisible = false
            that.login = {
              username: '',
              password: ''
            }
            that.$router.replace({name:'refresh'})
          } else {
            that.$message.error(data.data.msg)
          }
        })
        .catch(() => {
          that.$message.error('系统错误')
        })
        .finally(() => {
          that.loginSubmitting = false
        })
      },
      logoutSubmit() {
        let that = this
        that.logout()
      },
      usernameCheck(rule, value, callback) {
        if (!/^[A-Za-z0-9._]{6,16}$/.test(value)) {
          callback(new Error('只能含有字母、数字、小数点和下划线，且长度在6-16之间'))
        } else {
          callback()
        }
      },
      password2Check(rule, value, callback) {
        if (value !== this.reg.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      regCheck() {
        let that = this
        that.$refs["regForm"].validate(valid => {
          if (valid) {
            that.regSubmit()
          }
        })
      },
      regSubmit() {
        let that = this
        that.regSubmitting = true

        let sendData = new FormData()
        sendData.append('username', that.reg.username)
        sendData.append('nickname', that.reg.nickname)
        sendData.append('password', that.reg.password)
        sendData.append('school', that.reg.school)
        sendData.append('email', that.reg.email)
        sendData.append('captcha', that.reg.captcha)

        that.$http.post(that.host + '/user/register', sendData)
            .then(data => {
              if (data.data.code === 200) {
                that.$message.success("注册成功")
                that.regModalVisible = false
                that.login = {
                  username: that.reg.username,
                  password: that.reg.password
                }
                that.loginCheck()
                that.reg = {
                  username: '',
                  nickname: '',
                  password: '',
                  password2: '',
                  school: '',
                  email: '',
                  captcha : ''
                }
              } else {
                that.$message.error(data.data.msg)
              }
            })
            .catch(() => {
              that.$message.error('系统错误')
            })
            .finally(() => {
              that.regSubmitting = false
            })
      },
      gotoUserSubmissions() {
        if (!this.user) {
          this.$message.error('请先登录')
          return
        }
        this.$router.push({
          name: 'status',
          query: {
            username: this.user.username
          }
        })
      },
      gotoUserPage() {
        if (!this.user) {
          this.$message.error('请先登录')
          return
        }
        this.$router.push({
          name: 'user',
          params: {
            username: this.user.username
          }
        })
      }
    }
  }
</script>

<style scoped>
  .page-nav{
    line-height: 46px;
    white-space: nowrap;
    border: 0;
    border-bottom: 1px solid #e8e8e8;
    box-shadow: none;
    background: white;
  }
  .middle-box{
    position: relative;
    width: 1100px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .nav-menu{
    width: calc(100% - 300px);
    display: inline-block;
  }
  .user-box{
    float: right;
  }
  .nav-input{
    margin-top: 10px;
  }
  .ant-form-item{
    margin-bottom: 0;
  }
</style>
