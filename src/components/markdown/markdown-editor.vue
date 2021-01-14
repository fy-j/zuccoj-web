<template>
  <mavon-editor
      ref="md"
      v-model="content"
      :placeholder="placeholder"
      :autofocus="false"
      @imgAdd="uploadImg"
  ></mavon-editor>
</template>

<script>
export default {
  name: "markdown-editor",
  props: {
    value: String,
    placeholder: String
  },
  data() {
    return {
      content: this.value,
      uploading: false
    }
  },
  methods: {
    uploadImg(pos, file) {
      let that = this
      let key = 'uploading-msg'
      this.$message.loading({ content: '上传中...', key });
      let sendData = new FormData()
      sendData.append('file', file)
      that.$http.post(that.$store.state.file_host + '/files/upload', sendData)
          .then(data => {
            if (data.data.code === 200) {
              let Data = data.data.data
              that.$refs.md.$img2Url(pos, that.$store.state.file_host + "/files/download?filename=" + Data)
              that.$message.success({ content: '上传成功', key, duration: 2 })
            } else {
              that.$message.error({ content: data.data.msg, key, duration: 2 })
            }
          })
          .catch(() => {
            that.$message.error({ content: '系统错误', key, duration: 2 })
          })
    }
  },
  watch: {
    value: function () {
      this.content = this.value
    },
    content: function () {
      this.$emit('input', this.content)
    }
  }
}
</script>

<style scoped>

</style>
