<template>
  <!--  <a-table :columns="dynamicColumns" :data-source="scoreboard.scoreboard" size="middle" bordered :scroll="{x:((scoreboard.problemCount<=7)?false:(320+65*scoreboard.problemCount))}" :pagination="false">-->
  <a-table :columns="dynamicColumns" :data-source="scoreboard.scoreboard" size="middle" bordered :pagination="false">
    <span slot="rank" slot-scope="rank">
      <b>{{ rank }}</b>
    </span>
    <router-link slot="nickname" slot-scope="record" :to="{path: `/user/${record.username}`}"
                 class="scoreboard-username">
      {{ record.nickname }}({{ record.username }})
    </router-link>
    <router-link
        v-for="problemId in scoreboard.problemCount"
        :slot="`title_${problemId-1}`"
        :key="`title_${problemId-1}`+Math.random()"
        class="scoreboard-label"
        :to="'problem/' + getContestProblemLabel(problemId - 1,true,scoreboard.problemCount)">
      {{ getContestProblemLabel(problemId - 1, true, scoreboard.problemCount) }}
    </router-link>
    <scoreboard-cell-for-icpc
        v-for="problemId in scoreboard.problemCount"
        :slot="`problem_${problemId-1}`"
        slot-scope="record"
        :record="record.problems[problemId-1]"
        :key="`problem_${problemId-1}`+Math.random()">
    </scoreboard-cell-for-icpc>
  </a-table>
</template>

<script>
import {mapState} from "vuex";

const prefixColumns = [
  {
    title: '#',
    dataIndex: 'rank',
    key: 'rank',
    // fixed: 'left',
    scopedSlots: {customRender: 'rank'},
    width: '50px',
    align: 'center'
  },
  {
    title: '',
    key: 'nickname',
    // fixed: 'left',
    scopedSlots: {customRender: 'nickname'},
    width: '200px',
    align: 'center'
  },
  {
    title: '=',
    dataIndex: 'point',
    key: 'point',
    // fixed: 'left',
    scopedSlots: {customRender: 'point'},
    width: '50px',
    align: 'center'
  },
  {
    title: '罚时',
    dataIndex: 'penalty',
    key: 'penalty',
    // fixed: 'left',
    scopedSlots: {customRender: 'penalty'},
    width: '70px',
    align: 'center'
  },
];

import ScoreboardCellForICPC from '@/components/scoreboard/scoreboard-cell-for-icpc'

export default {
  name: "scoreboard-for-icpc",
  components: {
    'scoreboard-cell-for-icpc': ScoreboardCellForICPC
  },
  props: {
    scoreboard: Object
  },
  data() {
    return {
      prefixColumns,
      dynamicColumns: []
    }
  },
  computed: {
    ...mapState(['getContestProblemLabel'])
  },
  methods: {
    dynamicColumnsInit() {
      this.dynamicColumns = JSON.parse(JSON.stringify(this.prefixColumns))
      let cnt = this.scoreboard.problemCount
      for (let index = 0; index < cnt; index++) {
        this.dynamicColumns.push({
          key: `problem_${index}`,
          width: '65px',
          align: 'center',
          slots: {title: `title_${index}`},
          scopedSlots: {customRender: `problem_${index}`},
          customCell: function (record) {
            if (record.problems[index].firstBlood) {
              return {
                style: {
                  'background-color': 'rgb(224,255,228)'
                }
              }
            }
            if (record.problems[index].rightTime === undefined && record.problems[index].pendingTryCont > 0) {
              return {
                style: {
                  'background-color': 'rgb(253,246,236)'
                }
              }
            }
          }
        })
      }
    },
    dataInit() {
      this.dynamicColumnsInit()
    },
  },
  created() {
    this.dataInit()
  }
}
</script>

<style scoped>
.scoreboard-username {
  color: black;
}

.scoreboard-username:hover {
  color: #1890ff;
}

.scoreboard-label {
  color: black;
}

.scoreboard-label:hover {
  color: #1890ff;
}
</style>
