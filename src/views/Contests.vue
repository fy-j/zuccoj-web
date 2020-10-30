<template>
  <base-box-frame>
    <template v-slot:content>
      <a-table :columns="columns" :data-source="data" size="middle" :pagination="false">
        <span slot="contestId" slot-scope="contestId">
          <b>{{contestId}}</b>
        </span>
        <span slot="contestName" slot-scope="contestName, contest">
          <a :href="'#/contest/'+contest.contestId+'/problems'">{{contestName}}</a>
        </span>
        <span slot="contestTime" slot-scope="contest">
          <span v-if="contest.beginTime">
            {{contest.beginTime}} ~ {{contest.endTime}}
          </span>
          <span v-else>
            一直开放
          </span>
        </span>
        <span slot="permission" slot-scope="permission">
          <a-icon v-if="permission === 1"  type="check" style="color: green"/>
          <a-icon v-else type="close" style="color: red"/>
        </span>
        <span slot="memberNum" slot-scope="memberNum, contest">
          <a :href="'#/contest/'+contest.contestId+'/standings'"><a-icon type="user"/> {{memberNum}}</a>
        </span>
      </a-table>
      <div class="table-pagination-box">
        <a-pagination :default-current="6" :total="500" />
      </div>
    </template>
  </base-box-frame>
</template>

<script>
const columns = [
  {
    title: '#',
    dataIndex: 'contestId',
    key: 'contestId',
    scopedSlots: { customRender: 'contestId' },
    width: '60px',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'contestName',
    key: 'contestName',
    scopedSlots: { customRender: 'contestName' },
    align: 'center'
  },
  {
    title: '时间',
    scopedSlots: { customRender: 'contestTime' },
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' },
    width: '70px',
    align: 'center'
  },
  {
    title: '权限',
    dataIndex: 'permission',
    key: 'permission',
    scopedSlots: { customRender: 'permission' },
    width: '50px',
    align: 'center'
  },
  {
    title: '人数',
    dataIndex: 'memberNum',
    key: 'memberNum',
    scopedSlots: { customRender: 'memberNum' },
    width: '100px',
    align: 'center'
  },
];
const data = [
  {
    contestId: 1010,
    contestName: '2020ZUCC天梯赛训练赛10',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 0,
    memberNum: 60,
  },
  {
    contestId: 1009,
    contestName: '2020ZUCC天梯赛训练赛9',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 0,
    memberNum: 5,
  },
  {
    contestId: 1008,
    contestName: '2020ZUCC天梯赛训练赛8',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 0,
    memberNum: 0,
  },
  {
    contestId: 1007,
    contestName: '2020ZUCC天梯赛训练赛7',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 60,
  },
  {
    contestId: 1006,
    contestName: '2020ZUCC天梯赛训练赛6',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 54,
  },
  {
    contestId: 1005,
    contestName: '2020ZUCC天梯赛训练赛5',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 60,
  },
  {
    contestId: 1004,
    contestName: '2020ZUCC天梯赛训练赛4',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 3535,
  },
  {
    contestId: 1003,
    contestName: '2020ZUCC天梯赛训练赛3',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 60,
  },
  {
    contestId: 1002,
    contestName: '2020ZUCC天梯赛训练赛2',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 650,
  },
  {
    contestId: 1001,
    contestName: '2020ZUCC天梯赛训练赛1',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 0,
    memberNum: 60,
  },
];
import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "Contest",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  data() {
    return {
      columns,
      data
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'contests')
  }
}
</script>

<style scoped>

</style>
