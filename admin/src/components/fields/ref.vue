<template>
  <div @click="selectInput">
    <Select :value="value" @input="input" :clearable="true" filterable transfer :loading="loading" @on-query-change="fetch">
      <Option v-for="(option, index) in options" :value="option[key]" :key="index">{{option.name||option.title}}</Option>
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
      key: "id",
      options: []
    };
  },
  watch: {
    value(v) {
      if (!this.inInput) {
        this.getValueData(v);
      }
    }
  },
  methods: {
    getValueData(v) {
      console.log(v);
      this.fetch(null, { [this.key]: v });
    },
    input(v) {
      this.inInput = true;
      this.$emit("input", v);
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
  created() {
    if (this.model.rangeset && this.model.rangeset.key) {
      this.key = this.model.rangeset.key;
    }
  },
  components: {}
};
</script>

<style>

</style>
