<template>
  <div>
    <h2>题目编号： <b>{{problemId}}</b> <a-divider type="vertical" />测试点数量： <b>{{testcaseList.length}}</b></h2>

    <a-table :columns="columns" :data-source="testcaseList" size="middle" :pagination="false" :loading="loading" style="margin: 20px 0">
      <span slot="inputMD5" slot-scope="record">
        <a :href="$store.state.host + '/testcase/download?input=true&id='+record.testcaseId" target="_blank">{{record.inputMD5}}</a>
      </span>
      <span slot="outputMD5" slot-scope="record">
        <a :href="$store.state.host + '/testcase/download?input=false&id='+record.testcaseId" target="_blank">{{record.outputMD5}}</a>
      </span>

      <span slot="inputSize" slot-scope="size">
        <file-size :size="size"></file-size>
      </span>
      <span slot="outputSize" slot-scope="size">
        <file-size :size="size"></file-size>
      </span>

      <span slot="delete" slot-scope="record">
        <a-popconfirm title="真的要删除该测试点吗？" @confirm="delOneTestcase(record.testcaseId)">
          <a-icon slot="icon" type="question-circle-o" style="color: red" />
          <span style="color: red;cursor: pointer"><a-icon type="delete" /></span>
        </a-popconfirm>
      </span>
    </a-table>

    <div>
      <input type="file" id="file1" style="display: none" accept=".in,.txt" @change="inputFileSelect">
      <input type="file" id="file2" style="display: none" accept=".out,.ans,.txt" @change="outputFileSelect">
      <input type="file" id="file3" style="display: none" a  ccept=".zip" @change="zipFileSelect">
      <a-space :size="20" align="start">
        <a-space :size="10" direction="vertical">
          <h2>新增单个测试点</h2>
          <div style="width: 500px">
            输入数据
            <a-input-search placeholder="测试点输入数据" size="large" @search="eleClick('file1')" @click="eleClick('file1')" v-model="inputName">
              <a-button slot="enterButton">
                选择文件
              </a-button>
            </a-input-search>
          </div>
          <div style="width: 500px">
            输出数据
            <a-input-search placeholder="测试点输出数据" size="large" @search="eleClick('file2')" @click="eleClick('file2')" v-model="outputName">
              <a-button slot="enterButton">
                选择文件
              </a-button>
            </a-input-search>
          </div>
          <a-button type="primary" style="width: 100%" @click="uploadOneTestcase" :loading="oneUpdating" >上传</a-button>
        </a-space>
        <div style="border: solid rgb(217,217,217) 1px;height: 225px"></div>
        <a-space :size="10" direction="vertical">
          <h2>新增多个测试点</h2>
          <div style="width: 500px">
            数据点压缩包
            <a-input-search placeholder="数据点压缩包" size="large" @search="eleClick('file3')" @click="eleClick('file3')" v-model="zipName">
              <a-button slot="enterButton">
                选择文件
              </a-button>
            </a-input-search>
          </div>
          <a-button type="primary" style="width: 100%">上传</a-button>
        </a-space>
      </a-space>
    </div>

  </div>
</template>

<script>
const columns = [
  {
    title: '#',
    dataIndex: 'testcaseId',
    key: 'testcaseId',
    width: '80px',
    align: 'center'
  },
  {
    title: '输入数据MD5',
    key: 'inputMD5',
    scopedSlots: { customRender: 'inputMD5' },
    align: 'center'
  },
  {
    title: '输入数据大小',
    dataIndex: 'inputSize',
    key: 'inputSize',
    scopedSlots: { customRender: 'inputSize' },
    align: 'center'
  },
  {
    title: '输出数据MD5',
    key: 'outputMD5',
    scopedSlots: { customRender: 'outputMD5' },
    align: 'center'
  },
  {
    title: '输出数据大小',
    dataIndex: 'outputSize',
    key: 'outputSize',
    scopedSlots: { customRender: 'outputSize' },
    align: 'center'
  },
  {
    title: '',
    key: 'delete',
    scopedSlots: { customRender: 'delete' },
    align: 'center'
  },
];

import FileSize from '../../components/number/file-size'
export default {
  name: "problem-testcases-edit",
  props: {
    problemId: String
  },
  components: {
    'file-size': FileSize
  },
  data() {
    return {
      loading: false,
      testcaseList: [],
      columns,
      inputFile: null,
      outputFile: null,
      zipFile: null,
      inputName: '',
      outputName: '',
      zipName: '',
      oneUpdating: false
    }
  },
  methods: {
    getData() {
      let that = this
      that.loading = true
      that.$http.get(that.$store.state.host + '/testcase/get?problemId='+that.problemId)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.testcaseList = Data
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
            that.loading = false
          })
    },
    eleClick(name) {
      document.getElementById(name).click()
    },
    inputFileSelect(e) {
      this.inputFile = e.target.files[0]
      this.inputName = this.inputFile.name
    },
    outputFileSelect(e) {
      this.outputFile = e.target.files[0]
      this.outputName = this.outputFile.name
    },
    zipFileSelect(e) {
      this.zipFile = e.target.files[0]
      this.zipName = this.zipFile.name
    },
    uploadOneTestcase() {
      let that = this

      if (!that.inputFile || !that.outputFile) {
        that.$message.error('输入数据和输出数据都是必须的')
        return
      }

      that.oneUpdating = true
      let sendData = new FormData()
      sendData.append('problemId', that.problemId)
      sendData.append('inputFile', that.inputFile)
      sendData.append('outputFile', that.outputFile)
      that.$http.post(that.$store.state.host + '/testcase/newOne', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.getData()
              that.inputFile = null
              that.outputFile = null
              that.inputName = ''
              that.outputName = ''
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
            that.oneUpdating = false
          })
    },
    delOneTestcase(testcaseId) {
      let that = this

      let sendData = new FormData()
      sendData.append('testcaseId', testcaseId)
      that.$http.post(that.$store.state.host + '/testcase/delOne', sendData)
          .then(data => {
            if (data.data.code === 200) {
              that.$message.success(data.data.msg)
              that.getData()
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
            that.oneUpdating = false
          })
    }
  },
  created() {
    this.getData()
  },
  watch: {
    problemId: function () {
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
