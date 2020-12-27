<template>
  <title-box-frame title="题目数据管理">
    <template v-slot:content>
      <div>
        <a-breadcrumb style="margin-top: 15px">
          <a-breadcrumb-item><span></span></a-breadcrumb-item>
          <a-breadcrumb-item><router-link :to="{name:'home'}">首页</router-link></a-breadcrumb-item>
          <a-breadcrumb-item><router-link :to="{name:'data'}">所有题目</router-link></a-breadcrumb-item>
          <a-breadcrumb-item v-if="!isRoot"><span>{{problemId}}</span></a-breadcrumb-item>
        </a-breadcrumb>

        <div v-if="isRoot">
          <div class="add-button">
            <a-button type="primary" icon="plus" size="large" @click="$router.push({name: 'new_problem'})">新建题目</a-button>
          </div>
          <a-table :columns="columns" :data-source="problemList" size="middle" :pagination="false" :loading="loading">
            <span slot="problemId" slot-scope="problemId">
              <b>{{problemId}}</b>
            </span>
            <span slot="problemTitle" slot-scope="record">
              <router-link :to="{name:'data',query:{problemId:record.problemId}}">{{record.title}}</router-link>
            </span>
            <span slot="timeLimit" slot-scope="timeLimit">
              {{timeLimit}}ms
            </span>
            <span slot="memoryLimit" slot-scope="memoryLimit">
              <span :title="memoryLimit+'KB'">{{ (memoryLimit/1024).toFixed(0) }}MB</span>
            </span>
          </a-table>
          <div class="table-pagination-box">
            <a-pagination :current="currentPage" :total="pageCount" :pageSize="pageSize" @change="getProblemList"/>
          </div>
        </div>
        <div v-else>
          <problem-testcases-edit :problem-id="problemId"></problem-testcases-edit>
        </div>
      </div>
    </template>
  </title-box-frame>
</template>

<script>
const pageSize = 20
const columns = [
  {
    title: '#',
    dataIndex: 'problemId',
    key: 'problemId',
    scopedSlots: { customRender: 'problemId' },
    width: '100px',
    align: 'center'
  },
  {
    title: '标题',
    key: 'title',
    scopedSlots: { customRender: 'problemTitle' },
  },
  {
    title: '时间限制',
    dataIndex: 'timeLimit',
    key: 'timeLimit',
    width: '150px',
    align: 'center',
    scopedSlots: { customRender: 'timeLimit' },
  },
  {
    title: '内存限制',
    dataIndex: 'memoryLimit',
    key: 'memoryLimit',
    width: '150px',
    align: 'center',
    scopedSlots: { customRender: 'memoryLimit' },
  },
  {
    title: '测试点数量',
    dataIndex: 'testcaseCnt',
    key: 'testcaseCnt',
    width: '100px',
    align: 'center'
  }
];
import TitleBoxFrame from '../../components/frame/title-box-frame'
import ProblemTestcasesEdit from '../../components/admin/problem-testcases-edit'
export default {
  name: "Testcase",
  components: {
    'title-box-frame': TitleBoxFrame,
    'problem-testcases-edit': ProblemTestcasesEdit
  },
  data() {
    return {
      isRoot: false,
      problemId: null,
      problemList: [],
      pageCount: 0,
      currentPage: 1,
      pageSize,
      columns,
      loading: false
    }
  },
  methods: {
    getProblemList(page) {
      if (!page) {
        page = 1
      }
      let that = this
      that.isRoot = true
      that.loading = true
      let sendData = new FormData()
      sendData.append('page', page)
      sendData.append('pageSize', pageSize)
      that.$http.post(that.$store.state.host + '/problem/get', sendData)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.problemList = Data.problems
              that.pageCount = Data.count
              that.currentPage = Data.page
            } else {
              that.$message.error(data.data.msg)
              if (data.data.code === 403) {
                that.$router.replace({
                  name: 'error',
                  params: {
                    code: '403'
                  }
                })
              }
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.loading = false
          })
    },
    getTestcase() {
      let that = this
      that.isRoot = false
    },
    pageUpdate() {
      this.problemId = this.$route.query.problemId
      if (!this.problemId) {
        this.getProblemList()
      } else {
        this.getTestcase()
      }
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'data')
    this.pageUpdate()
  },
  watch: {
    '$route': function () {
      this.pageUpdate()
    }
  }
}
</script>

<style scoped>
  .add-button{
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
