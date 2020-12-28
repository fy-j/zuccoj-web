<template>
  <base-box-frame>
    <template v-slot:content>
      <codemirror v-if="refreshed" v-model="code" :options="options" class="code-editor"></codemirror>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/clike/clike')
export default {
  name: "code-editor",
  components: {
    codemirror,
    'base-box-frame': BaseBoxFrame
  },
  props: {
    value: String,
    lang: String
  },
  data() {
    return {
      refreshed: true,
      options: {
        mode: 'text/x-c++src',
        lineNumbers: true
      },
      code: this.value
    }
  },
  methods: {
  },
  watch: {
    code: function () {
      this.$emit('input', this.code)
    },
    lang: function () {
      this.options.mode = this.lang?this.lang:'text/x-c++src'
      let that = this
      that.refreshed = false
      that.$nextTick(()=>{
        that.refreshed = true
      })
    },
    value: function () {
      this.code = this.value
    }
  }
}
</script>

<style scoped>

</style>
