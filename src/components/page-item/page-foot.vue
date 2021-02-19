<template>
    <div class="page-foot">
      <div class="page-foot-content-box">
        <div class="foot-content-box">
          <b class="foot-title">服务</b>
          <router-link class="foot-item" :to="{path:'/status'}">评测队列</router-link>
          <router-link class="foot-item" :to="{path:'/FAQ'}">常见问题</router-link>
          <a class="foot-item" @click="feedbackVisible = true">意见反馈</a>
        </div>

        <div class="foot-content-box">
          <b class="foot-title">管理</b>
          <router-link class="foot-item" :to="{path:'/system'}">系统状态</router-link>
          <router-link class="foot-item" :to="{name:'admin_problem_data'}">数据管理</router-link>
          <router-link class="foot-item" :to="{path:'/admin'}">管理后台</router-link>
        </div>

        <div class="foot-content-box">
          <b class="foot-title">关于</b>
          <span class="foot-item" :title="'build '+buildVersion">ZUCC Online Judge &beta;</span>
          <span class="foot-item">&copy; {{ new Date().getFullYear() }} ZUCC ACM LAB</span>
          <span class="foot-item">Powered by <a href="https://github.com/KeadinZhou" target="_blank">@KeadinZhou</a></span>
        </div>
      </div>

      <a-modal
          v-model="feedbackVisible"
          :confirm-loading="feedbackSubmitting"
          title="意见反馈"
          centered
          ok-text="提交"
          cancel-text="取消"
          @ok="beforeFeedbackSubmit"
      >
        <a-textarea
            v-model="feedbackContent"
            placeholder="意见反馈内容"
            :auto-size="{ minRows: 10, maxRows: 20 }"
        />
        <div :style="'float: right;' + ((feedbackContent.length>FEEDBACK_MAX_LENGTH)?('color: red'):(''))">
          {{feedbackContent.length}}/{{FEEDBACK_MAX_LENGTH}}
        </div>
      </a-modal>
    </div>
</template>

<script>
  import {mapState} from "vuex";

  const FEEDBACK_MAX_LENGTH = 1000
  export default {
    name: 'page-foot',
    data() {
      return {
        FEEDBACK_MAX_LENGTH,
        buildVersion: '',
        feedbackVisible: false,
        feedbackSubmitting: false,
        feedbackContent: ''
      }
    },
    computed: {
      ...mapState(['host', 'user'])
    },
    methods: {
      fixZero(x) {
        if (x<10) {
          return '0'+x
        }
        return x
      },
      beforeFeedbackSubmit() {
        if (this.feedbackContent === '') {
          this.$message.error('反馈内容不能为空')
          return
        }
        if (this.feedbackContent.length > this.FEEDBACK_MAX_LENGTH) {
          this.$message.error(`反馈内容最长为 ${this.FEEDBACK_MAX_LENGTH} 个字符`)
          return
        }
        this.feedbackSubmit()
      },
      feedbackSubmit() {
        let that = this
        that.feedbackSubmitting = true
        let sendData = new FormData()
        sendData.append('content', that.feedbackContent)
        that.$http.post(that.host + `/feedback/new`, sendData)
            .then(data => {
              if (data.data.code === 200) {
                that.$message.success('反馈提交成功辣！感谢你的建议哦！ヾ(≧▽≦*)o')
                that.feedbackVisible = false
                that.feedbackContent = ''
              } else {
                that.$message.error(data.data.msg)
                that.$store.commit('errorPage', data.data.code)
              }
            })
            .catch(() => {
              that.$message.error('系统错误')
            })
            .finally(() => {
              that.feedbackSubmitting = false
            })
      }
    },
    created() {
      let version = new Date(document.getElementById("app-build-version").innerText)
      this.buildVersion = ''+version.getFullYear()+this.fixZero(version.getMonth()+1)+this.fixZero(version.getDate())+':'+this.fixZero(version.getHours())+this.fixZero(version.getMinutes())
    }
  }
</script>

<style scoped>
    .page-foot {
      width: 100%;
      background: white;
      padding: 40px;
    }

    .page-foot-content-box{
      width: 1100px;
      left: 50%;
      position: relative;
      transform: translate(-50%, 0);
      display: flex;
      justify-content: space-between;
    }

    .foot-content-box{
      display: inline-block;
      vertical-align: top;
      min-width: 200px;
    }

    .foot-title{
      color: black;
      font-size: 20px;
      margin-bottom: 30px;
      display: block;
    }

    .foot-item{
      color: darkgrey;
      margin: 10px 0;
      display: block;
    }

    .foot-item:hover{
      color: black;
    }
</style>
