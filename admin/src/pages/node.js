export default {
  watch: {
    $route() {
      this.code = this.$route.params.code
    }
  },
  data() {
    return {
      code: null
    }
  },
  created() {
    this.code = this.$route.params.code
  }
}
