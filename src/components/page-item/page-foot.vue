<template>
    <div class="page-foot">
      <div class="page-foot-content-box">
        <div class="foot-content-box">
          <b class="foot-title">服务</b>
          <router-link class="foot-item" :to="{path:'/status'}">评测队列</router-link>
          <router-link class="foot-item" :to="{path:'/FAQ'}">常见问题</router-link>
          <a class="foot-item">意见反馈</a>
        </div>

        <div class="foot-content-box">
          <b class="foot-title">管理</b>
          <router-link class="foot-item" :to="{path:'/system'}">系统状态</router-link>
          <router-link class="foot-item" :to="{name:'admin_problem_data'}">数据管理</router-link>
          <router-link class="foot-item" :to="{path:'/admin'}">管理后台</router-link>
        </div>

        <div class="foot-content-box">
          <b class="foot-title">关于</b>
          <span class="foot-item" :title="'build '+buildVersion">ZUCC Online Judge &beta;</span>
          <span class="foot-item">&copy; {{ new Date().getFullYear() }} ZUCC ACM LAB</span>
          <span class="foot-item">Powered by <a href="https://github.com/KeadinZhou" target="_blank">@KeadinZhou</a></span>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'page-foot',
      methods: {
        fixZero(x) {
          if (x<10) {
            return '0'+x
          }
          return x
        }
      },
      data() {
        return {
            buildVersion: ''
        }
      },
      created() {
        let version = new Date(document.getElementById("app-build-version").innerText)
        this.buildVersion = ''+version.getFullYear()+this.fixZero(version.getMonth()+1)+this.fixZero(version.getDate())+':'+this.fixZero(version.getHours())+this.fixZero(version.getMinutes())
      }
    }
</script>

<style scoped>
    .page-foot {
      width: 100%;
      background: white;
      padding: 40px;
    }

    .page-foot-content-box{
      width: 1100px;
      left: 50%;
      position: relative;
      transform: translate(-50%, 0);
      display: flex;
      justify-content: space-between;
    }

    .foot-content-box{
      display: inline-block;
      vertical-align: top;
      min-width: 200px;
    }

    .foot-title{
      color: black;
      font-size: 20px;
      margin-bottom: 30px;
      display: block;
    }

    .foot-item{
      color: darkgrey;
      margin: 10px 0;
      display: block;
    }

    .foot-item:hover{
      color: black;
    }
</style>
