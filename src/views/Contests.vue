<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "Contest",
  created() {
    this.$store.commit('updateCurrentPage', 'contests')
  }
}
</script>

<style scoped>

</style>
