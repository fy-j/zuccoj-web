<template>
  <title-box-frame title="评测机器状态/Judgehost">
    <template v-slot:content>
      <loading-box-frame v-if="loading"></loading-box-frame>
      <a-card-grid v-else v-for="(judgehost, index) in judgehostData" style="width:25%;text-align: center" :key="'judgehost'+index">
        <b class="judgehost-name">{{ judgehost.judgehostName }}</b> / Judgehost-{{ $store.state.fixZero(index+1) }} <br>
        {{ judgehost.heartbeatTime }} <br> <br>
        <a-badge
            :color="statusCalc(judgehost.status).color"
            :status="statusCalc(judgehost.status).status"
            :text="statusCalc(judgehost.status).text">
        </a-badge>
      </a-card-grid>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
export default {
  name: "judgehost-status",
  components: {
    'title-box-frame': TitleBoxFrame,
    'loading-box-frame': LoadingBoxFrame
  },
  data() {
    return {
      loading: false,
      judgehostData: []
    }
  },
  methods: {
    statusCalc(s) {
      switch (s) {
        case -1:
          return {
            color: '',
            status: 'error',
            text: '离线'
          }
        case 0:
          return {
            color: '',
            status: 'default',
            text: '未知'
          }
        case 1:
          return {
            color: 'green',
            status: 'processing',
            text: '在线'
          }
        case 2:
          return {
            color: '',
            status: 'warning',
            text: '正忙'
          }
      }
    },
    getData() {
      let that = this
      that.loading = true
      that.$http.get(that.$store.state.host + '/judgehost/status')
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.judgehostData = Data
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
  .judgehost-name{
    font-size: 16px;
  }
</style>
