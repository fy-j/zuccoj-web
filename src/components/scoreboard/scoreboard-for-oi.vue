<template>
  <!--  <a-table :columns="dynamicColumns" :data-source="scoreboard.scoreboard" size="middle" bordered :scroll="{x:((scoreboard.problemCount<=7)?false:(320+65*scoreboard.problemCount))}" :pagination="false">-->
  <a-table :columns="dynamicColumns" :data-source="scoreboard.scoreboard" size="middle" bordered :pagination="false">
    <span slot="rank" slot-scope="rank">
      <b>{{ rank }}</b>
    </span>
    <router-link slot="nickname" slot-scope="record" :to="{path: `/user/${record.username}`}"
                 class="scoreboard-username">
      {{ record.nickname }}
    </router-link>
    <router-link
        v-for="problemId in scoreboard.problemCount"
        :slot="`title_${problemId-1}`"
        :key="`title_${problemId-1}`+Math.random()"
        class="scoreboard-label"
        :to="'problem/' + getContestProblemLabel(problemId - 1,true,scoreboard.problemCount)">
      {{ getContestProblemLabel(problemId - 1, true, scoreboard.problemCount) }}
    </router-link>
    <template v-for="problemId in scoreboard.problemCount">
      <scoreboard-cell-for-oi
          :slot="`problem_${problemId-1}`"
          slot-scope="record"
          :record="record.problems[problemId-1]"
          :key="`problem_${problemId-1}`+Math.random()">
      </scoreboard-cell-for-oi>
    </template>
  </a-table>
</template>

<script>
import {mapState} from "vuex";

const prefixColumns = [
  {
    title: '#',
    dataIndex: 'rank',
    key: 'rank',
    scopedSlots: {customRender: 'rank'},
    width: '50px',
    align: 'center'
  },
  {
    title: '',
    key: 'nickname',
    scopedSlots: {customRender: 'nickname'},
    width: '200px',
    align: 'center'
  },
  {
    title: '总分',
    dataIndex: 'score',
    key: 'score',
    scopedSlots: {customRender: 'score'},
    width: '70px',
    align: 'center'
  },
];

import ScoreboardCellForOI from '@/components/scoreboard/scoreboard-cell-for-oi'

export default {
  name: "scoreboard-for-icpc",
  components: {
    'scoreboard-cell-for-oi': ScoreboardCellForOI
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
            if (record.problems[index].pending) {
              return {
                style: {
                  'background-color': 'rgb(253,246,236)'
                }
              }
            }
            if (record.problems[index].firstBlood) {
              return {
                style: {
                  'background-color': 'rgb(224,255,228)'
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
