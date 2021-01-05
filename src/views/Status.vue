<template>
  <div>
    <base-box-frame>
      <template v-slot:content>
        <status-solution-search class="table-pagination-box"></status-solution-search>
        <status-table :status-data="statusData"></status-table>
        <div class="table-pagination-box">
          <a-button-group>
            <a-button @click="gotoPage(1)"><a-icon type="double-left"/>首页</a-button>
            <a-button @click="gotoPage(2)"><a-icon type="left" />上一页</a-button>
            <a-button @click="gotoPage(3)"><a-icon type="right" />下一页</a-button>
          </a-button-group>
        </div>
      </template>
    </base-box-frame>
  </div>
</template>

<script>
const pageSize = 20
import StatusTable from '@/components/status/status-table'
import BaseBoxFrame from '@/components/frame/base-box-frame'
import StatusSolutionSearch from '@/components/status/status-solution-search'
export default {
  name: "Status",
  components: {
    'status-table': StatusTable,
    'base-box-frame': BaseBoxFrame,
    'status-solution-search': StatusSolutionSearch
  },
  data() {
    return {
      pageSize,
      statusData: []
    }
  },
  methods: {
    getData() {
      let that = this
      let offset = that.$route.query.offset ? that.$route.query.offset : 0
      let size = that.pageSize
      that.loading = true
      that.$http.get(that.$store.state.host + '/solution/status?offset='+offset+(size?`&size=${size}`:''))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.statusData = Data
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
    },
    gotoPage(m) {
      let offset = this.$route.query.offset ? this.$route.query.offset : 0
      switch (m) {
        case 1: offset = 0; break;
        case 2: offset -= this.pageSize; break;
        case 3: offset += this.pageSize; break;
        default: break;
      }
      if (offset < 0) {
        offset = 0;
      }
      this.$router.push({
        name: 'status',
        query: {
          offset: offset
        }
      })
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'status')
    this.getData()
  },
  watch: {
    '$route': function () {
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
