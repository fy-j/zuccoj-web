<template>
  <mavon-editor
      v-model="content"
      :editable="false"
      :subfield="false"
      :toolbarsFlag="false"
      previewBackground="#FFFFFF"
      :boxShadow="false"
      class="markdown-only-show"
      :transition="false"
      defaultOpen="preview"/>
</template>

<script>
export default {
  name: "markdown-display",
  props: {
    content: String
  }
}
</script>

<style scoped>
  .markdown-only-show{
    border: 0;
    min-height: 0;
  }
</style>
