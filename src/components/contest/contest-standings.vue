<template>
  <base-box-frame>
    <template v-slot:content>
      <a-table :columns="dynamicColumns" :data-source="standingsData" size="middle" bordered :scroll="{x:((problems.length<=7)?false:(320+65*problems.length))}" :pagination="false">
        <span slot="userRank" slot-scope="userRank">
          <b>{{userRank}}</b>
        </span>
        <contest-standings-each
            v-for="problemName in problems"
            :slot="'problem'+problemName"
            slot-scope="record"
            :problem="problemName"
            :record="record"
            :key="problemName+Math.random()">
        </contest-standings-each>
      </a-table>
    </template>
  </base-box-frame>
</template>

<script>
const columns = [
  {
    title: '#',
    dataIndex: 'userRank',
    key: 'userRank',
    fixed: 'left',
    scopedSlots: { customRender: 'userRank' },
    width: '50px',
    align: 'center'
  },
  {
    title: '',
    dataIndex: 'nickname',
    key: 'nickname',
    fixed: 'left',
    scopedSlots: { customRender: 'nickname' },
    width: '150px',
    align: 'center'
  },
  {
    title: '=',
    dataIndex: 'userScore',
    key: 'userScore',
    fixed: 'left',
    scopedSlots: { customRender: 'userScore' },
    width: '50px',
    align: 'center'
  },
  {
    title: '罚时',
    dataIndex: 'userPenalty',
    key: 'userPenalty',
    fixed: 'left',
    scopedSlots: { customRender: 'userPenalty' },
    width: '70px',
    align: 'center'
  },
];
const standingsData = [
  {
    key: '31801338',
    username: '31801338',
    nickname: '庄博伟',
    userRank: 1,
    userScore: 10,
    userPenalty: 1140,
    wrongTry: {
      E: 1,
      G: 5,
      H: 1,
    },
    rightTime: {
      A: 4,
      B: 7,
      C: 38,
      D: 239,
      E: 93,
      F: 67,
      G: 154,
      H: 175,
      J: 203,
      L: 20
    },
    firstBlood: {
      B: true,
      E: true,
      G: true,
      J: true,
      L: true
    }
  },
  {
    key: '31701015',
    username: '31701015',
    nickname: '孙华阳',
    userRank: 2,
    userScore: 9,
    userPenalty: 1127,
    wrongTry: {
      G: 1,
      H: 2,
      J: 4,
      L: 2
    },
    rightTime: {
      A: 3,
      B: 8,
      C: 30,
      D: 17,
      E: 152,
      F: 110,
      G: 238,
      H: 208,
      L: 105
    },
    firstBlood: {
    }
  },
  {
    key: '31801333',
    username: '31801333',
    nickname: '苗皓琪',
    userRank: 3,
    userScore: 7,
    userPenalty: 702,
    wrongTry: {
      C: 1,
      F: 6,
      H: 1,
      L: 3
    },
    rightTime: {
      A: 5,
      B: 10,
      C: 48,
      D: 119,
      G: 213,
      H: 177,
      L: 30
    },
    firstBlood: {
      D: true
    }
  },
  {
    key: '31801313',
    username: '31801313',
    nickname: '安俊梦',
    userRank: 4,
    userScore: 6,
    userPenalty: 604,
    wrongTry: {
      A: 1,
      G: 5,
      H: 3,
      L: 5
    },
    rightTime: {
      A: 5,
      B: 7,
      C: 18,
      F: 117,
      H: 167,
      L: 110
    },
    firstBlood: {
      C: true,
      H: true
    }
  },
  {
    key: '31801350',
    username: '31801350',
    nickname: '吕博图',
    userRank: 5,
    userScore: 6,
    userPenalty: 634,
    wrongTry: {
      A: 1,
      B: 1,
      C: 2,
      D: 1,
      F: 2,
      L: 2
    },
    rightTime: {
      A: 4,
      B: 9,
      C: 58,
      F: 125,
      H: 193,
      L: 85
    },
    firstBlood: {
    }
  },
  {
    key: '31801088',
    username: '31801088',
    nickname: '测试一',
    userRank: 6,
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801089',
    username: '31801089',
    nickname: '测试二',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801090',
    username: '31801090',
    nickname: '测试三',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801091',
    username: '31801091',
    nickname: '测试四',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801092',
    username: '31801092',
    nickname: '测试五',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801093',
    username: '31801093',
    nickname: '测试六',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801094',
    username: '31801094',
    nickname: '测试六',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801095',
    username: '31801095',
    nickname: '测试七',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801096',
    username: '31801096',
    nickname: '测试八',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801097',
    username: '31801097',
    nickname: '测试九',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
  {
    key: '31801098',
    username: '31801098',
    nickname: '测试十',
    userRank: '',
    userScore: 1,
    userPenalty: 1,
    wrongTry: {
    },
    rightTime: {
      A: 1
    },
    firstBlood: {
    }
  },
]

const problems = ['A','B','C','D','E','F','G','H','I','J','K','L']
import BaseBoxFrame from '@/components/frame/base-box-frame'
import ContestStandingsEach from '@/components/contest/contest-standings-each'
export default {
  name: "contest-standing",
  components: {
    'base-box-frame': BaseBoxFrame,
    'contest-standings-each': ContestStandingsEach
  },
  data() {
    return {
      columns,
      standingsData,
      problems,
      dynamicColumns: []
    }
  },
  methods: {
    dataInit() {
      this.dynamicColumns = JSON.parse(JSON.stringify(this.columns))
      for (let problem of this.problems) {
        this.dynamicColumns.push({
          title: problem,
          key: problem,
          width: '65px',
          align: 'center',
          scopedSlots: { customRender: 'problem'+problem },
          customCell: function (record){
            if (record.firstBlood[problem]) {
              return {
                style: {
                  'background-color': 'rgb(224,255,228)'
                }
              }
            }
          }
        })
      }
    }
  },
  mounted() {
    this.dataInit()
  }
}
</script>

<style scoped>

</style>
