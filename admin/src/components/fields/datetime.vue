<template>
  <div>
      <DatePicker :value="value" type="datetime" :transfer="true" @input="valueChange" placeholder="请选择"></DatePicker>
  </div>
</template>

<script>
import base from "./code";
import Time from "util/time";
export default {
  extends: base,
  methods: {
    valueChange(v) {
      var ts = Time.toTs(v);
      if (Number.isNaN(ts)) ts = null;
      this.input(v);
    }
  }
};
</script>

<style>
.ivu-date-picker {
  width: 100%;
}
</style>
