<template>
  <div>
    <ve-line
        :data="chartDataIn"
        :settings="chartSettings"
        :legend-visible="false"
        :extend="extend"
        judge-width
        height="300px"
        :colors="['#73b3f3','#66d02c']"
    ></ve-line>
  </div>
</template>

<script>
export default {
  name: "submit-ac-line-chart",
  props: {
    chartData: Array
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
      chartDataIn: {
        columns: ['Date', 'Submit', 'Accept'],
        rows: this.chartData
      }
    }
  }
}
</script>

<style scoped>

</style>
