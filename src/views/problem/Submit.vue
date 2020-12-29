<template>
  <base-box-frame>
    <template v-slot:content>
      <div style="padding: 10px">
        <h2>提交代码</h2>
        题目编号： <b>{{$route.params.problemId}}</b>
        <br><br>
        代码语言：<br>
        <a-select v-model="language" style="width: 120px">
          <a-select-option value="text/x-csrc">
            C
          </a-select-option>
          <a-select-option value="text/x-c++src">
            C++
          </a-select-option>
          <a-select-option value="text/x-java">
            Java
          </a-select-option>
        </a-select>
        <br><br>
        代码：
        <code-editor v-model="code" :lang="language" style="min-height: 500px"></code-editor>
        <br>
        <a-button type="primary" :loading="submitting" @click="submitCode" :disabled="submitting">提交</a-button>
      </div>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import CodeEditor from '@/components/problem/code-editor'
export default {
  name: "Submit",
  components: {
    'base-box-frame': BaseBoxFrame,
    'code-editor': CodeEditor
  },
  data() {
    return {
      language: 'text/x-c++src',
      submitting: false,
      code: ''
    }
  },
  methods: {
    getLangCode(s) {
      switch (s) {
        case 'text/x-csrc': return 1;
        case 'text/x-c++src': return 2;
        case 'text/x-java': return 3;
        default: return 0;
      }
    },
    submitCode() {
      let that = this
      that.submitting = true
      let sendData = new FormData()
      sendData.append('problemId', that.$route.params.problemId)
      sendData.append('lang', that.getLangCode(that.language))
      sendData.append('code', that.code)
      that.$http.post(that.$store.state.host + '/solution/submit', sendData)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              let solutionId = Data.solutionId;
              that.$message.success('提交成功')
              that.$router.push({path:`/solution/${solutionId}`})
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.submitting = false
          })
    }
  }
}
</script>

<style scoped>

</style>
