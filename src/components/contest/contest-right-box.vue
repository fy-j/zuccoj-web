<template>
  <base-box-frame>
    <template v-slot:content>
      <div style="margin-top: 10px">
        <div class="contest-right-button" @click="() => {$router.push('/contest/'+contestInfo.contestId+'/problems')}">
          <a-icon type="unordered-list" /> <span style="margin-left: 10px">题目列表</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push('/contest/'+contestInfo.contestId+'/standings')}">
          <a-icon type="area-chart" /> <span style="margin-left: 10px">比赛榜单</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push('/contest/'+contestInfo.contestId+'/my')}">
          <a-icon type="upload" /> <span style="margin-left: 10px">我的提交</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push('/contest/'+contestInfo.contestId+'/status')}">
          <a-icon type="code" /> <span style="margin-left: 10px">评测记录</span>
        </div>
      </div>
      <a-divider />
      <div style="padding: 0 30px">
        <a-progress :percent="((new Date())-contestInfo.beginTime)/(contestInfo.endTime-contestInfo.beginTime)*100" status="active" :strokeWidth="30" :showInfo="false"/>
        <a-statistic-countdown class="contest-countdown" :value="contestInfo.endTime.valueOf()"></a-statistic-countdown>
      </div>
      <a-divider />
      <div style="margin-bottom: 24px">
        <div class="description-item-box">
          <span class="description-item-title">比赛编号</span>
          <span class="description-item-content">{{ contestInfo.contestId }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">比赛状态</span>
          <span class="description-item-content"><a-badge status="processing" />进行中</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">比赛规则</span>
          <span class="description-item-content">{{ contestInfo.rule }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">题目数量</span>
          <span class="description-item-content">{{ contestInfo.problemCount }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">开始时间</span>
          <span class="description-item-content">{{ $store.state.dateFormat(contestInfo.beginTime) }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">结束时间</span>
          <span class="description-item-content">{{ $store.state.dateFormat(contestInfo.endTime) }}</span>
        </div>
        <div class="description-item-box">
          <span class="description-item-title">参与人数</span>
          <span class="description-item-content">{{ contestInfo.memberNum }}</span>
        </div>
      </div>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "contest-right-box",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  props: {
    contestInfo: Object
  },
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
 }
 .contest-right-button:hover{
   background: rgb(244,244,244);
   cursor: pointer;
 }
</style>
