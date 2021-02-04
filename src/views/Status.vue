<template>
  <div>
    <base-box-frame>
      <template v-slot:content>
        <status-solution-search class="table-pagination-box" @search="queryStatus"></status-solution-search>
        <loading-box-frame v-if="loading"></loading-box-frame>
        <status-table v-else :status-data="statusData"></status-table>
        <div class="table-pagination-box">
          <a-button-group>
            <a-button @click="gotoPage(1)"><a-icon type="double-left"/>首页</a-button>
            <a-button @click="gotoPage(2)" :disabled="!$route.query.offset"><a-icon type="left"/>上一页</a-button>
            <a-button @click="gotoPage(3)" :disabled="!statusData || statusData.length < pageSize"><a-icon type="right" />下一页</a-button>
          </a-button-group>
        </div>
      </template>
    </base-box-frame>
  </div>
</template>

<script>
import {mapState} from "vuex";

const pageSize = 20
import StatusTable from '@/components/status/status-table'
import BaseBoxFrame from '@/components/frame/base-box-frame'
import StatusSolutionSearch from '@/components/status/status-solution-search'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
export default {
  name: "Status",
  components: {
    'status-table': StatusTable,
    'base-box-frame': BaseBoxFrame,
    'status-solution-search': StatusSolutionSearch,
    'loading-box-frame': LoadingBoxFrame
  },
  data() {
    return {
      pageSize,
      statusData: [],
      loading: false
    }
  },
  computed: {
    ...mapState(['host','buildGetQuery','getContestProblemIdFromLabel'])
  },
  methods: {
    queryBuild() {
      let offset = this.$route.query.offset ? this.$route.query.offset : 0
      let size = this.pageSize
      let problemId = this.$route.query.problemId
      let username = this.$route.query.username
      let lang = this.$route.query.lang
      let result = this.$route.query.result
      let query = {}
      query['offset'] = offset
      query['size'] = size
      if (problemId) {
        query['problemId'] = problemId
      }
      if (username) {
        query['username'] = username
      }
      if (lang) {
        query['lang'] = lang
      }
      if (result) {
        query['result'] = result
      }
      query['contestId'] = 0
      if (this.$route.params.problemId) {
        query['problemId'] = this.$route.params.problemId
      }
      if (this.$route.params.contestId) {
        query['contestId'] = this.$route.params.contestId
      }
      if (query.problemId) {
        query.problemId = this.getContestProblemIdFromLabel(query.problemId)
      }
      return query
    },
    getData() {
      let that = this
      let query = that.queryBuild()
      that.loading = true
      that.$http.get(that.host + '/solution/status' + that.buildGetQuery(query))
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
      let query = JSON.parse(JSON.stringify(this.$route.query))
      query['offset'] = offset
      this.queryStatus(query)
    },
    queryStatus(query) {
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: query
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
