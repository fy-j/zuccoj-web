<template>
  <div class="feedback">
    <a-table :columns="columns" :data-source="allData" size="middle" :pagination="false" :loading="loading" :rowClassName="getRowClassName">
      <span slot="username" slot-scope="record">
        {{record.username}}
      </span>
      <span slot="action" slot-scope="record">
        <a-button size="small" @click="updateRead(record)"> {{record.unread? '已读' : '标为未读'}}</a-button>
      </span>
    </a-table>
    <div class="table-pagination-box">
      <a-pagination v-model="page" :total="count" :defaultPageSize="pageSize" @change="pageChange"/>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

const columns = [
  {
    title: '#',
    dataIndex: 'feedbackId',
    key: 'feedbackId',
    width: '40px',
    align: 'center'
  },
  {
    title: '提交用户',
    key: 'username',
    align: 'center',
    scopedSlots: { customRender: 'username' },
    width: '200px',
  },
  {
    title: '反馈内容',
    dataIndex: 'content',
    key: 'content',
    align: 'left',
    ellipsis: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    width: '200px',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    scopedSlots: { customRender: 'action' },
    width: '100px',
  },
];
const pageSize = 20
export default {
  name: "Feedback",
  components: {
  },
  data() {
    return {
      columns,
      pageSize,
      allData: [],
      loading: false,
      page: 1,
      count: 0,
    }
  },
  computed: {
    ...mapState(['host', 'buildGetQuery'])
  },
  methods: {
    getData() {
      let that = this
      let page = that.$route.query.page ? that.$route.query.page : 1
      let query = {
        page: page,
        pageSize: that.pageSize
      }
      that.loading = true
      that.$http.get(that.host + `/feedback/get` + this.buildGetQuery(query))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.allData = Data.data
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
        name: 'admin_feedback',
        query: {
          page: page
        }
      })
    },
    getRowClassName(record) {
      if (record.unread) {
        return 'unread-feedback'
      }
      return ''
    },
    updateRead(record) {
      let that = this
      let feedbackId = record.feedbackId
      let unread = !record.unread
      let sendData = new FormData()
      sendData.append('feedbackId', feedbackId)
      sendData.append('unread', unread)
      that.$http.post(that.host + `/feedback/update`, sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.getData()
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
          })
    }
  },
  created() {
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
.feedback {
  background: white;
  padding-bottom: 5px;
}
</style>

<style>
.unread-feedback {
  font-weight: bolder;
  background-color: rgb(253,246,236);
}
</style>
