<template>
  <base-box-frame>
    <template v-slot:content>
      <a-table :columns="columns" :data-source="data" size="middle" :pagination="false">
        <span slot="userRank" slot-scope="userRank">
          <b>{{userRank}}</b>
        </span>
        <span slot="nickname" slot-scope="nickname, user">
          <a :href="'#/user/'+user.username">{{nickname}}</a>
        </span>
        <span slot="percent" slot-scope="percent">
          {{((percent.solved/percent.submitted)*100).toFixed(0)}}%
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
    dataIndex: 'userRank',
    key: 'userRank',
    scopedSlots: { customRender: 'userRank' },
    width: '60px',
    align: 'center'
  },
  {
    title: '用户',
    dataIndex: 'nickname',
    key: 'nickname',
    scopedSlots: { customRender: 'nickname' },
    width: '200px',
    align: 'center'
  },
  {
    title: '签名',
    dataIndex: 'signature',
    key: 'signature',
    scopedSlots: { customRender: 'signature' },
    align: 'center'
  },
  {
    title: '通过',
    dataIndex: 'solved',
    key: 'solved',
    width: '70px',
    align: 'center'
  },
  {
    title: '尝试',
    dataIndex: 'submitted',
    key: 'submitted',
    width: '70px',
    align: 'center'
  },
  {
    title: '通过率',
    scopedSlots: { customRender: 'percent' },
    width: '60px',
    align: 'center'
  },
];
const data = [
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
  {
    userRank: 1,
    username: '31701013',
    nickname: '罗老嫖',
    solved: 2100,
    submitted: 2202,
    signature: '用户签名'
  },
];

import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "Rank",
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
    this.$store.commit('updateCurrentPage', 'rank')
  }
}
</script>

<style scoped>
</style>
