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
import 'highlight.js/styles/googlecode.css'
import hljs from 'highlight.js' //导入代码高亮文件


async function highlighthandle() {
  await hljs;
  let highlight = document.querySelectorAll('code,pre');
  highlight.forEach((block) => {
    hljs.highlightBlock(block);
  })
}

highlighthandle();
export default {
  name: "markdown-display",
  props: {
    content: String
  },
  data() {
    return {
      externalLink: {
        markdown_css: function () {
          return '/markdown/github-markdown.min.css';
        },
        hljs_js: function () {
          return '/highlightjs/highlight.min.js';
        },
        hljs_css: function (css) {
          return '/highlightjs/styles/' + css + '.min.css';
        },
        hljs_lang: function (lang) {
          return '/highlightjs/languages/' + lang + '.min.js';
        },
        katex_css: function () {
          return '/katex/katex.min.css';
        },
        katex_js: function () {
          return '/katex/katex.min.js';
        },
      }
    }
  }
}
</script>

<style scoped>
.markdown-only-show {
  border: 0;
  min-height: 0;
}

/deep/ .hljs {
  background-color: transparent;
}
</style>
