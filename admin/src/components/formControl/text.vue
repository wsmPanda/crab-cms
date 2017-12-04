<template>
  <div>
      <Editor :value="value" @input="input"></Editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import base from "./code";
export default {
  extends: base,
  methods: {},
  components: {
    Editor: VueEditor
  }
};
</script>

<style>

</style>
