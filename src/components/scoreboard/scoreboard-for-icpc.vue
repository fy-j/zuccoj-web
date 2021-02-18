<template>
<!--  <a-table :columns="dynamicColumns" :data-source="scoreboard.scoreboard" size="middle" bordered :scroll="{x:((scoreboard.problemCount<=7)?false:(320+65*scoreboard.problemCount))}" :pagination="false">-->
  <a-table :columns="dynamicColumns" :data-source="scoreboard.scoreboard" size="middle" bordered :pagination="false">
    <span slot="rank" slot-scope="rank">
      <b>{{rank}}</b>
    </span>
    <router-link slot="nickname" slot-scope="record" :to="{path: `/user/${record.username}`}" class="scoreboard-username">
      {{record.nickname}}
    </router-link>
    <contest-standings-each
        v-for="problemId in scoreboard.problemCount"
        :slot="`problem_${problemId-1}`"
        slot-scope="record"
        :record="record.problems[problemId-1]"
        :key="`problem_${problemId-1}`+Math.random()">
    </contest-standings-each>
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
    scopedSlots: { customRender: 'rank' },
    width: '50px',
    align: 'center'
  },
  {
    title: '',
    key: 'nickname',
    // fixed: 'left',
    scopedSlots: { customRender: 'nickname' },
    width: '200px',
    align: 'center'
  },
  {
    title: '=',
    dataIndex: 'point',
    key: 'point',
    // fixed: 'left',
    scopedSlots: { customRender: 'point' },
    width: '50px',
    align: 'center'
  },
  {
    title: '罚时',
    dataIndex: 'penalty',
    key: 'penalty',
    // fixed: 'left',
    scopedSlots: { customRender: 'penalty' },
    width: '70px',
    align: 'center'
  },
];
// const standingsData = [
//   {
//     key: '31801338',
//     username: '31801338',
//     nickname: '庄博伟',
//     userRank: 1,
//     userScore: 10,
//     userPenalty: 1140,
//     wrongTry: {
//       E: 1,
//       G: 5,
//       H: 1,
//     },
//     rightTime: {
//       A: 4,
//       B: 7,
//       C: 38,
//       D: 239,
//       E: 93,
//       F: 67,
//       G: 154,
//       H: 175,
//       J: 203,
//       L: 20
//     },
//     firstBlood: {
//       B: true,
//       E: true,
//       G: true,
//       J: true,
//       L: true
//     }
//   },
//   {
//     key: '31701015',
//     username: '31701015',
//     nickname: '孙华阳',
//     userRank: 2,
//     userScore: 9,
//     userPenalty: 1127,
//     wrongTry: {
//       G: 1,
//       H: 2,
//       J: 4,
//       L: 2
//     },
//     rightTime: {
//       A: 3,
//       B: 8,
//       C: 30,
//       D: 17,
//       E: 152,
//       F: 110,
//       G: 238,
//       H: 208,
//       L: 105
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801333',
//     username: '31801333',
//     nickname: '苗皓琪',
//     userRank: 3,
//     userScore: 7,
//     userPenalty: 702,
//     wrongTry: {
//       C: 1,
//       F: 6,
//       H: 1,
//       L: 3
//     },
//     rightTime: {
//       A: 5,
//       B: 10,
//       C: 48,
//       D: 119,
//       G: 213,
//       H: 177,
//       L: 30
//     },
//     firstBlood: {
//       D: true
//     }
//   },
//   {
//     key: '31801313',
//     username: '31801313',
//     nickname: '安俊梦',
//     userRank: 4,
//     userScore: 6,
//     userPenalty: 604,
//     wrongTry: {
//       A: 1,
//       G: 5,
//       H: 3,
//       L: 5
//     },
//     rightTime: {
//       A: 5,
//       B: 7,
//       C: 18,
//       F: 117,
//       H: 167,
//       L: 110
//     },
//     firstBlood: {
//       C: true,
//       H: true
//     }
//   },
//   {
//     key: '31801350',
//     username: '31801350',
//     nickname: '吕博图',
//     userRank: 5,
//     userScore: 6,
//     userPenalty: 634,
//     wrongTry: {
//       A: 1,
//       B: 1,
//       C: 2,
//       D: 1,
//       F: 2,
//       L: 2
//     },
//     rightTime: {
//       A: 4,
//       B: 9,
//       C: 58,
//       F: 125,
//       H: 193,
//       L: 85
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801088',
//     username: '31801088',
//     nickname: '测试一',
//     userRank: 6,
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801089',
//     username: '31801089',
//     nickname: '测试二',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801090',
//     username: '31801090',
//     nickname: '测试三',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801091',
//     username: '31801091',
//     nickname: '测试四',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801092',
//     username: '31801092',
//     nickname: '测试五',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801093',
//     username: '31801093',
//     nickname: '测试六',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801094',
//     username: '31801094',
//     nickname: '测试六',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801095',
//     username: '31801095',
//     nickname: '测试七',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801096',
//     username: '31801096',
//     nickname: '测试八',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801097',
//     username: '31801097',
//     nickname: '测试九',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
//   {
//     key: '31801098',
//     username: '31801098',
//     nickname: '测试十',
//     userRank: '',
//     userScore: 1,
//     userPenalty: 1,
//     wrongTry: {
//     },
//     rightTime: {
//       A: 1
//     },
//     firstBlood: {
//     }
//   },
// ]

import ContestStandingsEach from '@/components/scoreboard/contest-standings-each'
export default {
  name: "scoreboard-for-icpc",
  components: {
    'contest-standings-each': ContestStandingsEach
  },
  props: {
    scoreboard: Object
  },
  data() {
    return{
      prefixColumns,
      // standingsData,
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
          title: this.getContestProblemLabel(index, true, cnt),
          key: `problem_${index}`,
          width: '65px',
          align: 'center',
          scopedSlots: { customRender: `problem_${index}` },
          customCell: function (record){
            if (record.problems[index].firstBlood) {
              return {
                style: {
                  'background-color': 'rgb(224,255,228)'
                }
              }
            }
            if (record.problems[index].rightTime === undefined && record.problems[index].pendingTryCont >0 ) {
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
</style>
