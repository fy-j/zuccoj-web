<template>
  <title-box-frame title="评测机器状态/Judgehost">
    <template v-slot:content>
      <a-card-grid v-for="(judgehost, index) in judgehostData" style="width:25%;text-align: center" :key="'judgehost'+index">
        <b class="judgehost-name">{{ judgehost.name }}</b> / {{ judgehost.ip }} <br>
        {{ judgehost.last_time }} <br> <br>
        <template v-if="judgehost.status">
          <a-badge color="green" status="processing"></a-badge>状态正常
        </template>
        <template v-else>
          <a-badge color="red" status="error"></a-badge>状态异常
        </template>
      </a-card-grid>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
export default {
  name: "judgehost-status",
  components: {
    'title-box-frame': TitleBoxFrame
  },
  data() {
    return {
      judgehostData: [
        {
          name: 'Judgehost-01',
          ip: '10.66.28.6',
          last_time: this.$store.state.dateFormat(new Date(), true),
          status: 1
        },
        {
          name: 'Judgehost-02',
          ip: '10.66.28.6',
          last_time: this.$store.state.dateFormat(new Date(), true),
          status: 1
        },
        {
          name: 'Judgehost-03',
          ip: '10.66.28.6',
          last_time: this.$store.state.dateFormat(new Date(), true),
          status: 1
        },
        {
          name: 'Judgehost-04',
          ip: '10.66.28.6',
          last_time: this.$store.state.dateFormat(new Date(), true),
          status: 1
        },
        {
          name: 'Judgehost-05',
          ip: '10.66.28.6',
          last_time: this.$store.state.dateFormat(new Date(), true),
          status: 1
        },
        {
          name: 'Judgehost-06',
          ip: '10.66.28.6',
          last_time: this.$store.state.dateFormat(new Date(), true),
          status: 1
        },
        {
          name: 'Judgehost-07',
          ip: '10.66.28.6',
          last_time: this.$store.state.dateFormat(new Date(), true),
          status: 0
        },
        {
          name: 'Judgehost-08',
          ip: '10.66.28.6',
          last_time: this.$store.state.dateFormat(new Date(), true),
          status: 0
        },
      ]
    }
  }
}
</script>

<style scoped>
  .judgehost-name{
    font-size: 16px;
  }
</style>
