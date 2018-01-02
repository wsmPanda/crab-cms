<template>
  <div class="page-detail">
      <h3 v-if="model">{{model.name}}详情</h3>
      <hr>
      <DataForm v-if="model" :value="data" @input="formInput" :model="model"></DataForm>
      <div v-if="model && model.relate && id" class="relate-box">
        <h4># 关联数据</h4>
        <hr>
        <div v-for="(item,index) in model.relate" :key="index" class="relate-item" v-if="item.type==='sub'">
          <label>{{item.name}}</label>
          <DataTable :modelCode="item.code" :filter="{[item.key]:id}"></DataTable>
        </div>
      </div>
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
import DataTable from "@/pages/subList";

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
      } else {
        this.$set(this, "data", {});
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
      this.$router.go(-1);
      //this.$router.push(`/page/${this.code}/list`);
    },
    pullData() {
      $.linkPath(
        "save",
        { ...this.$route.query, ...this.data },
        {
          param: { code: this.code }
        }
      ).then(() => {
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
    DataForm,
    DataTable
  }
};
</script>

<style lang="less">
.page-detail {
  > h3 {
    font-size: 18px;
    padding-top: 16px;
  }
}
.relate-box {
  padding: 16px 0;
  > h4 {
    padding-top: 32px;
    font-size: 18px;
  }
}
.relate-item {
  padding: 0 8px;
  > label {
    margin: 16px 0 8px;
    font-size: 16px;
    display: block;
    font-weight: bold;
  }
}
</style>
