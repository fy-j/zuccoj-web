<template>
  <base-box-frame>
    <template v-slot:content>
      <loading-box-frame v-if="loading"></loading-box-frame>
      <div v-else style="padding: 30px 25px">
        <a-descriptions :title="`提交 #${$route.params.solutionId}`" bordered>
          <a-descriptions-item label="提交编号">
            <b>#{{ $route.params.solutionId }}</b>
          </a-descriptions-item>
          <a-descriptions-item label="所属题目" :span="2">
            <router-link :to="getProblemUrl(solutionData)">{{ solutionData.problemTitle }}</router-link>
          </a-descriptions-item>
          <a-descriptions-item label="提交用户">
            <router-link :to="'/user/'+solutionData.username">{{ solutionData.username }}</router-link>
          </a-descriptions-item>
          <a-descriptions-item label="提交时间" :span="2">
            {{ solutionData.submitTime }}
          </a-descriptions-item>
          <a-descriptions-item label="评测结果">
            <status-solution-result :code="solutionData.result" :score="solutionData.score"></status-solution-result>
          </a-descriptions-item>
          <a-descriptions-item label="代码语言">
            {{
              (solutionData.lang === 1) ? ('C') : ((solutionData.lang === 2) ? ('C++') : ((solutionData.lang === 3) ? ('Java') : ('UNKNOWN')))
            }}
          </a-descriptions-item>
          <a-descriptions-item label="代码长度">
            <file-size :size="solutionData.codeLength" unit="B" :fixx="0"></file-size>
          </a-descriptions-item>
          <a-descriptions-item label="运行时间">
            {{ solutionData.timeUsed }}ms
          </a-descriptions-item>
          <a-descriptions-item label="运行内存">
            <file-size :size="solutionData.memoryUsed" unit="KB"></file-size>
          </a-descriptions-item>
          <a-descriptions-item label="评测姬">
            {{ solutionData.judgehost }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <template v-if="solutionData.code">
        <div class="fake-markdown-wrapper markdown-body">
          <h3> 用户代码
            <button :disabled="copied" class="copy-btn" @click="copyCode">
              {{ copied ? '复制成功' : '复制' }}
            </button>
          </h3>
        </div>
      </template>
      <markdown-display v-if="solutionData.code"
                        :content="`\`\`\`${nameInMd(solutionData.lang)}\n${solutionData.code}\n\`\`\``"></markdown-display>
      <template v-if="solutionData.remark">
        <div class="fake-markdown-wrapper markdown-body">
          <h3>编译信息</h3>
        </div>
        <markdown-display :content="`\`\`\`\n${solutionData.remark}\n\`\`\``"></markdown-display>
      </template>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import StatusSolutionResult from '@/components/status/status-solution-result'
import FileSize from '@/components/number/file-size'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
import MarkdownDisplay from '@/components/markdown/markdown-display'
import {mapState} from "vuex";

export default {
  name: "Solution",
  components: {
    'base-box-frame': BaseBoxFrame,
    'status-solution-result': StatusSolutionResult,
    'file-size': FileSize,
    'loading-box-frame': LoadingBoxFrame,
    'markdown-display': MarkdownDisplay
  },
  data() {
    return {
      loading: false,
      solutionData: {},
      copied: false,
    }
  },
  computed: {
    ...mapState(['getContestProblemLabel'])
  },
  methods: {
    copyCode() {
      console.log(this.solutionData.code)
      let temp = document.createElement("textarea");
      temp.value = this.solutionData.code;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("Copy");
      document.body.removeChild(temp);
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1000)
    },
    getProblemUrl(solution) {
      if (solution.contestId === 0) return '/problem/' + solution.problemId
      return '/contest/' + solution.contestId + '/problem/' +
          this.getContestProblemLabel(solution.problemId, 1, solution.problemId)
    },
    nameInMd(code) {
      switch (code) {
        case 1:
          return 'c'
        case 2:
          return 'cpp'
        case 3:
          return 'java'
        default:
          return ''
      }
    },
    getData() {
      let that = this
      that.loading = true
      let solutionId = that.$route.params.solutionId
      that.$http.get(that.$store.state.host + '/solution/get?solutionId=' + solutionId)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.solutionData = Data
              if (Data.result === -1) {
                that.pendingUpdate()
              }
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.loading = false
          })
    },
    updateSolutionResult(solutionId) {
      let that = this
      that.$http.get(that.$store.state.host + '/solution/result?solutionId=' + solutionId)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              if (Data.result === -1) {
                that.pendingUpdate()
              } else {
                for (let n in Data) {
                  that.solutionData[n] = Data[n]
                }
              }
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
          })
    },
    pendingUpdate() {
      let that = this
      let solutionId = that.$route.params.solutionId
      setTimeout(() => {
        that.updateSolutionResult(solutionId)
      }, 5000)
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'solution')
    this.getData()
  },
  watch: {
    '$route': function () {
      this.getData()
    }
  }
}
</script>

<style scoped>
.fake-markdown-wrapper {
  padding: 8px 25px 15px 25px;
}

.copy-btn {
  float: right;
  color: #1890ff;
  background-color: transparent;
  padding: 5px 10px;
  font-size: .7em;
  border-radius: 3px;
  border: 1px #1890ff solid;
  cursor: pointer;
}

.copy-btn:hover {
  background-color: #1890ff30;
}

.copy-btn:disabled {
  background: #1890ff;
  color: white;
}
</style>
