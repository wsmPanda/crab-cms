<template>
  <div class="page-detail">
      <h3 v-if="model">{{model.name}}详情</h3>
      <hr>
      <DataForm v-if="model" :value="data" @input="formInput" :model="model"></DataForm>
      <div v-if="model && model.slaves" class="salve-box">
        <div v-for="(slave,index) in model.slaves" :key="index" class="slave-item"> 
           <h4># {{slave.name}}</h4>
           <LocalList :data="data[slave.code]" :model="slave" @dataChange="dataChange"></LocalList>
        </div>
      </div>
      <div v-if="model && model.relate && id && data.id" class="relate-box">
        <h4># 关联数据</h4>
        <hr>
        <div v-for="(item,index) in model.relate" :key="index" class="relate-item" v-if="item.type==='sub'">
          <label>{{item.name}}</label>
          <DataTable :modelCode="item.code" :filter="{[item.key]:data[item.main_key||'id']}"></DataTable>
        </div>
      </div>
      <div class="bottom-fixed">
        <Button @click="pageBack">返回</Button>
        <Button @click="resetData">重置</Button>
        <Button @click="pushData" type="primary">提交</Button>
      </div>
  </div>
</template>

<script>
import $ from "util";
import base from "./node";
import DataForm from "@/components/dataForm";
import DataTable from "@/pages/subList";
import LocalList from "@/components/localList";

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
    },
    pushData() {
      var data = { ...this.$route.query, ...this.data };
      for (let i in this.model.fields) {
        let field = this.model.fields[i];
        if (field.type === "json") {
          try {
            data[field.code] = JSON.stringify(JSON.parse(data[field.code]));
          } catch (ex) {
            console.warn(ex);
          }
        }
      }
      $.linkPath("save", data, {
        param: { code: this.code }
      }).then(() => {
        this.$Message.success("数据保存成功");
        this.pageBack();
      });
    },
    resetData() {
      this.$set(this, "data", $.copy(this.initData));
    },
    dataChange({ code, index, value }) {
      if (this.model._slaves[code] && !this.data[code]) {
        $.set(this.data, code, []);
      }
      if (Array.isArray(this.data[code])) {
        if (this.data[code][index]) {
          this.$set(this.data[code], index, value);
        } else {
          this.data[code].push(value);
        }
      } else {
        this.$set(this.data, code, value);
      }
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
    DataTable,
    LocalList
  }
};
</script>

<style lang="less">
.page-detail {
  > h3 {
    font-size: 18px;
    padding-top: 8px;
  }
}
.slave-item {
  h4 {
    font-size: 14px;
    margin: 16px 0;
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
