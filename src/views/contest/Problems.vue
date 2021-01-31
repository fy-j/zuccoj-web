<template>
  <div>
    <problem-list :problem-list="problemList" is-contest :loading="loading"></problem-list>
    <contest-notice v-if="false"></contest-notice>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ProblemList from '@/components/problem/problem-list'
import ContestNotice from '@/components/contest/contest-notice'
export default {
  name: "Contest-Problems",
  components: {
    'problem-list': ProblemList,
    'contest-notice': ContestNotice
  },
  data() {
    return {
      problemList: [],
      loading: false
    }
  },
  computed: {
    ...mapState(['host', 'buildGetQuery'])
  },
  methods: {
    getProblems() {
      let that = this
      let contestId = that.$route.params.contestId
      that.problemList = []
      that.loading = true
      that.$http.get(that.host + '/contest/problems' + that.buildGetQuery({contestId: contestId}))
          .then(data => {
            if (data.data.code === 200) {
              that.problemList = data.data.data
            } else {
              that.$message.error(data.data.msg)
              // that.$store.commit('errorPage', data.data.code)
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
  watch: {
    '$route': function () {
      this.getProblems()
    }
  },
  created() {
    this.getProblems()
  }
}
</script>

<style scoped>

</style>
