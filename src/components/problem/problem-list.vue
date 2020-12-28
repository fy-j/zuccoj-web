<template>
  <base-box-frame>
    <template v-slot:content>
      <a-table :columns="columns" :data-source="problemList" size="middle" :pagination="false" :rowClassName="getRowClassName">
        <span slot="problemId" slot-scope="problemId">
          <b>{{problemId}}</b>
        </span>
        <router-link :to="{path:`/contest/${contestInfo.contestId}/problem/${record.problemId}`}" slot="problemTitle" slot-scope="problemTitle, record" v-if="contestInfo">{{problemTitle}}</router-link>
        <router-link :to="{path:`/problem/${record.problemId}/`}" slot="problemTitle" slot-scope="problemTitle, record" v-else>{{problemTitle}}</router-link>
        <template slot="statusIcon" slot-scope="statusIcon">
          <a-icon v-if="statusIcon === 1"  type="check" style="color: green"/>
          <a-icon v-else-if="statusIcon === -1" type="close" style="color: red"/>
        </template>
        <template slot="tagSet" slot-scope="tagSet">
          <a-tag v-for="tag in tagSet" :key="tag+Math.random()">{{tag}}</a-tag>
        </template>
      </a-table>
      <div class="table-pagination-box" v-if="!contestInfo">
        <a-pagination :current="page" :total="count" :pageSize="pageSize" @change="pageChange"/>
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
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   key: 'status',
  //   scopedSlots: { customRender: 'statusIcon' },
  //   width: '60px',
  //   align: 'center'
  // },
];

import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "problem-list",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  props: {
    problemList: Array,
    contestInfo: Object,
    page: Number,
    pageSize: Number,
    count: Number,
  },
  data() {
    return {
      columns,
      pagination: {
        pageSize: 20,
        total: 2000,
        showQuickJumper: true,
        size: "big"
      }
    }
  },
  methods: {
    getRowClassName(record) {
      if (record.status < 0) {
        return 'table-error-row'
      }
      if (record.status > 0) {
        return 'table-right-row'
      }
      return ''
    },
    pageChange(page) {
      this.$emit('pageChange', page)
    }
  }
}
</script>

<style scoped>
</style>
