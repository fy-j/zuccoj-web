<template>
  <title-box-frame title="编辑题目">
    <template v-slot:content>
      <loading-box-frame v-if="loading"></loading-box-frame>
      <template v-else>
        <div class="new-form" v-if="!newSuccess">
          <div class="form-box-50">
            <h2>题目编号</h2>
            <b>#{{problemId}}</b>
          </div>
          <div class="form-box-50">
            <h2>题目标题</h2>
            <a-input size="large" placeholder="题目标题" v-model="title" />
          </div>
          <div class="form-box-50">
            <h2>时间限制</h2>
            <a-input size="large" placeholder="时间限制" addon-after="ms" type="number" v-model="timeLimit"/>
          </div>
          <div class="form-box-50">
            <h2>内存限制</h2>
            <a-input size="large" placeholder="内存限制" addon-after="MB" type="number" v-model="memoryLimit"/>
          </div>
          <div class="form-box-100">
            <h2>题目描述</h2>
            <markdown-editor placeholder="题目描述" v-model="description"></markdown-editor>
          </div>
          <div class="form-box-100">
            <h2>输入格式</h2>
            <markdown-editor placeholder="输入格式" v-model="input"></markdown-editor>
          </div>
          <div class="form-box-100">
            <h2>输出格式</h2>
            <markdown-editor placeholder="输出格式" v-model="output"></markdown-editor>
          </div>
          <div class="form-box-100">
            <h2>提示</h2>
            <markdown-editor placeholder="提示" v-model="hint"></markdown-editor>
          </div>

          <div class="form-box-100">
            <h2>样例数据</h2>
            <div v-for="(item,index) in samples" :key="'sample'+index">
              <h3>样例数据 <span v-if="samples.length > 1">{{index+1}}</span></h3>
              <div class="sample-box">
                <a-textarea placeholder="输入数据" :rows="8" v-model="item.input"/>
                <a-textarea placeholder="输出数据" :rows="8" v-model="item.output"/>
              </div>
            </div>
            <a-button @click="addSample(true)" type="primary" style="margin-right: 10px">增加样例数据</a-button>
            <a-button @click="addSample(false)" type="danger" :disabled="samples.length === 0">减少样例数据</a-button>
          </div>


          <div class="form-box-100">
            <h2>Special Judge</h2>
            <a-radio-group v-model="isSpj" button-style="solid">
              <a-radio-button :value="false">
                禁用
              </a-radio-button>
              <a-radio-button :value="true">
                启用
              </a-radio-button>
            </a-radio-group>
            <codemirror v-if="isSpj" v-model="spjCode" :options="{mode: 'text/x-c++src',lineNumbers: true}" class="code-editor"></codemirror>
          </div>

          <div class="form-box-100">
            <h2>题目标签</h2>
            <a-tag v-for="(tag,index) in tags" :key="tag+index" closable @close="() => {tags.splice(index, 1)}">{{tag}}</a-tag>
            <a-input
                v-if="inputVisible"
                ref="input"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                v-model="tagInput"
                @blur="handleInputConfirm"
                @keyup.enter="handleInputConfirm"
            />
            <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
              <a-icon type="plus" /> New Tag
            </a-tag>
          </div>
          <a-divider />
          <a-button type="primary" :loading="submitting" @click="updateProblemSubmit">更新</a-button>
        </div>
        <div v-else>
          <a-result
              status="success"
              :title="'题目'+title+'更新成功!'"
              :sub-title="'该题目的编号为：'+problemId+'，你可为其上传完整数据或查看该题目'"
          >
            <template #extra>
              <a-button type="primary" @click="$router.push({name:'admin_problem_data',query:{problemId: problemId}})">
                上传数据
              </a-button>
              <a-button @click="$router.push({path:`/problem/${problemId}/description`})">
                查看题目
              </a-button>
            </template>
          </a-result>
        </div>
      </template>
    </template>
  </title-box-frame>
