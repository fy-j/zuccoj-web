<template>
  <div>
    <judgehost-status style="margin-bottom: 20px"></judgehost-status>
    <recent-data-chart></recent-data-chart>
  </div>
</template>

<script>
import RecentDataChart from '@/components/system/recent-data-chart'
import JudgehostStatus from '@/components/system/judgehost-status'
export default {
  name: "System",
  components: {
    'recent-data-chart': RecentDataChart,
    'judgehost-status': JudgehostStatus
  }
}
</script>

<style scoped>

</style>
