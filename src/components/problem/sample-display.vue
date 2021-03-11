<template>
  <div class="sample-wrapper markdown-body">
    <h2>Sample #{{ idx }}</h2>
    <h3>Input
      <button :disabled="copiedInput" class="copy-btn" @click="copyInput">
        {{ copiedInput ? '复制成功' : '复制' }}
      </button>
    </h3>
    <pre>{{ sample.input }}</pre>
    <h3>Output
      <button :disabled="copiedOutput" class="copy-btn" @click="copyOutput">
        {{ copiedOutput ? '复制成功' : '复制' }}
      </button>
    </h3>
    <pre>{{ sample.output }}</pre>
  </div>
</template>

<script>
export default {
  name: "sample-display",
  props: {
    idx: Number,
    sample: {
      input: String,
      output: String
    }
  },
  data() {
    return {
      copiedInput: false,
      copiedOutput: false
    }
  },
  methods: {
    copy(str) {
      let temp = document.createElement("input");
      temp.value = str;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("Copy");
      document.body.removeChild(temp);
    },
    copyInput() {
      this.copy(this.sample.input)
      this.copiedInput = true
      setTimeout(() => {
        this.copiedInput = false
      }, 1000)
    },
    copyOutput() {
      this.copy(this.sample.output)
      this.copiedOutput = true
      setTimeout(() => {
        this.copiedOutput = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.sample-wrapper {
  padding: 8px 25px 15px 25px;
}

.copy-btn {
  float: right;
  color: #1890ff;
  background-color: transparent;
  padding: 5px 10px;
  font-size: .7em;
  border-radius: 3px;
  border: 1px #1890ff solid;
  cursor: pointer;
}

.copy-btn:hover{
  background-color: #1890ff30;
}

.copy-btn:disabled {
  background: #1890ff;
  color: white;
}
</style>
