<template>
  <span>
    {{show}}
  </span>
</template>

<script>
export default {
  name: "file-size",
  props: {
    size: Number,
    unit: String
  },
  data() {
    return {
      show: '!ERROR!'
    }
  },
  methods: {
    next(u) {
      switch (u) {
        case 'B': return 'KB';
        case 'KB': return 'MB';
        case 'MB': return 'GB';
        case 'GB': return 'TB';
        case 'TB': return 'PB';
        default: return false;
      }
    },
    calc() {
      let s = this.size
      let u = this.unit ? this.unit : 'B'
      while(s > 1024) {
        u = this.next(u)
        s /= 1024
      }
      if (!u) {
        this.show = '!ERROR!'
      }
      this.show = s.toFixed(2) + u
    }
  },
  created() {
    this.calc()
  },
  watch: {
    size: function() {
      this.calc()
    },
    unit: function () {
      this.calc()
    }
  }
}
</script>

<style scoped>

</style>
