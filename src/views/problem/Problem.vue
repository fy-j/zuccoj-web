<template>
  <div>
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="18">
        <router-view />
      </a-col>
      <a-col class="gutter-row" :span="6">
        <problem-right-box :problem-info="problemInfo"></problem-right-box>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Problem from '@/components/problem/problem-right-box'
export default {
  name: "Problem",
  components: {
    'problem-right-box': Problem
  },
  data () {
    return {
      problemInfo: {
        problemId: '1000',
        timeLimit: 1000,
        memoryLimit: 64,
        submitted: 2202,
        solved: 1579
      }
    }
  }
}
</script>

<style scoped>

</style>
