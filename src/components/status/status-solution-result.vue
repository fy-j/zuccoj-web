<template>
  <span v-if="code === -1" class="solution-style-pd">
    <a-icon type="loading" /> <b>Pending</b>
  </span>
  <span v-else-if="code === 0">
    <a><b class="solution-style-ue" title="结果未知">Unknown</b></a>
  </span>
  <span v-else-if="code === 1">
    <a><b class="solution-style-ce" title="编译错误，点击可查看编译器信息">Compile Error</b></a>
  </span>
  <span v-else-if="code === 2">
    <b class="solution-style-tle" title="运行时间超限，请检查算法复杂度">Time Limit Exceed</b>
  </span>
  <span v-else-if="code === 3">
    <b class="solution-style-mle" title="运行内存超限，请检查内存使用情况">Memory Limit Exceed</b>
  </span>
  <span v-else-if="code === 4">
    <b class="solution-style-ole" title="输出超限">Output Limit Exceed</b>
  </span>
  <span v-else-if="code === 5">
    <b class="solution-style-re" title="运行时错误，请检查是否有数组越界或非法调用">Runtime Error</b>
  </span>
  <span v-else-if="code === 6">
    <b class="solution-style-wa" title="答案错误">Wrong Answer</b>
  </span>
  <span v-else-if="code === 7">
    <b class="solution-style-ac" title="恭喜，代码通过了所有测试点">Accepted</b>
  </span>
  <span v-else-if="code === 8">
    <b class="solution-style-pe" title="格式错误，请检查输出格式">Presentation Error</b>
  </span>
  <span v-else-if="code === 9">
    <b class="solution-style-se" title="系统错误，请联系管理员">System Error</b>
  </span>
  <span v-else>
    <b class="solution-style-ue" title="未知错误，请联系管理员">Unknown Error</b>
  </span>
</template>

<script>
export default {
  name: "status-solution-result",
  props: {
    code: Number
  }
}
</script>

<style scoped>
  .solution-style-pd {
    color: #616161;
  }
  .solution-style-ce {
    color: #D49844;
  }
  .solution-style-tle {
    color: #F2711C;
  }
  .solution-style-mle {
    color: #bb1eb3;
  }
  .solution-style-ole {
    color: crimson;
  }
  .solution-style-re {
    color: darkred;
  }
  .solution-style-wa {
    color: red;
  }
  .solution-style-ac {
    color: #21BA45!important;
  }
  .solution-style-pe {
    color: hotpink;
  }
  .solution-style-se {
    color: black;
  }
  .solution-style-ue {
    color: #616161;
  }
</style>
