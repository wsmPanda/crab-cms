export default {
  data() {
    return {
      code: null
    }
  },
  watch: {
    $route() {
      this.code = this.$route.params.code
    }
  },
  created() {
    this.code = this.$route.params.code
  }
}
