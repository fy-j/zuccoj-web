<template>
  <div>
    <div class="contest-title">
      {{contestInfo.contestName}} <span style="cursor: pointer" @click="()=>{rightBoxShow=!rightBoxShow}"><a-icon :type="rightBoxShow?'arrows-alt':'shrink'" /></span>
    </div>
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="rightBoxShow?18:24">
        <router-view />
      </a-col>
      <a-col class="gutter-row" :span="6" v-if="rightBoxShow">
        <contest-right-box :contest-info="contestInfo"></contest-right-box>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ContestRightBox from '@/components/contest/contest-right-box'
export default {
  name: "Contest",
  components: {
    'contest-right-box': ContestRightBox
  },
  data() {
    return {
      contestInfo: {
        contestId: this.$route.params.contestId,
        contestName: '2020ZUCC天梯赛训练赛10',
        beginTime: new Date('2020-07-01 16:00:00'),
        endTime: new Date('2020-12-30 17:00:00'),
        problemCount: 8,
        rule: 'ACM/ICPC',
        memberNum: 151,
        status: 0,
      },
      rightBoxShow: true
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'contests')
  }
}
</script>

<style scoped>
  .contest-title {
    font-size: 24px;
    font-weight: 700;
    color: black;
    margin: 20px 0;
    font-family: "Microsoft YaHei", "微软雅黑",serif;
  }
</style>
