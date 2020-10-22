<template>
  <a-card hoverable class="base-box-frame">
    <slot name="content"></slot>
  </a-card>
</template>

<script>
export default {
name: "base-box-frame"
}
</script>

<style scoped>
  .base-box-frame {
    width: 100%;
    cursor: default;
  }
</style>
