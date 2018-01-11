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
  data() {
    return {
      inputting: false
    };
  },
  methods: {
    input(value) {
      if (value === this.value) return;
      this.inputting = true;
      this.$emit("input", value);
      this.$nextTick(() => {
        this.inputting = false;
      });
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
