<template>
  <div class="field-state">
    <RadioGroup :value="value" @input="input">
        <Radio v-for="(item,key) in model.rangeset" :key="key"  :label="key">{{item}}</Radio>
    </RadioGroup>
  </div>
</template>

<script>
import base from "./code";
export default {
  extends: base,
  methods: {},
  components: {}
};
</script>

<style>

</style>
