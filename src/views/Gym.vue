<template>
  <base-box-frame>
    <template v-slot:content>
      <a-table :columns="columns" :data-source="data" size="middle" :pagination="false">
        <span slot="gymId" slot-scope="gymId">
          <b>{{gymId}}</b>
        </span>
        <span slot="gymName" slot-scope="gymName, gym">
          <a :href="'#/gym/'+gym.gymId+'/problems'">{{gymName}}</a>
        </span>
        <span slot="gymTime" slot-scope="gym">
          <span v-if="gym.beginTime">
            {{gym.beginTime}} ~ {{gym.endTime}}
          </span>
          <span v-else>
            一直开放
          </span>
        </span>
        <span slot="permission" slot-scope="permission">
          <a-icon v-if="permission === 1"  type="check" style="color: green"/>
          <a-icon v-else type="close" style="color: red"/>
        </span>
        <span slot="memberNum" slot-scope="memberNum, gym">
          <a :href="'#/gym/'+gym.gymId+'/standing'"><a-icon type="user"/> {{memberNum}}</a>
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
    dataIndex: 'gymId',
    key: 'gymId',
    scopedSlots: { customRender: 'gymId' },
    width: '60px',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'gymName',
    key: 'gymName',
    scopedSlots: { customRender: 'gymName' },
    align: 'center'
  },
  {
    title: '时间',
    scopedSlots: { customRender: 'gymTime' },
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
    gymId: 1010,
    gymName: '2020测试测试测试题集10',
    status: '进行中',
    permission: 0,
    memberNum: 60,
  },
  {
    gymId: 1009,
    gymName: '2020测试测试测试题集9',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 0,
    memberNum: 5,
  },
  {
    gymId: 1008,
    gymName: '2020测试测试测试题集8',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 0,
    memberNum: 0,
  },
  {
    gymId: 1007,
    gymName: '2020测试测试测试题集7',
    status: '进行中',
    permission: 1,
    memberNum: 60,
  },
  {
    gymId: 1006,
    gymName: '2020测试测试测试题集6',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 54,
  },
  {
    gymId: 1005,
    gymName: '2020测试测试测试题集5',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 60,
  },
  {
    gymId: 1004,
    gymName: '2020测试测试测试题集4',
    status: '进行中',
    permission: 1,
    memberNum: 3535,
  },
  {
    gymId: 1003,
    gymName: '2020测试测试测试题集3',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 1,
    memberNum: 60,
  },
  {
    gymId: 1002,
    gymName: '2020测试测试测试题集2',
    status: '进行中',
    permission: 1,
    memberNum: 650,
  },
  {
    gymId: 1001,
    gymName: '2020测试测试测试题集1',
    beginTime: '2020-07-01 16:00',
    endTime: '2020-08-12 17:00',
    status: '进行中',
    permission: 0,
    memberNum: 60,
  },
];
import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "Gym",
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
    this.$store.commit('updateCurrentPage', 'gym')
  }
}
</script>

<style scoped>

</style>
