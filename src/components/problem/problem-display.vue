<template>
  <div>
    <markdown-display :content="problemContent1"></markdown-display>
  </div>
</template>

<script>
import MarkdownDisplay from '@/components/markdown/markdown-display'
export default {
  name: "problem-display",
  props: {
    problem: Object
  },
  components: {
    'markdown-display': MarkdownDisplay
  },
  data() {
    return {
      problemContent1: ''
    }
  },
  methods: {
    problemJoint() {
      this.problemContent1 = '# ' + this.problem.problemId +'. ' + this.problem.title + '\n\n'
      this.problemContent1 += '*TimeLimit: '+this.problem.timeLimit+'ms\n MemoryLimit: '+(this.problem.memoryLimit/1024).toFixed(0)+'MB*\n\n'
      if (this.problem.description) {
        this.problemContent1 += '## Description\n\n' + this.problem.description + '\n\n'
      }
      if (this.problem.input) {
        this.problemContent1 += '## Input\n\n' + this.problem.input + '\n\n'
      }
      if (this.problem.output) {
        this.problemContent1 += '## Output\n\n' + this.problem.output + '\n\n'
      }
      if (this.problem.samples.length) {
        let isOnlyOne = (this.problem.samples.length === 1)
        for (let idx in this.problem.samples) {
          let sampleData = this.problem.samples[idx]
          this.problemContent1 += '## Sample '
          if (!isOnlyOne) {
            this.problemContent1 += (Number(idx)+1)
          }
          this.problemContent1 += '\n\n'

          this.problemContent1 += '### Input\n\n'
          this.problemContent1 += '```\n'+sampleData.input+'\n```\n'

          this.problemContent1 += '### Output\n\n'
          this.problemContent1 += '```\n'+sampleData.output+'\n```\n'
        }
      }
      if (this.problem.hint) {
        this.problemContent1 += '## Hint\n\n' + this.problem.hint + '\n\n'
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
