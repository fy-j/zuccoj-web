<template>
  <a-card hoverable class="base-box-frame" type="inner" :title="title">
    <slot name="content"></slot>
  </a-card>
</template>

<script>
export default {
  name: "title-box-frame",
  props: {
    title: String
  }
}
</script>

<style scoped>
.base-box-frame {
  width: 100%;
  cursor: default;
}
</style>
