<template>
  <title-box-frame title="比赛管理">
    <template v-slot:content>
      <div class="add-button">
        <a-button type="primary" icon="plus" size="large" @click="$router.push({name: 'admin_contest_new'})">新建比赛</a-button>
      </div>
      <a-table :columns="columns" :data-source="allData" size="middle" :pagination="false" :loading="loading">
        <span slot="contestId" slot-scope="contestId">
          <b>{{contestId}}</b>
        </span>
        <span slot="contestName" slot-scope="contestName, contest">
          <a :href="'#/contest/'+contest.contestId+'/problems'">{{contestName}}</a>
        </span>
        <span slot="contestTime" slot-scope="contest">
          <span v-if="contest.beginTime">
            {{$moment(contest.beginTime).format("YYYY-MM-DD HH:mm") }} ~ {{$moment(contest.endTime).format("YYYY-MM-DD HH:mm")}}
          </span>
          <span v-else>
            一直开放
          </span>
        </span>
        <span slot="contestType" slot-scope="contestType">
          {{ContentTypeText[contestType]}}
        </span>
        <span slot="public" slot-scope="isPublic">
          {{isPublic?'公开':'私有'}}
        </span>
        <span slot="memberCount" slot-scope="memberCount, contest">
          <a :href="'#/contest/'+contest.contestId+'/standings'"><a-icon type="user"/> {{memberCount}}</a>
        </span>
      </a-table>
      <div class="table-pagination-box">
        <a-pagination :current="currentPage" :total="pageCount" :pageSize="pageSize" @change="pageChange"/>
      </div>
    </template>
  </title-box-frame>
</template>

<script>
const pageSize = 20
const columns = [
  {
    title: '#',
    dataIndex: 'contestId',
    key: 'contestId',
    scopedSlots: { customRender: 'contestId' },
    width: '60px',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'contestName',
    key: 'contestName',
    scopedSlots: { customRender: 'contestName' },
    align: 'center'
  },
  {
    title: '时间',
    scopedSlots: { customRender: 'contestTime' },
    align: 'center'
  },
  {
    title: '题目数量',
    dataIndex: 'problemCount',
    key: 'problemCount',
    align: 'center'
  },
  {
    title: '比赛模式',
    dataIndex: 'contestType',
    scopedSlots: { customRender: 'contestType' },
    key: 'contestType',
    align: 'center'
  },
  {
    title: '权限',
    dataIndex: 'public',
    key: 'public',
    scopedSlots: { customRender: 'public' },
    width: '50px',
    align: 'center'
  },
  {
    title: '人数',
    dataIndex: 'memberCount',
    key: 'memberCount',
    scopedSlots: { customRender: 'memberCount' },
    width: '100px',
    align: 'center'
  },
];
import TitleBoxFrame from '@/components/frame/title-box-frame'
import {mapState} from "vuex";
export default {
  name: "Data",
  components: {
    'title-box-frame': TitleBoxFrame
  },
  data() {
    return {
      pageSize,
      columns,
      allData: [],
      pageCount: 0,
      currentPage: 1,
      loading: false
    }
  },
  computed: {
    ...mapState(['host', 'buildGetQuery', 'ContentTypeText'])
  },
  methods: {
    getData() {
      let that = this
      let page = that.$route.query.page
      let pageSize = that.pageSize
      if (!page) {
        page = 1
      }
      that.loading = true
      that.$http.get(that.host + '/contest/list' + that.buildGetQuery({page: page, pageSize: pageSize}))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.allData = Data.data
              that.pageCount = Data.count
              that.currentPage = Data.page
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
    pageChange(page) {
      this.currentPage = page
      this.$router.push({
        name: 'admin_contest_data',
        query: {
          page: page
        }
      })
    }
  },
  created() {
    // TODO: check user permission
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
.add-button{
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
