<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="题目" v-show="problemIdVisible">
        <a-input placeholder="Problem ID" v-model="problemId" class="status-search-input"></a-input>
      </a-form-item>
      <a-form-item label="用户" v-show="usernameVisible">
        <a-input placeholder="Username" v-model="username" class="status-search-input"></a-input>
      </a-form-item>
      <a-form-item label="语言">
        <a-select v-model="lang" class="status-search-input">
          <a-select-option value="">
            所有
          </a-select-option>
          <a-select-option :value="1">
            C
          </a-select-option>
          <a-select-option :value="2">
            C++
          </a-select-option>
          <a-select-option :value="3">
            Java
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="结果">
        <a-select v-model="result" class="status-search-input">
          <a-select-option value="">
            所有
          </a-select-option>
          <a-select-option :value="-1">
            PD
          </a-select-option>
          <a-select-option :value="1">
            CE
          </a-select-option>
          <a-select-option :value="2">
            TLE
          </a-select-option>
          <a-select-option :value="3">
            MLE
          </a-select-option>
          <a-select-option :value="4">
            OLE
          </a-select-option>
          <a-select-option :value="5">
            RE
          </a-select-option>
          <a-select-option :value="6">
            WA
          </a-select-option>
          <a-select-option :value="7">
            AC
          </a-select-option>
          <a-select-option :value="8">
            PE
          </a-select-option>
          <a-select-option :value="9">
            SE
          </a-select-option>
          <a-select-option :value="0">
            UE
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button @click="onClick"><a-icon type="filter"/>过滤</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "status-solution-search",
  data() {
    return {
      problemId: '',
      username: '',
      lang: '',
      result: '',
      problemIdVisible: true,
      usernameVisible: true,
    }
  },
  methods: {
    loadParams() {
      this.problemId = this.$route.query.problemId ? (this.$route.query.problemId) : ''
      this.username = this.$route.query.username ? this.$route.query.username : ''
      this.lang = this.$route.query.lang ? Number(this.$route.query.lang) : ''
      this.result = this.$route.query.result ? Number(this.$route.query.result) : ''
      if (this.$route.params.problemId) {
        this.problemId = (this.$route.params.problemId)
        this.problemIdVisible = false
      }
      if (this.$route.params.username) {
        this.username = this.$route.params.username
        this.usernameVisible = false
      }
    },
    onClick() {
      let query = {}
      if (this.problemId) {
        query['problemId'] = this.problemId
      }
      if (this.username) {
        query['username'] = this.username
      }
      if (this.lang) {
        query['lang'] = this.lang
      }
      if (this.result) {
        query['result'] = this.result
      }
      this.$emit('search', query)
    }
  },
  created() {
    this.loadParams()
  },
  watch: {
    '$route': function () {
      this.loadParams()
    }
  }
}
</script>

<style scoped>
  .status-search-input{
    width: 110px;
  }
</style>
