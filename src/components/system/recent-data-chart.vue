<template>
  <title-box-frame title="最近提交数据/ data">
    <template v-slot:content>
      <div style="width: 98%">
        <ve-line :data="chartData" :settings="chartSettings" :legend-visible="false" :extend="extend"></ve-line>
      </div>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
export default {
  name: "recent-data-chart",
  components: {
    'title-box-frame': TitleBoxFrame
  },
  data() {
    return {
      chartSettings: {
        area: true,
        xAxisType: 'time'
      },
      extend: {
        xAxis: {
          axisLabel: {
            show: false,
            // rotate: 45
          }
        },
      },
      chartData: {
        columns: ['Date', 'Submit', 'Accept'],
        rows: [
          { 'Date': '2019-10-26', 'Submit': 124, 'Accept': 80},
          { 'Date': '2020-04-26', 'Submit': 233, 'Accept': 70},
          { 'Date': '2020-06-26', 'Submit': 292, 'Accept': 123},
          { 'Date': '2020-07-26', 'Submit': 172, 'Accept': 142},
          { 'Date': '2020-09-26', 'Submit': 379, 'Accept': 192},
          { 'Date': '2020-10-26', 'Submit': 459, 'Accept': 293}
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
