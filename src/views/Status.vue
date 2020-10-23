<template>
  <div>
    <base-box-frame>
      <template v-slot:content>
        <status-solution-search class="table-pagination-box"></status-solution-search>
        <status-table :status-data="statusData"></status-table>
        <div class="table-pagination-box">
          <a-button-group>
            <a-button><a-icon type="double-left" />首页</a-button>
            <a-button><a-icon type="left" />上一页</a-button>
            <a-button><a-icon type="right" />下一页</a-button>
          </a-button-group>
        </div>
      </template>
    </base-box-frame>
  </div>
</template>

<script>
const statusData = [
  {
    solutionId: 124459,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: -1,
      language: 'C++',
      time: '-',
      memory: '-',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124458,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 0,
      language: 'C',
      time: '1233',
      memory: '43535',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124457,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 1,
      language: 'Java',
      time: '324',
      memory: '223425',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124456,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 2,
      language: 'C++',
      time: '22',
      memory: '44444',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124455,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 3,
      language: 'Java',
      time: '11',
      memory: '3333',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124454,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 4,
      language: 'Java',
      time: '222',
      memory: '5555',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124453,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 5,
      language: 'C++',
      time: '22',
      memory: '3333',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124452,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 6,
      language: 'C++',
      time: '11',
      memory: '4444',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124451,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 7,
      language: 'C',
      time: '0',
      memory: '2222',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124450,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 8,
      language: 'C++',
      time: '1',
      memory: '0',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124449,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 9,
      language: 'Java',
      time: '3',
      memory: '333',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124448,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 1,
      language: 'C++',
      time: '1',
      memory: '444',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124447,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 2,
      language: 'C++',
      time: '7',
      memory: '88',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124446,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 3,
      language: 'C',
      time: '12',
      memory: '1000',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124445,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 4,
      language: 'C++',
      time: '2',
      memory: '8888',
      length: '1145'
    },
    submitTime: new Date()
  },
  {
    solutionId: 124444,
    username: '31701013',
    nickname: '罗老嫖',
    problemId: 1000,
    judgeResult: {
      result: 5,
      language: 'C',
      time: '1',
      memory: '888',
      length: '1145'
    },
    submitTime: new Date()
  },
]
import StatusTable from '@/components/status/status-table'
import BaseBoxFrame from '@/components/frame/base-box-frame'
import StatusSolutionSearch from '@/components/status/status-solution-search'
export default {
  name: "Status",
  components: {
    'status-table': StatusTable,
    'base-box-frame': BaseBoxFrame,
    'status-solution-search': StatusSolutionSearch
  },
  data() {
    return {
      statusData
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', '')
  }
}
</script>

<style scoped>

</style>
