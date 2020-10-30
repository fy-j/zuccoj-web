<template>
  <div>
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="18">
        <router-view />
      </a-col>
      <a-col class="gutter-row" :span="6">
        <problem-right-box></problem-right-box>
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
  }
}
</script>

<style scoped>

</style>
