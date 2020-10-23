<template>
  <a-row :gutter="16">
    <a-col class="gutter-row" :span="18">
      <problem-list :problem-list="problemList"></problem-list>
    </a-col>
    <a-col class="gutter-row" :span="6">
      <title-box-frame title="搜索题目">
        <template v-slot:content>
          <div>
            <a-input-search size="large" placeholder="关键字"></a-input-search>
          </div>
        </template>
      </title-box-frame>
    </a-col>
  </a-row>
</template>

<script>
const problemList = [
  {
    problemId: 1000,
    title: 'A+B Problem',
    solved: 1576,
    submitted: 2202,
    tags: ['入门'],
    status: 1
  },
  {
    problemId: 1001,
    title: '鸡兔同笼',
    solved: 795,
    submitted: 1991,
    tags: ['数学'],
    status: 0
  },
  {
    problemId: 1002,
    title: '斐波那契数列',
    solved: 86,
    submitted: 1192,
    tags: ['规律','数学'],
    status: -1
  },
  {
    problemId: 1003,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1004,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: -1
  },
  {
    problemId: 1005,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1006,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1007,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1008,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1009,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1010,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1011,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1012,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1013,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: -1
  },
  {
    problemId: 1014,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1015,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1016,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1017,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1018,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
  {
    problemId: 1019,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 0
  },
];
import ProblemList from '@/components/problem/problem-list'
import TitleBoxFrame from '@/components/frame/title-box-frame'
export default {
  name: "Problems",
  components: {
    'problem-list': ProblemList,
    'title-box-frame': TitleBoxFrame
  },
  data() {
    return {
      problemList
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'problems')
  }
}
</script>

<style scoped>
  .gutter-box{
    background: white;
  }
</style>
