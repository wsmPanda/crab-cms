<template>
  <div>
      <Input :value="value" @input="input" type="textarea" :rows="4"></Input>
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
