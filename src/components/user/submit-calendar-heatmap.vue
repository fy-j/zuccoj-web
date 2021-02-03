<template>
  <div>
    <calendarHeatmap :end-date="$moment().format('YYYY-MM-DD')" :values="chartData" :tooltip-unit="unit"></calendarHeatmap>
  </div>
</template>

<script>
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.css'
import { CalendarHeatmap } from 'vue-calendar-heatmap/dist/vue-calendar-heatmap.common'
export default {
  name: "submit-calendar-heatmap",
  components: {
    'calendarHeatmap': CalendarHeatmap
  },
  props: {
    chartData: Array
  },
  data() {
    return {
      unit: 'submissions'
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>
</style>
