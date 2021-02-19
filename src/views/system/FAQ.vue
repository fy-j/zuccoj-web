<template>
  <title-box-frame title="ZUCC Online Judge β FAQ">
    <template v-slot:content>
      <div v-for="(item, index) in faqData" :key="'faq_'+index">
        <a-divider v-if="index>0"/>
        <div class="faq-q-box">
          <div class="faq-markdown-box">
            <markdown-display :content="'## '+item.q"></markdown-display>
          </div>
        </div>
        <div class="faq-a-box">
          <div class="faq-markdown-box">
            <markdown-display :content="item.a"></markdown-display>
          </div>
        </div>
      </div>
    </template>
  </title-box-frame>
</template>

<script>
const faqData = [
    {
      q: 'ZUCC Online Judge β 的评测环境是怎么样的?',
      a: '评测姬运行于 `Ubuntu Linux`, 目前支持 `C/C++/Java` 代码的提交和评测。\n' +
          '\n' +
          '使用的编译器及其版本见下表：\n' +
          '\n' +
          '| 语言 | 编译器及版本                                        |\n' +
          '| ---- | --------------------------------------------------- |\n' +
          '| C    | GNU GCC version 7.5.0 (Ubuntu 7.5.0-3ubuntu1~18.04) |\n' +
          '| C++  | GNU G++ version 7.5.0 (Ubuntu 7.5.0-3ubuntu1~18.04) |\n' +
          '| Java | Oracle JDK 1.8.0_251-b08                            |\n' +
          '\n' +
          '使用的编译命令见下表：\n' +
          '\n' +
          '| 语言 | 编译命令                                                     |\n' +
          '| ---- | ------------------------------------------------------------ |\n' +
          '| C    | `gcc -o ${target} ${source} -static -w -lm -std=c99 -O2 -DONLINE_JUDGE` |\n' +
          '| C++  | `g++ -o ${target} ${source} -static -w -lm -O2 -DONLINE_JUDGE` |\n' +
          '| Java | `javac -J-Xms32m -J-Xmx256m Main.java`                       |'
    },{
      q: '程序怎样取得输入、进行输出?',
      a: '你的程序应该从标准输入 `stdin(\'Standard Input\')` 获取输入，并将结果输出到标准输出 `stdout(\'Standard Output\')`.\n\n' +
          '例如,在C语言可以使用 `scanf` ，在C++可以使用 `cin` 进行输入；在C使用 `printf` ，在C++使用 `cout` 进行输出.\n\n' +
          '**注意：用户程序不允许直接读写文件，所有违规操作都会返回运行时错误`Runtime Error`**'
    },{
      q: '评测姬返回的结果都是什么意思?',
      a: '| 返回结果            | 结果解释                                   |\n' +
          '| ------------------- | ------------------------------------------ |\n' +
          '| Pending             | 代码正在等待评测姬评测                     |\n' +
          '| Compile Error       | 编译错误，点击可查看编译器信息             |\n' +
          '| Time Limit Exceed   | 运行时间超限，请检查算法复杂度             |\n' +
          '| Memory Limit Exceed | 运行内存超限，请检查内存使用情况           |\n' +
          '| Output Limit Exceed | 输出超限                                   |\n' +
          '| Runtime Error       | 运行时错误，请检查是否有数组越界或非法调用 |\n' +
          '| Wrong Answer        | 答案错误                                   |\n' +
          '| Accepted            | 恭喜，代码通过了所有测试点                 |\n' +
          '| Presentation Error  | 格式错误，请检查输出格式                   |\n' +
          '| System Error        | 系统错误，请联系管理员                     |\n' +
          '| Unknown Error       | 未知错误，请联系管理员                     |'
    },
]
import TitleBoxFrame from '@/components/frame/title-box-frame'
import MarkdownDisplay from '@/components/markdown/markdown-display'
export default {
  name: "FAQ",
  components: {
    'title-box-frame': TitleBoxFrame,
    'markdown-display': MarkdownDisplay
  },
  data() {
    return {
      faqData
    }
  },
  created() {
    this.$store.commit('updateCurrentPage', 'FAQ')
  }
}
</script>

<style scoped>
.faq-markdown-box{
  width: calc(100% - 20px);
}
.faq-q-box{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: inset 30px 0 0 -25px rgb(24,144,255);
}
.faq-a-box{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: inset 30px 0 0 -25px rgb(82, 196, 26);
}
</style>
