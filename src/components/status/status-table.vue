<template>
  <a-table :columns="selfTable?myColumns:columns" :data-source="statusData" size="small" :pagination="false">
        <span slot="solutionId" slot-scope="solutionId">
          <router-link :to="{path:`/solution/${solutionId}/`}">{{ solutionId }}</router-link>
        </span>

    <span slot="username" slot-scope="username">
          <a :href="'#/user/'+username">{{ username }}</a>
        </span>

    <span slot="problemId" slot-scope="problemId">
          <router-link v-if="$route.params.contestId"
                       :to="{name: 'contest_problem_display', params: {contestId: $route.params.contestId, problemId: getContestProblemLabel(problemId, true, getContestInfo().problemCount)}}">{{
              getContestProblemLabel(problemId, true, getContestInfo().problemCount)
            }}</router-link>
          <router-link v-else :to="({path:`/problem/${problemId}/`})">{{ problemId }}</router-link>
        </span>

    <span slot="judgeResultResult" slot-scope="record">
          <status-solution-result :code="record.result" :score="record.score"></status-solution-result>
        </span>

    <span slot="judgeResultLang" slot-scope="record">
          {{
        (record.lang === 1) ? ('C') : ((record.lang === 2) ? ('C++') : ((record.lang === 3) ? ('Java') : ('UNKNOWN')))
      }}
        </span>

    <span slot="judgeResultTime" slot-scope="record">
          {{ record.timeUsed }}
        </span>

    <span slot="judgeResultMemory" slot-scope="record">
          {{ record.memoryUsed }}
        </span>

    <span slot="judgeResultLength" slot-scope="record">
          {{ record.codeLength }}
        </span>

    <span slot="submitTime" slot-scope="submitTime">
          {{ submitTime }}
        </span>

  </a-table>
</template>

<script>
import {mapState} from "vuex";

const columns = [
  {
    title: '#',
    dataIndex: 'solutionId',
    key: 'solutionId',
    scopedSlots: {customRender: 'solutionId'},
    align: 'center'
  },
  {
    title: '用户',
    dataIndex: 'username',
    key: 'username',
    scopedSlots: {customRender: 'username'},
    align: 'center'
  },
  {
    title: '题目',
    dataIndex: 'problemId',
    key: 'problemId',
    scopedSlots: {customRender: 'problemId'},
    align: 'center'
  },
  {
    title: '结果',
    key: 'judgeResultResult',
    scopedSlots: {customRender: 'judgeResultResult'},
    align: 'center'
  },
  {
    title: '语言',
    key: 'judgeResultLang',
    scopedSlots: {customRender: 'judgeResultLang'},
    align: 'center'
  },
  {
    title: '耗时/ms',
    key: 'judgeResultTime',
    scopedSlots: {customRender: 'judgeResultTime'},
    align: 'center'
  },
  {
    title: '内存/KB',
    key: 'judgeResultMemory',
    scopedSlots: {customRender: 'judgeResultMemory'},
    align: 'center'
  },
  {
    title: '长度',
    key: 'judgeResultLength',
    scopedSlots: {customRender: 'judgeResultLength'},
    align: 'center'
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    scopedSlots: {customRender: 'submitTime'},
    width: '160px',
    align: 'center'
  },
];
const myColumns = [
  {
    title: '题目',
    dataIndex: 'problemId',
    key: 'problemId',
    scopedSlots: {customRender: 'problemId'},
    align: 'center'
  },
  {
    title: '结果',
    key: 'judgeResultResult',
    scopedSlots: {customRender: 'judgeResultResult'},
    align: 'center'
  },
  {
    title: '语言',
    key: 'judgeResultLang',
    scopedSlots: {customRender: 'judgeResultLang'},
    align: 'center'
  },
  {
    title: '耗时/ms',
    key: 'judgeResultTime',
    scopedSlots: {customRender: 'judgeResultTime'},
    align: 'center'
  },
  {
    title: '内存/KB',
    key: 'judgeResultMemory',
    scopedSlots: {customRender: 'judgeResultMemory'},
    align: 'center'
  },
  {
    title: '长度',
    key: 'judgeResultLength',
    scopedSlots: {customRender: 'judgeResultLength'},
    align: 'center'
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    scopedSlots: {customRender: 'submitTime'},
    width: '160px',
    align: 'center'
  },
];
import StatusSolutionResult from '@/components/status/status-solution-result'

export default {
  name: "status-table",
  inject: ['getContestInfo'],
  components: {
    'status-solution-result': StatusSolutionResult
  },
  props: {
    statusData: Array,
    selfTable: Boolean
  },
  data() {
    return {
      columns,
      myColumns
    }
  },
  computed: {
    ...mapState(['getContestProblemLabel'])
  }
}
</script>

<style scoped>

</style>
