<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "Gym",
  methods: {
  },
  created() {
    this.$store.commit('updateCurrentPage', 'gym')
  }
}
</script>

<style scoped>

</style>
