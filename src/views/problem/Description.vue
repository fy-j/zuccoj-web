<template>
  <base-box-frame>
    <template v-slot:content>
      <problem-display :problem="problem" v-if="problem && !loading"></problem-display>
      <loading-box-frame v-if="loading" height="700px"></loading-box-frame>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import ProblemDisplay from '@/components/problem/problem-display'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
import {mapState} from "vuex";
export default {
  name: "Description",
  components: {
    'base-box-frame': BaseBoxFrame,
    'problem-display': ProblemDisplay,
    'loading-box-frame': LoadingBoxFrame
  },
  data() {
    return {
      loading: true,
      problem: null
    }
  },
  computed: {
    ...mapState([
        'host',
        'buildGetQuery',
        'getContestProblemIdFromLabel'
    ])
  },
  methods: {
    getData() {
      let that = this
      let problemId = that.$route.params.problemId
      let contestId = that.$route.params.contestId
      if (!problemId) {
        that.$store.commit('errorPage', 404)
        return
      }
      let numberProblemId = that.getContestProblemIdFromLabel(problemId)
      let query = {problemId: numberProblemId}
      if (contestId) {
        query['contestId'] = contestId
      }
      that.loading = true
      that.$http.get(that.host + `${contestId?'/contest':''}/problem/display` + that.buildGetQuery(query))
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              Data.samples = JSON.parse(Data.samples)
              that.problem = Data
              that.problem.problemId = problemId
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
