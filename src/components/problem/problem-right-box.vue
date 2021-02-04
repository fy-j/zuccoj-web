<template>
  <base-box-frame>
    <template v-slot:content>
      <div style="margin-top: 20px">
        <div class="contest-right-button problem-submit-button" @click="() => {$router.push({path:`/problem/${problemInfo.problemId}/submit`})}">
          <a-icon type="upload" /> <span style="margin-left: 10px">提交代码</span>
        </div>
        <a-divider />
        <div class="contest-right-button" @click="() => {$router.push({path:`/problem/${problemInfo.problemId}`})}">
          <a-icon type="profile" /> <span style="margin-left: 10px">题目描述</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push({path:`/problem/${problemInfo.problemId}/status/${user.username}`})}" v-if="user">
          <a-icon type="menu" /> <span style="margin-left: 10px">我的提交</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push({path:`/problem/${problemInfo.problemId}/status`})}">
          <a-icon type="code" /> <span style="margin-left: 10px">所有提交</span>
        </div>
        <a-divider />
        <div style="margin-bottom: 24px">
          <div class="description-item-box">
            <span class="description-item-title">题目编号</span>
            <span class="description-item-content">{{ problemInfo.problemId }}</span>
          </div>
          <div class="description-item-box">
            <span class="description-item-title">时间限制</span>
            <span class="description-item-content">{{ problemInfo.timeLimit }}ms</span>
          </div>
          <div class="description-item-box">
            <span class="description-item-title">内存限制</span>
            <span class="description-item-content">{{ problemInfo.memoryLimit/1024 }}MB</span>
          </div>
          <div class="description-item-box">
            <span class="description-item-title">提交数</span>
            <span class="description-item-content">{{ problemInfo.submitted }}</span>
          </div>
          <div class="description-item-box">
            <span class="description-item-title">通过数</span>
            <span class="description-item-content">{{ problemInfo.solved }}</span>
          </div>
          <div class="description-item-box" v-if="problemInfo.submitted">
            <span class="description-item-title">通过率</span>
            <span class="description-item-content">{{ (problemInfo.solved/problemInfo.submitted*100).toFixed(2) }}%</span>
          </div>
        </div>
        <template v-if="problemInfo.tags && problemInfo.tags.length > 0">
          <a-divider />
          <div style="margin-bottom: 24px;padding: 0 30px;display: flex;justify-content: center">
            <a-tag v-for="(tag, index) in problemInfo.tags" :key="tag+index">{{tag}}</a-tag>
          </div>
        </template>
      </div>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import {mapState} from "vuex";
export default {
  name: "problem-right-box",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  props: {
    problemInfo: Object
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['user'])
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
  width: 120px;
  margin-right: 20px;
  text-align: right;
}
.description-item-content{
  color: black;
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
