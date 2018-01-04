<template>
  <div class="form-control">
    <div class="form-item" v-for="(field,index) in model.fields || []" :key="index">
      <div class="label">{{field.name}}</div>
      <component :is="fieldComponent(field)" :value="value[field.code]" :model="field" :data="value" @input="input(field.code,$event)" @inputField="input($event.code,$event.value)" class="control" ></component>
    </div>
  </div>
</template>

<script>
/**
   * form组件，通过input时间和v-model绑定来同步数据
   */
import FormControl from "./fields";
export default {
  props: {
    value: {},
    model: {}
  },
  methods: {
    input(code, value) {
      this.$emit("input", { code, value });
    },
    fieldComponent(field) {
      var code = `field_${field.type || "code"}`;
      return FormControl.controls[code] ? code : "field_code";
    }
  },
  components: {
    ...FormControl.controls
  }
};
</script>

<style lang="less">
.form-control {
  .label {
    margin: 16px 0 8px;
    font-size: 14px;
  }
}
</style>
