<template>
  <base-box-frame>
    <template v-slot:content>
      <a-table :columns="columns" :data-source="rankData" size="middle" :pagination="false" :loading="loading">
        <span slot="rank" slot-scope="rank">
          <b>{{rank}}</b>
        </span>
        <span slot="nickname" slot-scope="nickname, user">
          <a :href="'#/user/'+user.username">{{nickname}}</a>
        </span>
        <span slot="percent" slot-scope="percent">
          {{ percent.submitted ? ((percent.accepted/percent.submitted)*100).toFixed(0) : 0}}%
        </span>
      </a-table>
      <div class="table-pagination-box">
        <a-pagination v-model="page" :total="count" :defaultPageSize="pageSize" @change="pageChange"/>
      </div>
    </template>
  </base-box-frame>
</template>

<script>
import {mapState} from "vuex";
const pageSize = 20
const columns = [
  {
    title: '#',
    dataIndex: 'rank',
    key: 'rank',
    scopedSlots: { customRender: 'rank' },
    width: '60px',
    align: 'center'
  },
  {
    title: '用户',
    dataIndex: 'nickname',
    key: 'nickname',
    scopedSlots: { customRender: 'nickname' },
    width: '200px',
    align: 'center'
  },
  {
    title: '签名',
    dataIndex: 'signature',
    key: 'signature',
    scopedSlots: { customRender: 'signature' },
    align: 'center'
  },
  {
    title: '题数',
    dataIndex: 'solved',
    key: 'solved',
    width: '70px',
    align: 'center'
  },
  {
    title: '通过',
    dataIndex: 'accepted',
    key: 'accepted',
    width: '70px',
    align: 'center'
  },
  {
    title: '尝试',
    dataIndex: 'submitted',
    key: 'submitted',
    width: '70px',
    align: 'center'
  },
  {
    title: '通过率',
    scopedSlots: { customRender: 'percent' },
    width: '60px',
    align: 'center'
  },
];

import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "Rank",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  data() {
    return {
      pageSize,
      columns,
      rankData: [],
      count: 0,
      loading: false,
      page: 1
    }
  },
  computed: {
    ...mapState(['host', 'buildGetQuery'])
  },
  methods: {
    getData() {
      let that = this
      let page = this.$route.query.page
      if (!page) {
        page = 1;
      }
      that.page = page
      that.loading = true
      that.$http.get(that.host + '/user/rank' + that.buildGetQuery({page: page,  pageSize: pageSize}))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.rankData = Data.users
              that.count = Data.count
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
      this.$router.push({
        name: 'rank',
        query: {
          page: page
        }
      })
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'rank')
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
