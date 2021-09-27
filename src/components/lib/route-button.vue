<template>
  <a class="route-button" :href="routeHref" :style="{'--active-color': activeColor}" :class="{'is-active': active}">
    <a-icon style="margin-right: 10px" v-if="icon !== ''" :type="icon"/>
    <slot/>
  </a>
</template>

<script>
export default {
  name: "route-button",
  props: {
    route: [String, Object],
    icon: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: 'rgb(24, 144, 255)'
    }
  },
  computed: {
    active() {
      return this.$route.name === this.routeName
    },
    routeName() {
      return this.$router.resolve(this.route).route.name
    },
    routeHref() {
      return this.$router.resolve(this.route).href
    }
  }
}
</script>

<style scoped>
.route-button {
  display: block;
  width: 100%;
  font-size: 14px;
  padding: 15px 40px;
  color: black;
  transition: 0.5s;
  --active-color: none;
}

.route-button:hover, .route-button.is-active {
  background: rgb(244, 244, 244);
  cursor: pointer;
  box-shadow: inset 8px 0 0 0 var(--active-color);
}
</style>
