<template>
  <div>
    <loading-box-frame v-if="loading"></loading-box-frame>
    <template v-else>
      <div class="contest-title">
        {{ contestInfo.contestName }} <span style="cursor: pointer" @click="()=>{rightBoxShow=!rightBoxShow}"><a-icon
          :type="rightBoxShow?'arrows-alt':'shrink'"/></span>
      </div>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="rightBoxShow?18:24">
          <router-view/>
        </a-col>
        <a-col class="gutter-row" :span="6" v-if="rightBoxShow">
          <contest-right-box :contest-info="contestInfo"></contest-right-box>
        </a-col>
      </a-row>
    </template>
    <a-modal
        v-model="inputPasswordVisible"
        title="输入比赛密码"
        centered
        ok-text="确认"
        cancel-text="取消"
        :closable="false"
        :keyboard="false"
        :maskClosable="false"
        :maskStyle="{background: 'rgba(0,0,0,.9)'}"
        @cancel="$router.push({name:'contests'})"
        @ok="registerContest"
        :confirmLoading="registering"
    >
      <a-alert
          message="该比赛为私有比赛，请输入比赛密码以注册该比赛"
          type="info"
          show-icon
      />
      <br>
      <a-input v-model="inputPassword" placeholder="比赛密码" size="large"></a-input>
    </a-modal>
  </div>
</template>

<script>
import ContestRightBox from '@/components/contest/contest-right-box'
import {mapState} from "vuex";
import LoadingBoxFrame from '@/components/frame/loading-box-frame'

export default {
  name: "Contest",
  provide() {
    return {
      getContestInfo: () => this.contestInfo
    }
  },
  components: {
    'contest-right-box': ContestRightBox,
    'loading-box-frame': LoadingBoxFrame
  },
  data() {
    return {
      contestInfo: {},
      rightBoxShow: true,
      loading: false,
      inputPasswordVisible: false,
      inputPassword: '',
      registering: false
    }
  },
  computed: {
    ...mapState(['host', 'buildGetQuery'])
  },
  methods: {
    getData() {
      let that = this
      let contestId = that.$route.params.contestId
      that.loading = true
      that.$http.get(that.host + '/contest/info' + that.buildGetQuery({contestId: contestId}))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.contestInfo = Data
              that.contestInfo.beginTime = that.$moment(that.contestInfo.beginTime)
              that.contestInfo.endTime = that.$moment(that.contestInfo.endTime)
              if (that.contestInfo.status === -1) {
                that.$message.error('请先登录')
                that.$router.push({name: 'contests'})
              } else if (that.contestInfo.status === 0) {
                that.$message.error('无私有比赛许可')
                that.inputPasswordVisible = true
              } else {
                that.loading = false
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
          })
    },
    registerContest() {
      let that = this
      let contestId = that.$route.params.contestId
      that.registering = true
      let sendData = new FormData()
      sendData.append('contestId', contestId)
      sendData.append('password', that.inputPassword)
      that.$http.post(that.host + '/contest/register', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.$router.replace({name: 'refresh'})
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.registering = false
          })
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'contests')
    this.getData()
  },
  watch: {
    '$route': function () {
      this.getData()
    }
  }
}
</script>

<style scoped>
.contest-title {
  font-size: 24px;
  font-weight: 700;
  color: black;
  margin: 20px 0;
  font-family: "Microsoft YaHei", "微软雅黑", serif;
}
</style>
