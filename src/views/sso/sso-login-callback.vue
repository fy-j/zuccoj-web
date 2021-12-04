<template>
  <base-box-frame>请稍等，正在为您登录</base-box-frame>
</template>

<script>
import BaseBoxFrame from "../../components/frame/base-box-frame";
export default {
  name: "sso-login-callback",
  components: {BaseBoxFrame},
  mounted() {
    this.$store.commit('loginBySSO')
  }
}
</script>

<style scoped>

</style>
