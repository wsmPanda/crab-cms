<template>
  <div>
      <Input :value="value" @input="input" type="text"></Input>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    model: {}
  },
  methods: {
    input(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>

</style>
