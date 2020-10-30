<template>
  <base-box-frame>
    <template v-slot:content>
      <div style="margin-top: 20px">
        <div class="contest-right-button" @click="() => {$router.push('/problem/'+problem.problemId+'/submit')}">
          <a-icon type="upload" /> <span style="margin-left: 10px">提交代码</span>
        </div>
        <a-divider />
        <div class="contest-right-button" @click="() => {$router.push('/problem/'+problem.problemId)}">
          <a-icon type="profile" /> <span style="margin-left: 10px">题目描述</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push('/problem/'+problem.problemId+'/my')}">
          <a-icon type="menu" /> <span style="margin-left: 10px">我的提交</span>
        </div>
        <div class="contest-right-button" @click="() => {$router.push('/problem/'+problem.problemId+'/my')}">
          <a-icon type="code" /> <span style="margin-left: 10px">所有提交</span>
        </div>
        <a-divider />
      </div>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "problem-right-box",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  props: {
    problem: Object
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
