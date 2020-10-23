<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="题目">
        <a-input placeholder="Problem ID" type="number" v-model="problemId" class="status-search-input"></a-input>
      </a-form-item>
      <a-form-item label="用户">
        <a-input placeholder="Username" v-model="username" class="status-search-input"></a-input>
      </a-form-item>
      <a-form-item label="语言">
        <a-select v-model="language" class="status-search-input">
          <a-select-option value="">
            所有
          </a-select-option>
          <a-select-option value="c ">
            C
          </a-select-option>
          <a-select-option value="cpp">
            C++
          </a-select-option>
          <a-select-option value="java">
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
        <a-button><a-icon type="filter" />过滤</a-button>
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
      language: '',
      result: ''
    }
  }
}
</script>

<style scoped>
  .status-search-input{
    width: 110px;
  }
</style>
