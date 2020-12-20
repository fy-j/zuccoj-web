<template>
  <div>
    <a-dropdown :trigger="['contextmenu']">
      <img src="@/assets/index.png" alt="" width="100%">
      <a-menu slot="overlay">
        <a-menu-item key="1">
          1st menu item
        </a-menu-item>
        <a-menu-item key="2">
          2nd menu item
        </a-menu-item>
        <a-menu-item key="3">
          3rd menu item
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <index-news style="margin-top: 20px"></index-news>
  </div>
</template>

<script>
import IndexNews from '@/components/index/index-news'
export default {
  name: 'Home',
  components: {
    'index-news': IndexNews
  },
  created() {
    this.$store.commit('updateCurrentPage', 'home')
  }
}
</script>
