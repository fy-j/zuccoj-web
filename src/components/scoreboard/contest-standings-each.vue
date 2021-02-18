<template>
  <div class="scoreboard-cell">
    <template v-if="record.wrongTryCount || record.rightTime !== undefined || record.pendingTryCont">
      <div class="try-times-number">
        <b v-if="record.rightTime !== undefined" class="pass-number">+{{record.wrongTryCount?record.wrongTryCount:''}}</b>
        <b v-else-if="record.wrongTryCount > 0" class="no-pass-number">-{{ record.wrongTryCount }}</b>
        <b v-if="record.rightTime === undefined && record.pendingTryCont > 0" class="pending-number">={{record.pendingTryCont}}</b>
      </div>
      <div v-if="record.rightTime!==undefined" class="right-time-number">{{record.rightTime}}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "contest-standings-each",
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
