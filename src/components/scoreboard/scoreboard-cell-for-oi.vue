<template>
  <div class="scoreboard-cell">
    <template v-if="record.try">
      <div class="try-times-number">
        <b v-if="record.pending" class="pending-number">?</b>
        <b v-else-if="record.accepted" class="pass-number">{{record.score}}</b>
        <b v-else class="no-pass-number">{{record.score}}</b>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "scoreboard-cell-for-icpc",
  props: {
    record: Object
  }
}
</script>

<style scoped>
  .scoreboard-cell{
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
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
  .pending-number {
    color: #E6A23C;
  }
</style>
