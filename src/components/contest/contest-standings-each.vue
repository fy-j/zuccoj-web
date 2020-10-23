<template>
  <div>
    <template v-if="record.wrongTry[problem] || record.rightTime[problem]">
      <div class="try-times-number">
        <b v-if="record.rightTime[problem]" class="pass-number">+{{record.wrongTry[problem]?record.wrongTry[problem]:''}}</b>
        <b v-else class="no-pass-number">-{{ record.wrongTry[problem] }}</b>
      </div>
      <div v-if="record.rightTime[problem]" class="right-time-number">{{record.rightTime[problem]}}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "contest-standings-each",
  props: {
    problem: String,
    record: Object
  }
}
</script>

<style scoped>
  .right-time-number{
    font-size: 12px;
    color: rgb(115,115,115);
  }
  .try-times-number{
    font-size: 15px;
    line-height: 17px;
  }
  .pass-number{
    color: rgb(33, 186, 69);
  }
  .no-pass-number {
    color: red;
  }
</style>
