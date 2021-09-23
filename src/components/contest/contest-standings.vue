<template>
<!--  <base-box-frame>-->
<!--    <template v-slot:content>-->
      <loading-box-frame height="900px" width="100%" v-if="loading"></loading-box-frame>
      <div v-else-if="scoreboardData.contestType !== undefined">
        <div class="scoreboard-container">
          <a-alert message="进入封榜时间，选手榜单已冻结" type="warning" close-text="知道了" show-icon style="margin-bottom: 10px" v-if="scoreboardData.contestFrozen && scoreboardData.contestType === 1"/>
          <div :style="`width: ${370+65*scoreboardData.problemCount}px; background: #FFFFFF`">
            <scoreboard-for-icpc v-if="scoreboardData.contestType === 1" :scoreboard="scoreboardData"></scoreboard-for-icpc>
            <scoreboard-for-oi v-else-if="scoreboardData.contestType === 2 || scoreboardData.contestType === 3" :scoreboard="scoreboardData"></scoreboard-for-oi>
          </div>
          <div class="scoreboard-under-text">
            <i>Scoreboard Mode: <b>{{ContentTypeText[scoreboardData.contestType]}}</b> | Last Update Time: <b>{{$moment(scoreboardData.updateTime).format("YYYY-MM-DD HH:mm:ss")}}</b></i>
          </div>
        </div>
      </div>
      <a-empty v-else style="margin: 200px 0"/>
<!--    </template>-->
<!--  </base-box-frame>-->
</template>

<script>
import {mapState} from "vuex";
// import BaseBoxFrame from '@/components/frame/base-box-frame'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
import ScoreboardForICPC from '@/components/scoreboard/scoreboard-for-icpc'
import ScoreboardForOI from '@/components/scoreboard/scoreboard-for-oi'
export default {
  name: "contest-standing",
  components: {
    // 'base-box-frame': BaseBoxFrame,
    'loading-box-frame': LoadingBoxFrame,
    'scoreboard-for-icpc': ScoreboardForICPC,
    'scoreboard-for-oi': ScoreboardForOI,
  },
  data() {
    return {
      loading: false,
      scoreboardData: {}
    }
  },
  computed: {
    ...mapState([
        'host',
        'buildGetQuery',
        'ContentTypeText'
    ])
  },
  methods: {
    getScoreboardData() {
      let that = this
      let contestId = that.$route.params.contestId
      that.loading = true
      that.scoreboardData = {}
      that.$http.get(that.host + '/contest/scoreboard' + that.buildGetQuery({contestId: contestId}))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.scoreboardData = JSON.parse(Data)
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
    }
  },
  mounted() {
    this.getScoreboardData()
  }
}
</script>

<style scoped>
.scoreboard-container{
  overflow-x: auto;
}
.scoreboard-under-text{
  font-size: 12px;
  color: rgba(0,0,0,.5);
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 5px;
}
</style>
