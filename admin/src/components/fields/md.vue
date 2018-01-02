<template>
  <div>
      <Editor :value="value" @input="input"></Editor>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import base from "./code";
export default {
  extends: base,
  methods: {},
  components: {
    Editor: mavonEditor
  }
};
</script>

<style>

</style>
