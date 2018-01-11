<template>
  <div>
      <Editor :value="value||''" @input="input" type="textarea" :rows="4" lang="json"></Editor>
  </div>
</template>

<script>
import base from "./code";
import Editor from "@/elements/codeEditor";
export default {
  extends: base,
  components: {
    Editor
  },
  watch: {
    value(v) {
      if (!this.inputting) {
        this.parseJson(v);
      }
    }
  },
  methods: {
    parseJson(v) {
      try {
        console.log(v)
        this.$emit("input", JSON.stringify(JSON.parse(v), null, 2) || "");
      } catch (ex) {
        console.warn(ex);
      }
    }
  },
  created() {
    if (this.value) {
      this.parseJson(this.value);
    }
  }
};
</script>

<style>

</style>
