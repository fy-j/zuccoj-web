<template>
      <a-table :columns="selfTable?myColumns:columns" :data-source="statusData" size="small" :pagination="false">
        <span slot="solutionId" slot-scope="solutionId">
          <b>{{solutionId}}</b>
        </span>

        <span slot="nickname" slot-scope="nickname, record">
          <a :href="'#/user/'+record.username">{{nickname}}</a>
        </span>

        <span slot="problemId" slot-scope="problemId">
          <a :href="'#/problem/'+problemId">{{problemId}}</a>
        </span>

        <span slot="judgeResultResult" slot-scope="record">
          <status-solution-result :code="record.judgeResult.result"></status-solution-result>
        </span>

        <span slot="judgeResultLang" slot-scope="record">
          {{record.judgeResult.language}}
        </span>

        <span slot="judgeResultTime" slot-scope="record">
          {{record.judgeResult.time}}
        </span>

        <span slot="judgeResultMemory" slot-scope="record">
          {{record.judgeResult.memory}}
        </span>

        <span slot="judgeResultLength" slot-scope="record">
          {{record.judgeResult.length}}
        </span>

        <span slot="submitTime" slot-scope="submitTime">
          {{ $store.state.dateFormat(submitTime, true) }}
        </span>

      </a-table>
</template>

<script>
const columns = [
  {
    title: '#',
    dataIndex: 'solutionId',
    key: 'solutionId',
    scopedSlots: { customRender: 'solutionId' },
    align: 'center'
  },
  {
    title: '用户',
    dataIndex: 'nickname',
    key: 'nickname',
    scopedSlots: { customRender: 'nickname' },
    align: 'center'
  },
  {
    title: '题目',
    dataIndex: 'problemId',
    key: 'problemId',
    scopedSlots: { customRender: 'problemId' },
    align: 'center'
  },
  {
    title: '结果',
    key: 'judgeResultResult',
    scopedSlots: { customRender: 'judgeResultResult' },
    align: 'center'
  },
  {
    title: '语言',
    key: 'judgeResultLang',
    scopedSlots: { customRender: 'judgeResultLang' },
    align: 'center'
  },
  {
    title: '耗时/ms',
    key: 'judgeResultTime',
    scopedSlots: { customRender: 'judgeResultTime' },
    align: 'center'
  },
  {
    title: '内存/KB',
    key: 'judgeResultMemory',
    scopedSlots: { customRender: 'judgeResultMemory' },
    align: 'center'
  },
  {
    title: '长度',
    key: 'judgeResultLength',
    scopedSlots: { customRender: 'judgeResultLength' },
    align: 'center'
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    scopedSlots: { customRender: 'submitTime' },
    width: '150px',
    align: 'center'
  },
];
const myColumns = [
  {
    title: '题目',
    dataIndex: 'problemId',
    key: 'problemId',
    scopedSlots: { customRender: 'problemId' },
    align: 'center'
  },
  {
    title: '结果',
    key: 'judgeResultResult',
    scopedSlots: { customRender: 'judgeResultResult' },
    align: 'center'
  },
  {
    title: '语言',
    key: 'judgeResultLang',
    scopedSlots: { customRender: 'judgeResultLang' },
    align: 'center'
  },
  {
    title: '耗时/ms',
    key: 'judgeResultTime',
    scopedSlots: { customRender: 'judgeResultTime' },
    align: 'center'
  },
  {
    title: '内存/KB',
    key: 'judgeResultMemory',
    scopedSlots: { customRender: 'judgeResultMemory' },
    align: 'center'
  },
  {
    title: '长度',
    key: 'judgeResultLength',
    scopedSlots: { customRender: 'judgeResultLength' },
    align: 'center'
  },
  {
    title: '提交时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
    scopedSlots: { customRender: 'submitTime' },
    width: '150px',
    align: 'center'
  },
];
import StatusSolutionResult from '@/components/status/status-solution-result'
export default {
  name: "status-table",
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
  }
}
</script>

<style scoped>

</style>
