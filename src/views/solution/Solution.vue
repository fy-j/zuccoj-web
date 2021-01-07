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
            {{ solutionData.problemId }}
          </a-descriptions-item>
          <a-descriptions-item label="提交用户">
            {{ solutionData.username }}
          </a-descriptions-item>
          <a-descriptions-item label="提交时间" :span="2">
            {{ solutionData.submitTime }}
          </a-descriptions-item>
          <a-descriptions-item label="评测结果">
            <status-solution-result :code="solutionData.result"></status-solution-result>
          </a-descriptions-item>
          <a-descriptions-item label="代码语言">
            {{ (solutionData.lang===1)?('C'):((solutionData.lang===2)?('C++'):((solutionData.lang===3)?('Java'):('UNKNOWN')))}}
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
      <markdown-display v-if="solutionData.code" :content="`**用户代码**\n\`\`\`${nameInMd(solutionData.lang)}\n${solutionData.code}\n\`\`\``"></markdown-display>
      <markdown-display v-if="solutionData.remark" :content="`**编译信息**\n\`\`\`\n${solutionData.remark}\n\`\`\``"></markdown-display>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import StatusSolutionResult from '@/components/status/status-solution-result'
import FileSize from '@/components/number/file-size'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
import MarkdownDisplay from '@/components/markdown/markdown-display'
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
      solutionData: {}
    }
  },
  methods: {
    nameInMd(code) {
      switch (code) {
        case 1: return 'c'
        case 2: return 'cpp'
        case 3: return 'java'
        default: return ''
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

</style>
