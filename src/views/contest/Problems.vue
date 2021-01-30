<template>
  <div>
    <problem-list :problem-list="problemList" is-contest :loading="loading"></problem-list>
    <contest-notice></contest-notice>
  </div>
</template>

<script>
import {mapState} from "vuex";

// const problemList = [
//   {
//     problemId: 'A',
//     title: 'A+B Problem',
//     solved: 1576,
//     submitted: 2202,
//     status: 1
//   },
//   {
//     problemId: 'B',
//     title: '鸡兔同笼',
//     solved: 795,
//     submitted: 1991,
//     status: 0
//   },
//   {
//     problemId: 'C',
//     title: '斐波那契数列',
//     solved: 86,
//     submitted: 1192,
//     status: -1
//   },
//   {
//     problemId: 'D',
//     title: '打印螺旋矩阵',
//     solved: 279,
//     submitted: 773,
//     status: 1
//   },
//   {
//     problemId: 'E',
//     title: '打印螺旋矩阵',
//     solved: 279,
//     submitted: 773,
//     status: -1
//   },
//   {
//     problemId: 'F',
//     title: '打印螺旋矩阵',
//     solved: 279,
//     submitted: 773,
//     status: 0
//   },
//   {
//     problemId: 'G',
//     title: '打印螺旋矩阵',
//     solved: 279,
//     submitted: 773,
//     status: 0
//   },
//   {
//     problemId: 'H',
//     title: '打印螺旋矩阵',
//     solved: 279,
//     submitted: 773,
//     status: 0
//   }
// ];
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
