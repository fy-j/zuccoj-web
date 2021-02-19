<template>
  <div class="user-full-info">
    <a-skeleton active v-if="loading"/>
    <a-descriptions title="" bordered v-if="userData">
      <a-descriptions-item label="用户名">
        {{userData.username}}
      </a-descriptions-item>
      <a-descriptions-item label="用户昵称">
        {{userData.nickname}}
      </a-descriptions-item>
      <a-descriptions-item label="用户权限">
        {{userData.statusText}}
      </a-descriptions-item>
      <a-descriptions-item label="注册时间">
        {{userData.regTime}}
      </a-descriptions-item>
      <a-descriptions-item label="所属学校">
        {{userData.school}}
      </a-descriptions-item>
      <a-descriptions-item label="电子邮箱">
        {{userData.email}}
      </a-descriptions-item>
      <a-descriptions-item label="上次访问时间">
        {{userData.accessTime}}
      </a-descriptions-item>
      <a-descriptions-item label="上次访问IP" :span="2">
        {{userData.ip}}
      </a-descriptions-item>
      <a-descriptions-item label="用户签名" :span="3">
        {{userData.signature}}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
export default {
  name: "user-full-info",
  props: {
    loading: Boolean,
    userData: Object
  }
}
</script>

<style scoped>
.user-full-info{
  margin: 10px 0;
}
</style>
