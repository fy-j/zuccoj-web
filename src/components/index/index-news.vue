<template>
  <title-box-frame title="公告板">
    <template v-slot:content>
      <template v-for="(content,index) in contents">
        <markdown-display :content="content" :key="'content'+index"></markdown-display>
      </template>
    </template>
  </title-box-frame>
</template>

<script>
import TitleBoxFrame from '@/components/frame/title-box-frame'
import MarkdownDisplay from '@/components/markdown/markdown-display'
export default {
  name: "index-news",
  components: {
    'title-box-frame': TitleBoxFrame,
    'markdown-display': MarkdownDisplay
  },
  data() {
    return {
      contents: [
          '## ZUCC Online Judge &beta; Released! :star2:\n\n' +
          'ZUCC在线评测系统&beta;正式发布！\n\n' +
          '新版本从底层实现到整体架构到前端页面都进行了全新的设计，力求给大家一个更好的刷题/训练环境。\n\n' +
          '目前系统支持`C`、`C++`和`Java`三种语言代码的提交和评测，详细的编译和运行命令请查看页脚中的 ***常见问题*** ，其它语言将在后续逐步支持。\n\n' +
          '在使用过程中遇到的问题，可以在页脚的 ***意见反馈*** 中告诉我们，也可以[邮件联系管理员](mailto:31701030@stu.zucc.edu.cn)。\n\n' +
          'Enjoy It ! :grin:',
          '## 关于ZUCC Online Judge账号规范 :exclamation:\n\n' +
          '校内同学请使用学号作为username，使用真实姓名作为nickname，否则成绩将不被接受！'
      ]
    }
  }
}
</script>

<style scoped>
</style>
