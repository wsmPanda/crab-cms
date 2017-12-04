<template>
  <div class="page-detail">
      <h3 v-if="model">{{model.name}}详情</h3>
      <DataForm v-if="model" :value="data" @input="formInput" :model="model"></DataForm>
      <div class="bottom-fixed">
        <Button @click="pageBack">返回</Button>
        <Button @click="resetData">重置</Button>
        <Button @click="pullData" type="primary">提交</Button>
      </div>
  </div>
</template>

<script>
import $ from "util";
import base from "./node";
import DataForm from "@/components/dataForm";
export default {
  extends: base,
  props: {},
  data() {
    return {
      model: null,
      data: {},
      initData: {},
      loading: false,
      id: null
    };
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.$nextTick(() => {
        this.load();
      });
    }
  },
  methods: {
    load() {
      this.fetchModel();
      this.initData = {};
      if (this.id) {
        this.fetchData();
      }
    },
    fetchModel() {
      return $.fetchModel(this.code).then(model => {
        this.$set(this, "model", model);
      });
    },
    fetchData() {
      return $.linkPath("find", null, {
        param: { code: this.code, id: this.id }
      }).then(res => {
        this.$set(this, "data", res.data || {});
        this.initData = $.copy(this.data);
      });
    },
    formInput({ code, value }) {
      this.$set(this.data, code, value);
    },
    pageBack() {
      this.$router.push(`/page/${this.code}/list`);
    },
    pullData() {
      $.linkPath("save", this.data, {
        param: { code: this.code }
      }).then(() => {
        this.$Message.success("数据保存成功");
        this.pageBack();
      });
    },
    resetData() {
      this.$set(this, "data", $.copy(this.initData));
    }
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
    }
    this.load();
  },
  components: {
    DataForm
  }
};
</script>

<style>

</style>
