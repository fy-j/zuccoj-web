<template>
  <base-box-frame>
    <template v-slot:content>
      <problem-display :problem="problem"></problem-display>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import ProblemDisplay from '@/components/problem/problem-display'
export default {
  name: "Description",
  components: {
    'base-box-frame': BaseBoxFrame,
    'problem-display': ProblemDisplay
  },
  data() {
    return {
      problem: {
        problemId: '1000',
        problemName: 'A+B Problem',
        timeLimit: 1000,
        memoryLimit: 64,
        description: '计算 $A+B$ 的值',
        input: '第一行两个整数 $A,B(1\\leq A,B \\leq 2 \\times 10^9)$',
        output: '仅一个整数，表示 $A+B$ 的结果',
        sample: [{
          input: '1 2',
          output: '3'
        },{
          input: '10 1',
          output: '11'
        },{
          input: '10000 10000',
          output: '20000'
        }],
        hint: '结果可能超过 `int` 的范围'
      }
    }
  }
}
</script>

<style scoped>

</style>
