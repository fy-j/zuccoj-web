<template>
  <base-box-frame>
    <template v-slot:content>
      <a-result status="403" title="403 Forbidden" sub-title="对不起，没有足够的权限访问该页面" v-if="$route.params.code === '403'">
        <template #extra>
          <a-button type="primary" @click="goBack">
            返回
          </a-button>
        </template>
      </a-result>
      <a-result status="500" title="500 Internal Server Error" v-else-if="$route.params.code === '500'">
        <template #extra>
          <a-button type="primary" @click="goBack">
            返回
          </a-button>
        </template>
      </a-result>
      <a-result status="404" title="404 Not Found" sub-title="对不起，没有找到你想要的页面" v-else>
        <template #extra>
          <a-button type="primary" @click="goBack">
            返回
          </a-button>
        </template>
      </a-result>
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "error404",
  components: {
    'base-box-frame': BaseBoxFrame
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
