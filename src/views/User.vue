<template>
  <base-box-frame>
    <template v-slot:content>
      User {{$route.params.username}}
    </template>
  </base-box-frame>
</template>

<script>
import BaseBoxFrame from '@/components/frame/base-box-frame'
export default {
  name: "User",
  components: {
    'base-box-frame': BaseBoxFrame
  }
}
</script>

<style scoped>

</style>
