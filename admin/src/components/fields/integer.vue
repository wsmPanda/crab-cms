<script>
import base from "./code";
export default {
  extends: base,
  methods: {
    input(v) {
      var value = parseInt(v);
      this.$emit("input", Number.isNaN(value) ? null : value);
    }
  }
};
</script>

<style>
.ivu-input-number {
  width: 100%;
}
</style>
