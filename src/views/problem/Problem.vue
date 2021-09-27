<template>
  <div>
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="18">
        <router-view/>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <a-spin :spinning="loading">
          <problem-right-box :problem-info="problemInfo"></problem-right-box>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Problem from '@/components/problem/problem-right-box'

export default {
  name: "Problem",
  components: {
    'problem-right-box': Problem
  },
  data() {
    return {
      loading: true,
      problemInfo: {}
    }
  },
  methods: {
    getData() {
      let that = this
      let problemId = that.$route.params.problemId
      if (!problemId) {
        that.$store.commit('errorPage', 404)
        return
      }
      that.loading = true
      that.$http.get(that.$store.state.host + '/problem/info?problemId=' + problemId)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              Data.tags = JSON.parse(Data.tags)
              that.problemInfo = Data
            } else {
              // that.$message.error(data.data.msg)
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
