<template>
  <title-box-frame title="最近提交数据/ data">
    <template v-slot:content>
      <div style="width: 98%">
        <loading-box-frame v-if="loading"></loading-box-frame>
        <ve-line v-else :data="chartData" :settings="chartSettings" :legend-visible="false" :extend="extend" :colors="['#73b3f3','#66d02c']"></ve-line>
      </div>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
import {mapState} from "vuex";
export default {
  name: "recent-data-chart",
  components: {
    'title-box-frame': TitleBoxFrame,
    'loading-box-frame': LoadingBoxFrame
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
        rows: []
      },
      loading: false,
    }
  },
  computed: {
    ...mapState(['host'])
  },
  methods: {
    getData() {
      let that = this
      that.loading = true
      that.chartData.rows = []
      that.$http.get(that.host + '/solution/weekStat')
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              for (let item of Data) {
                that.chartData.rows.push({
                  Date: item.date,
                  Submit: item.submitted,
                  Accept: item.solved
                })
              }
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.loading = false
          })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>

</style>
