<template>
  <title-box-frame title="公告板">
    <template v-slot:content>
      <loading-box-frame v-if="loading"></loading-box-frame>
      <template v-else-if="allNews.length > 0">
        <template v-for="(news,index) in allNews">
          <markdown-display :content="'## '+news.title+'\n\n'+news.content" :key="'content'+index"></markdown-display>
        </template>
      </template>
      <a-empty v-else description="暂无公告" style="margin: 40px 0"></a-empty>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
import MarkdownDisplay from '@/components/markdown/markdown-display'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
export default {
  name: "index-news",
  components: {
    'title-box-frame': TitleBoxFrame,
    'markdown-display': MarkdownDisplay,
    'loading-box-frame': LoadingBoxFrame
  },
  data() {
    return {
      loading: false,
      allNews: []
    }
  },
  methods: {
    getData() {
      let that = this
      that.loading = true
      that.$http.get(that.$store.state.host + '/news/display')
          .then(data => {
            if (data.data.code === 200) {
              that.allNews = data.data.data
            } else {
              that.$message.error(data.data.msg)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.loading = false
          })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
</style>
