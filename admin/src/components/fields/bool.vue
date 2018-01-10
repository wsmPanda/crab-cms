<template>
  <div>
      <i-Switch :value="boolValue" @input="boolInput">
         <Icon type="android-done" slot="open"></Icon>
         <Icon type="android-close" slot="close"></Icon>
      </i-Switch>
  </div>
</template>

<script>
import base from "./code";
export default {
  extends: base,
  computed: {
    boolValue() {
      return !!this.value;
    }
  },
  methods: {
    boolInput(v) {
      if (v) {
        this.input(1);
      } else {
        this.input(0);
      }
    }
  },
  components: {}
};
</script>

<style>

</style>