</template>

<script>
require('codemirror/mode/clike/clike')
import { codemirror } from 'vue-codemirror-lite'
import TitleBoxFrame from '@/components/frame/title-box-frame'
import MarkdownEditor from '@/components/markdown/markdown-editor'
import LoadingBoxFrame from '@/components/frame/loading-box-frame'
export default {
  name: "NewProblem",
  components: {
    codemirror,
    'title-box-frame': TitleBoxFrame,
    'markdown-editor': MarkdownEditor,
    'loading-box-frame': LoadingBoxFrame
  },
  data() {
    return {
      problemId: '',
      loading: false,
      title: '',
      description: '',
      input: '',
      output: '',
      hint: '',
      timeLimit: 1000,
      memoryLimit: 256,
      samples: [],
      tags: [],
      inputVisible: false,
      tagInput: '',
      isSpj: false,
      spjCode: '',
      submitting: false,
      newSuccess: false,
      newProblemId: 0
    }
  },
  methods: {
    addSample(f) {
      if (f) {
        this.samples.push({input:'',output:''})
      } else {
        this.samples.pop()
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.tagInput) {
        this.tags.push(this.tagInput)
        this.tagInput = ''
      }
      this.inputVisible = false
    },
    problemInfoCheck() {
      if(this.title === '') {
        this.$message.error('题目标题为必填项')
        return false
      }
      if (!this.timeLimit) {
        this.$message.error('时间限制错误')
        return false
      }
      if (!this.memoryLimit) {
        this.$message.error('空间限制错误')
        return false
      }
      return true
    },
    updateProblemSubmit() {
      let that = this
      if(!that.problemInfoCheck()) {
        return
      }
      that.submitting = true
      let sendData = new FormData()
      sendData.append('problemId', that.problemId)
      sendData.append('title', that.title)
      sendData.append('timeLimit', that.timeLimit)
      sendData.append('memoryLimit', that.memoryLimit*1024)
      if (that.description !== '') {
        sendData.append('description', that.description)
      }
      if (that.input !== '') {
        sendData.append('input', that.input)
      }
      if (that.output !== '') {
        sendData.append('output', that.output)
      }
      if (that.hint !== '') {
        sendData.append('hint', that.hint)
      }
      if (that.isSpj) {
        sendData.append('spj', that.spjCode)
      }
      sendData.append('visible', false)
      sendData.append('samples', JSON.stringify(that.samples))
      sendData.append('tags', JSON.stringify(that.tags))
      that.$http.post(that.$store.state.host + '/problem/update', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.newSuccess = true
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.submitting = false
          })
    },
    getProblem() {
      let that = this
      that.problemId = that.$route.query.problemId
      if (!that.problemId) {
        that.$store.commit('errorPage', 404)
        return
      }

      that.loading = true
      that.$http.get(that.$store.state.host + '/problem/get?problemId='+that.problemId)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              console.log(Data)
              that.problemId = Data.problemId
              that.title = Data.title
              that.description = Data.description
              that.input = Data.input
              that.output = Data.output
              that.hint = Data.hint
              that.timeLimit = Data.timeLimit
              that.memoryLimit = Data.memoryLimit / 1024
              that.spjCode = Data.spj
              that.isSpj = Data.spj !== null
              that.tags = Data.tags?JSON.parse(Data.tags):[]
              that.samples = Data.samples?JSON.parse(Data.samples):[]
            } else {
              that.$message.error(data.data.msg)
              that.$store.commit('errorPage', data.data.code)
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
    this.getProblem()
  },
  watch: {
    '$route': function () {
      this.getProblem()
    }
  }
}
</script>

<style scoped>
.new-form{
  width: 100%;
}
.form-box-50{
  width: 50%;
  margin: 20px 0;
}
.form-box-100{
  width: 100%;
  margin: 20px 0;
}
.sample-box{
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}
</style>
