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
        <code-editor style="min-height: 500px"></code-editor>
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
      submitting: false
    }
  },
  methods: {
    submitCode() {
      let that = this
      that.submitting = true
      setTimeout(()=>{
        that.submitting = false
        that.$message.success('代码提交成功')
      },1000)
    }
  }
}
</script>

<style scoped>

</style>
