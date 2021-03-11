<template>
  <div>
    <markdown-display :content="problemContent1"/>
    <sample-display v-for="idx in problem.samples.length" :key="idx" :idx="idx"
                    :sample="problem.samples[idx-1]"/>
    <markdown-display style="margin-top: -10px" :content="problemContent2"/>
  </div>
</template>

<script>
import MarkdownDisplay from '@/components/markdown/markdown-display'
import SampleDisplay from "@/components/problem/sample-display";

export default {
  name: "problem-display",
  props: {
    problem: Object
  },
  components: {
    SampleDisplay,
    'markdown-display': MarkdownDisplay
  },
  data() {
    return {
      problemContent1: '',
      problemContent2: ''
    }
  },
  methods: {
    problemJoint() {
      this.problemContent1 = '# ' + this.problem.problemId + '. ' + this.problem.title + '\n\n'
      this.problemContent1 += '*TimeLimit: ' + this.problem.timeLimit + 'ms\n MemoryLimit: ' + (this.problem.memoryLimit / 1024).toFixed(0) + 'MB*\n\n'
      if (this.problem.description) {
        this.problemContent1 += '## Description\n\n' + this.problem.description + '\n\n'
      }
      if (this.problem.input) {
        this.problemContent1 += '## Input\n\n' + this.problem.input + '\n\n'
      }
      if (this.problem.output) {
        this.problemContent1 += '## Output\n\n' + this.problem.output + '\n\n'
      }
      this.problemContent2 = ''
      if (this.problem.hint) {
        this.problemContent2 = '## Hint\n\n' + this.problem.hint + '\n\n'
      }
    }
  },
  created() {
    this.problemJoint()
  }
}
</script>

<style scoped>

</style>
