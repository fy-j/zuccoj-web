<template>
  <base-box-frame>
    <template v-slot:content>
      <a-table :columns="columns" :data-source="data" size="middle" :pagination="false">
        <span slot="problemId" slot-scope="problemId">
          <b>{{problemId}}</b>
        </span>
        <a :href="'/#/problem/'+record.problemId" slot="problemTitle" slot-scope="problemTitle, record">{{problemTitle}}</a>
        <template slot="statusIcon" slot-scope="statusIcon">
          <a-icon v-if="statusIcon === 1"  type="check" style="color: green"/>
          <a-icon v-else-if="statusIcon === -1" type="close" style="color: red"/>
        </template>
        <template slot="tagSet" slot-scope="tagSet">
          <a-tag v-for="tag in tagSet" :key="tag+Math.random()">{{tag}}</a-tag>
        </template>
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
    dataIndex: 'problemId',
    key: 'problemId',
    scopedSlots: { customRender: 'problemId' },
    width: '50px',
    align: 'center'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    scopedSlots: { customRender: 'problemTitle' },
  },
  {
    title: '',
    dataIndex: 'tags',
    key: 'tags',
    scopedSlots: { customRender: 'tagSet' },
    align: 'right'
  },
  {
    title: '通过',
    dataIndex: 'solved',
    key: 'solved',
    width: '70px',
    align: 'center'
  },
  {
    title: '提交',
    dataIndex: 'submitted',
    key: 'submitted',
    width: '70px',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'statusIcon' },
    width: '60px',
    align: 'center'
  },
];
const data = [
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
    status: 1
  },
  {
    problemId: 1005,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1006,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1007,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1008,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1009,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1010,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1011,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1012,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1013,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1014,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1015,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
  {
    problemId: 1016,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
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
    status: 1
  },
  {
    problemId: 1019,
    title: '打印螺旋矩阵',
    solved: 279,
    submitted: 773,
    tags: ['模拟'],
    status: 1
  },
];

import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "problem-list",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  data() {
    return {
      data,
      columns,
      pagination: {
        pageSize: 20,
        total: 2000,
        showQuickJumper: true,
        size: "big"
      }
    }
  },
}
</script>

<style scoped>
  .table-pagination-box {
    margin: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
