<template>
  <div>
      <Input :value="value" @input="input" type="text"></Input>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    model: {},
    data: {}
  },
  methods: {
    input(value) {
      if (value === this.value) return;
      this.$emit("input", value);
    },
    inputField(code, value) {
      if (value === this.data[code]) return;
      this.$emit("inputField", { code, value });
    }
  }
};
</script>

<style>

</style>
