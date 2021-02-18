<template>
  <a-row :gutter="16">
    <a-col class="gutter-row" :span="18" loading>
      <a-spin :spinning="loading">
        <problem-list :problem-list="problemList" :count="pageCount" :page="currentPage" :pageSize="pageSize" @pageChange="gotoPage"></problem-list>
      </a-spin>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <title-box-frame title="搜索题目">
        <template v-slot:content>
          <div>
            <a-input-search size="large" placeholder="关键字"></a-input-search>
          </div>
        </template>
      </title-box-frame>
    </a-col>
  </a-row>
</template>

<script>
const pageSize = 20
import ProblemList from '@/components/problem/problem-list'
import TitleBoxFrame from '@/components/frame/title-box-frame'
export default {
  name: "Problems",
  components: {
    'problem-list': ProblemList,
    'title-box-frame': TitleBoxFrame
  },
  data() {
    return {
      pageSize,
      currentPage: 1,
      pageCount: 0,
      problemList: [],
      loading: false
    }
  },
  methods: {
    getData(page) {
      if (!page) {
        page = 1
      }
      let that = this
      that.loading = true
      let sendData = new FormData()
      sendData.append('page', page)
      sendData.append('pageSize', pageSize)
      that.$http.post(that.$store.state.host + '/problem/getProblemSet', sendData)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.problemList = Data.problems
              for (let item of that.problemList) {
                item.tags = JSON.parse(item.tags)
              }
              that.pageCount = Data.count
              that.currentPage = Data.page
            } else {
              that.$message.error(data.data.msg)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.loading = false
          })
    },
    pageUpdate() {
      this.currentPage = this.$route.query.page
      this.getData(this.currentPage)
    },
    gotoPage(page) {
      this.$router.push({
        name: 'problems',
        query: {
          page: page
        }
      })
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'problems')
    this.getData(this.$route.query.page)
  },
  watch: {
    '$route': function () {
      this.pageUpdate()
    }
  }
}
</script>

<style scoped>
  .gutter-box{
    background: white;
  }
</style>
