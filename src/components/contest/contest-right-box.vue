<template>
  <base-box-frame>
    <template v-slot:content>
      <div style="margin-top: 10px">
        <template v-if="$route.params.problemId !== undefined">
            <div class="contest-right-button problem-submit-button" style="margin-top: 20px" @click="() => {$router.push({path:`/contest/${$route.params.contestId}/submit/${$route.params.problemId}`})}">
              <a-icon type="upload" /> <span style="margin-left: 10px">提交代码</span>
            </div>
          <a-divider />
        </template>
        <div class="contest-right-button" @click="() => {$router.push('/contest/'+contestInfo.contestId+'/problems')}">
          <a-icon type="unordered-list" /> <span style="margin-left: 10px">题目列表</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push('/contest/'+contestInfo.contestId+'/standings')}">
          <a-icon type="area-chart" /> <span style="margin-left: 10px">比赛榜单</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push('/contest/'+contestInfo.contestId+'/my')}">
          <a-icon type="upload" /> <span style="margin-left: 10px">我的提交</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push('/contest/'+contestInfo.contestId+'/status')}" v-if="false">
          <a-icon type="code" /> <span style="margin-left: 10px">评测记录</span>
        </div>
      </div>
      <a-divider />
      <div style="padding: 0 30px">
        <a-progress :percent="progressing" :status="(contestStatus>0)?('success'):('active')" :strokeWidth="30" :showInfo="false"/>
        <template v-if="contestStatus < 0">
          <a-statistic-countdown class="contest-countdown" :value="contestInfo.endTime" @finish="remind('比赛已经开始啦！页面即将刷新', true)" title="距离比赛开始还有"></a-statistic-countdown>
        </template>
        <template v-else-if="contestStatus > 0">
          <div style="width: 100%; text-align: center; height: 40px;line-height: 40px;font-size: 16px;color: black">比赛已结束</div>
        </template>
        <template v-else>
          <a-statistic-countdown class="contest-countdown" :value="contestInfo.endTime" @finish="remind('比赛已经结束啦！页面即将刷新', true)" title="距离比赛结束还有"></a-statistic-countdown>
        </template>
      </div>
      <a-divider />
      <div style="margin-bottom: 24px">
        <div class="description-item-box">
          <span class="description-item-title">比赛编号</span>
          <span class="description-item-content">{{ contestInfo.contestId }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">比赛状态</span>
          <span class="description-item-content">
            <span v-if="contestInfo.beginTime > $moment()"><a-badge status="success" />未开始</span>
            <span v-else-if="contestInfo.endTime < $moment()"><a-badge status="default" />已结束</span>
            <span v-else><a-badge status="processing" />进行中</span>
          </span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">比赛规则</span>
          <span class="description-item-content">{{ ContentTypeText[contestInfo.contestType] }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">题目数量</span>
          <span class="description-item-content">{{ contestInfo.problemCount }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">开始时间</span>
          <span class="description-item-content">{{ contestInfo.beginTime.format("YYYY-MM-DD HH:mm") }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">结束时间</span>
          <span class="description-item-content">{{ contestInfo.endTime.format("YYYY-MM-DD HH:mm") }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">参与人数</span>
          <span class="description-item-content">{{ contestInfo.memberCount }}</span>
        </div>
      </div>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import {mapState} from "vuex";
export default {
  name: "contest-right-box",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  props: {
    contestInfo: Object
  },
  data() {
    return {
      progressing: 0,
      contestStatus: 0, // -1: before; 0: running; 1: end
      nowTime: this.$moment()
    }
  },
  computed: {
    ...mapState(['ContentTypeText'])
  },
  methods: {
    progressClock() {
      let that = this
      that.nowTime = this.$moment()
      if (that.nowTime > that.contestInfo.endTime) {
        that.contestStatus = 1
        that.progressing = 100
        return
      } else if (that.nowTime < that.contestInfo.beginTime) {
        that.contestStatus = -1
        that.progressing = 0
      } else {
        that.contestStatus = 0
        let now = that.nowTime.unix()
        let begin = that.contestInfo.beginTime.unix()
        let end = that.contestInfo.endTime.unix()
        that.progressing =  (now - begin) / (end - begin) * 100;
      }
      setTimeout(()=>{
        that.progressClock()
      }, 1000)
    },
    remind(msg ,re) {
      this.$notification.open({
        message: '提醒',
        description: msg,
        icon: <a-icon type="smile" style="color: #108ee9" />,
      })
      if (re) {
        this.$router.push({name: 'refresh'})
      }
    }
  },
  created() {
    this.progressClock()
  }
}
</script>

<style scoped>
 .description-item-box{
   width: 100%;
   display: flex;
   height: 32px;
   line-height: 32px;
 }
 .description-item-title{
   color: rgb(100,100,100);
   width: 100px;
   margin-right: 20px;
   text-align: right;
 }
 .description-item-content{
   color: black;
 }
 .contest-countdown{
   margin-top: 10px;
   text-align: center;
 }
 .contest-right-button{
   width: 100%;
   height: 42px;
   line-height: 42px;
   font-size: 14px;
   padding: 0 40px;
   color: black;
   transition: 0.5s;
 }
 .contest-right-button:hover{
   background: rgb(244,244,244);
   cursor: pointer;
   box-shadow: inset 30px 0 0 -20px rgb(24,144,255);
 }
 .problem-submit-button:hover{
   background: rgb(244,244,244);
   cursor: pointer;
   box-shadow: inset 30px 0 0 -20px rgb(82, 196, 26);
 }
</style>
