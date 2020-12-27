<template>
  <title-box-frame title="新建题目">
    <template v-slot:content>
      <div class="new-form">
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
          <mavon-editor placeholder="题目描述" :autofocus="false" v-model="description"></mavon-editor>
        </div>
        <div class="form-box-100">
          <h2>输入格式</h2>
          <mavon-editor placeholder="输入格式" :autofocus="false" v-model="input"></mavon-editor>
        </div>
        <div class="form-box-100">
          <h2>输出格式</h2>
          <mavon-editor placeholder="输出格式" :autofocus="false" v-model="output"></mavon-editor>
        </div>
        <div class="form-box-100">
          <h2>提示</h2>
          <mavon-editor placeholder="提示" :autofocus="false" v-model="hint"></mavon-editor>
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
        <a-button type="primary" :loading="submitting" @click="newProblemSubmit">保存</a-button>
      </div>

    </template>
  </title-box-frame>
</template>

<script>
require('codemirror/mode/clike/clike')
import { codemirror } from 'vue-codemirror-lite'
import TitleBoxFrame from '../../components/frame/title-box-frame'
export default {
  name: "NewProblem",
  components: {
    codemirror,
    'title-box-frame': TitleBoxFrame
  },
  data() {
    return {
      title: '',
      description: '',
      input: '',
      output: '',
      hint: '',
      timeLimit: 1000,
      memoryLimit: 256,
      spj: '',
      samples: [],
      tags: ['数学','模拟'],
      inputVisible: false,
      tagInput: '',
      isSpj: false,
      spjCode: '',
      submitting: false
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
    newProblemSubmit() {
      let that = this
      if(!that.problemInfoCheck()) {
        return
      }
      that.submitting = true
      let sendData = new FormData()
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
      if (that.hint !== '') {
        sendData.append('hint', that.hint)
      }
      if (that.isSpj) {
        sendData.append('spj', that.spjCode)
      }
      sendData.append('visible', false)
      sendData.append('samples', JSON.stringify(that.samples))
      sendData.append('tags', JSON.stringify(that.tags))
      that.$http.post(that.$store.state.host + '/problem/new', sendData)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              console.log(Data)
            } else {
              that.$message.error(data.data.msg)
              if (data.data.code === 403) {
                that.$router.replace({
                  name: 'error',
                  params: {
                    code: '403'
                  }
                })
              }
            }
          })
          .catch(() => {
            that.$message.error('系统错误')
          })
          .finally(() => {
            that.submitting = false
          })
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
