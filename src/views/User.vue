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
                  <a-icon type="check-circle" /><span> 共解决 <b style="color: black">{{userInfo.solved}}</b> 题</span>
                </div>
                <div title="用户签名" v-if="userInfo.signature">
                  <a-icon type="sound" /><span> {{userInfo.signature}}</span>
                </div>
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
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import SubmitCalendarHeatmap from '@/components/user/submit-calendar-heatmap'
import SubmitAcLineChart from '@/components/user/submit-ac-line-chart'
import LoadingFrameBox from '@/components/frame/loading-box-frame'
import {mapState} from "vuex";

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
    }
  },
  computed: {
    ...mapState([
        'host',
        'buildGetQuery'
    ])
  },
  methods: {
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
    getAllData() {
      this.getUserInfo()
      this.getWeekData()
      this.getYearData()
    }
  },
  created() {
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
</style>
