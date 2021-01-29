<template>
  <base-box-frame>
    <template v-slot:content>
      <a-table :columns="columns" :data-source="allData" size="middle" :pagination="false" :loading="loading">
        <span slot="contestId" slot-scope="contestId">
          <b>{{contestId}}</b>
        </span>
        <span slot="contestName" slot-scope="contestName, contest">
          <router-link :to="{name: 'contest_problems', params: {contestId: contest.contestId}}">{{contestName}}</router-link>
        </span>
        <span slot="contestTime" slot-scope="contest">
          <span v-if="contest.beginTime">
            {{$moment(contest.beginTime).format("YYYY-MM-DD HH:mm") }} ~ {{$moment(contest.endTime).format("YYYY-MM-DD HH:mm")}}
          </span>
          <span v-else>
            一直开放
          </span>
        </span>
        <span slot="run" slot-scope="contest">
          <span v-if="$moment(contest.beginTime) > $moment()">未开始</span>
          <span v-else-if="$moment(contest.endTime) < $moment()">已结束</span>
          <span v-else><b style="color: red">进行中</b></span>
        </span>
        <span slot="contestType" slot-scope="contestType">
          {{ContentTypeText[contestType]}}
        </span>
        <span slot="public" slot-scope="isPublic">
          {{isPublic?'公开':'私有'}}
        </span>
        <span slot="status" slot-scope="status">
          <a-icon v-if="status === 1"  type="check" style="color: green"/>
          <a-icon v-else type="close" style="color: red"/>
        </span>
        <span slot="memberCount" slot-scope="memberCount, contest">
          <a-button type="link" size="small" @click="getContestMember(contest.contestId)"><a-icon type="user"/> {{memberCount}}</a-button>
        </span>
      </a-table>
      <div class="table-pagination-box">
        <a-pagination :current="currentPage" :total="pageCount" :pageSize="pageSize" @change="pageChange"/>
      </div>
      <a-modal
          v-model="memberVisible"
          title="参赛者"
          centered
          ok-text="确认"
          cancel-text="取消"
          @ok="memberVisible = false"
      >
        <a-table :columns="memberColumns" :data-source="memberData" size="small" :pagination="true" :loading="memberLoading">
        </a-table>
      </a-modal>
    </template>
  </base-box-frame>
</template>

<script>
import {mapState} from "vuex";

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
    title: '状态',
    scopedSlots: { customRender: 'run' },
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
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' },
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
const memberColumns = [
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
    scopedSlots: { customRender: 'username' },
    align: 'center'
  },
  {
    title: 'nickname',
    dataIndex: 'nickname',
    key: 'nickname',
    scopedSlots: { customRender: 'nickname' },
    align: 'center'
  },
];
import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "Contest",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  data() {
    return {
      pageSize,
      columns,
      memberColumns,
      allData: [],
      pageCount: 0,
      currentPage: 1,
      loading: false,
      memberVisible: false,
      memberData: [],
      memberLoading: false
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
    },
    getContestMember(contestId) {
      let that = this
      that.memberLoading = true
      that.$http.get(that.host + '/contest/member' + that.buildGetQuery({contestId: contestId}))
          .then(data => {
            if (data.data.code === 200) {
              that.memberData = data.data.data
              that.memberVisible = true
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.memberLoading = false
          })
    }
  },
  created() {
    this.getData()
    this.$store.commit('updateCurrentPage', 'contests')
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
