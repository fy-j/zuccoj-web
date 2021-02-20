<template>
  <mavon-editor
      :externalLink="externalLink"
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
  },
  data() {
    return {
      externalLink: {
        markdown_css: function() {
          return '/markdown/github-markdown.min.css';
        },
        hljs_js: function() {
          return '/highlightjs/highlight.min.js';
        },
        hljs_css: function(css) {
          return '/highlightjs/styles/' + css + '.min.css';
        },
        hljs_lang: function(lang) {
          return '/highlightjs/languages/' + lang + '.min.js';
        },
        katex_css: function() {
          return '/katex/katex.min.css';
        },
        katex_js: function() {
          return '/katex/katex.min.js';
        },
      }
    }
  }
}
</script>

<style scoped>
  .markdown-only-show{
    border: 0;
    min-height: 0;
  }
</style>
