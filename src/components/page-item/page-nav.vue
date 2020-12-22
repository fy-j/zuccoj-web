<template>
  <a-affix :offset-top="0">
    <div class="page-nav">
      <div class="middle-box">
        <a-menu v-model="$store.state.current_page" mode="horizontal" @click="navClick" class="nav-menu">
          <a-menu-item key="home"> <a-icon type="home" theme="filled"/>首页 </a-menu-item>
          <a-menu-item key="problems"> <a-icon type="read" theme="filled" />题库 </a-menu-item>
          <a-menu-item key="rank"> <a-icon type="crown" theme="filled" />排名 </a-menu-item>
          <a-menu-item key="contests"> <a-icon type="flag" theme="filled" />比赛 </a-menu-item>
          <a-menu-item key="gym"> <a-icon type="tags" theme="filled" />题集 </a-menu-item>
        </a-menu>
        <div class="user-box">
          <template v-if="$store.state.user">
            <a-dropdown-button>
              {{$store.state.user.nickname}}
              <a-menu slot="overlay">
                <a-menu-item key="1">账号设置</a-menu-item>
                <a-menu-item key="2">提交记录</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3" @click="logoutSubmit">退出登录</a-menu-item>
              </a-menu>
              <a-icon slot="icon" type="user" />
            </a-dropdown-button>
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
      <a-alert
          message="校内同学请使用学号作为username，使用真实姓名作为nickname"
          type="info"
          show-icon
      />
      <a-input v-model="reg.username" placeholder="Username *" size="large" class="nav-input">
        <a-icon slot="prefix" type="user" />
      </a-input>
      <a-input v-model="reg.nickname" placeholder="Nickname *" size="large" class="nav-input">
        <a-icon slot="prefix" type="smile" />
      </a-input>
      <a-input v-model="reg.password" placeholder="Password *" size="large" type="password" class="nav-input">
        <a-icon slot="prefix" type="lock" />
      </a-input>
      <a-input v-model="reg.password2" placeholder="Repeat Password *" size="large" type="password" class="nav-input">
        <a-icon slot="prefix" type="lock" />
      </a-input>
      <a-input v-model="reg.email" placeholder="Email" size="large" type="email" class="nav-input">
        <a-icon slot="prefix" type="mail" />
      </a-input>
      <a-input v-model="reg.school" placeholder="School" size="large" class="nav-input">
        <a-icon slot="prefix" type="home" />
      </a-input>
      <a-input v-model="reg.captcha" placeholder="Captcha *" size="large" class="nav-input">
        <a-icon slot="prefix" type="safety" />
        <img slot="suffix" src="@/assets/CAPTCHA.jpg" alt="" width="100%">
      </a-input>
    </a-modal>
  </a-affix>
</template>

<script>
  export default {
    name: "page-nav",
    data() {
      return {
        loginModalVisible: false,
        loginSubmitting: false,
        regModalVisible: false,
        regSubmitting: false,
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
        }
      }
    },
    methods: {
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
        that.$http.post(that.$store.state.host + '/user/login', sendData)
        .then(data => {
          if (data.data.code === 200) {
            that.$store.commit('updateUser', true)
            that.login = {
              username: '',
              password: ''
            }
          } else {
            that.$message.error(data.data.msg)
          }
        })
        .catch(() => {
          that.$message.error('系统错误')
        })
        .finally(() => {
          that.loginSubmitting = false
          that.loginModalVisible = false
        })
        setTimeout(()=>{
        }, 500)
      },
      logoutSubmit() {
        let that = this
        that.$store.commit('logout')
      },
      regCheck() {
        let that = this
        if (!that.reg.username) {
          that.$message.error('请输入用户名')
          return
        }
        if (!that.reg.nickname) {
          that.$message.error('请输入昵称')
          return
        }
        if (!that.reg.password) {
          that.$message.error('请输入密码')
          return
        }
        if (!that.reg.password2) {
          that.$message.error('请重复输入密码')
          return
        }
        if (that.reg.password !== that.reg.password2) {
          that.$message.error('两次输入密码不一致')
          return
        }
        if (!that.reg.captcha) {
          that.$message.error('请输入验证码')
          return
        }
        that.regSubmit()
      },
      regSubmit() {
        let that = this
        that.regSubmitting = true
        setTimeout(()=>{
          that.$message.success("注册成功")
          that.login = {
            username: that.reg.username,
            password: that.reg.password
          }
          that.loginCheck()
          that.regSubmitting = false
          that.regModalVisible = false
        }, 500)
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
</style>
