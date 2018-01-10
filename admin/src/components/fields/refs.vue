<template>
  <div @click="selectInput">
    <Select multiple :value="valueList" @input="input" :clearable="true" transfer :loading="loading" @on-query-change="fetch">
      <Option v-for="option in options" :value="option.id.toString()" :key="option.id">{{option.name||option.title}}</Option>
    </Select>
  </div>
</template>

<script>
import $ from "util";
import base from "./code";
export default {
  extends: base,
  data() {
    return {
      optionLoad: false,
      inInput: false,
      loading: false,
      options: [],
      valueList: []
    };
  },
  watch: {
    value(v) {
      if (!this.inInput) {
        this.getValueData(v);
      }
      if (!this.value || !this.value.length || this.value === "") {
        this.$set(this, "valueList", []);
      } else {
        this.$set(this, "valueList", this.value.split(";") || []);
      }
    }
  },
  methods: {
    getValueData(v) {
      this.fetch(null, { id: v });
    },
    input(v) {
      var res = v.join(";");
      this.inInput = true;
      this.$emit("input", res);
      this.$nextTick(() => {
        this.inInput = false;
      });
    },
    selectInput() {
      if (!this.optionLoad) {
        this.fetch();
      }
    },
    fetch(key, data = {}) {
      if (key) {
        data.query = key;
      }
      this.loading = true;
      $.link(`/admin/service/data/${this.model.rangeset.code}/list`, data)
        .then(res => {
          this.$set(this, "options", res.data.data);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  components: {}
};
</script>

<style>

</style>
