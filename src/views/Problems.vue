<template>
  <div>
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="18">
        <problem-list></problem-list>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <title-box-frame title="搜索题目">
          <template v-slot:content>
            <div>
              <a-input-search size="large" placeholder="关键字"></a-input-search>
            </div>
          </template>
        </title-box-frame>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ProblemList from '@/components/problem/problem-list'
import TitleBoxFrame from '@/components/frame/title-box-frame'
export default {
  name: "Problems",
  components: {
    'problem-list': ProblemList,
    'title-box-frame': TitleBoxFrame
  },
  created() {
    this.$store.commit('updateCurrentPage', 'problems')
  }
}
</script>

<style scoped>
  .gutter-box{
    background: white;
  }
</style>
