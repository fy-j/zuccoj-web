<template>
  <base-box-frame style="margin-top: 20px">
    <template v-slot:content>
      <a-alert
          message="A题目数据更新"
          description="所有A题的提交都已经Rejudge完毕"
          type="info"
          show-icon
      />
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "contest-notice",
  components: {
    'base-box-frame': BaseBoxFrame
  }
}
</script>

<style scoped>

</style>
