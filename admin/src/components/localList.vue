<template>
   <div class="table-wrapper">
      <Spin class="table-spin" v-show="fetching"></Spin>
      <table class="table-data">
        <thead>
          <tr>
            <th class="row-check">
              <Checkbox></Checkbox>
            </th>
            <th v-for="col in columns" :key="col.code">
              <div v-html="col.name"></div>
            </th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-if="data && data.length">
          <tr v-for="(row,index) in data" :key="index">
            <td  class="row-check">
              <Checkbox></Checkbox>
            </td>
            <td v-for="col in columns" :key="col.code">
              <div v-html="renderData(row,col)"></div>
            </td>
            <td>
              <Button @click="actionCall('edit',index)" type="text" icon="edit">编辑</Button>
              <Button @click="actionCall('delete',index)" type="text" icon="close">删除</Button>
            </td>
          </tr>
        </tbody>
          <tr>
            <td  class="row-add" colspan="999">
              <Button @click="actionCall('add')" type="text" icon="plus">添加数据</Button>
            </td>
          </tr>
      </table>
      <div class="modal-box">
        <Modal class="modal-full" v-model="formShow" @on-ok="formSubmit">
          <DataForm :value="formData" @input="formInput" :model="model"  v-if="formTrigger" ></DataForm>
        </Modal>
      </div>
    </div>
</template>

<script>
import $ from "util";
import base from "./dataTable";
export default {
  extends: base,
  props: {},
  data() {
    return {
      local: true,
      formTrigger: false,
      formShow: false,
      formIndex: null,
      formData: {}
    };
  },
  computed: {},
  methods: {
    editHandler(data) {
      this.showForm();
      this.formIndex = data;
      this.$set(this, "formData", $.copy(this.data[this.formIndex]) || {});
    },
    addHandler(data) {
      this.showForm();
      this.formIndex = null;
      this.$set(this, "formData", {});
    },
    showForm() {
      if (this.formTrigger) {
        this.formTrigger = false;
      }
      this.formShow = false;
      this.$nextTick(() => {
        this.formTrigger = true;
        this.formShow = true;
      });
    },
    formInput({ code, value }) {
      this.$set(this.formData, code, value);
    },
    formSubmit(code) {
      this.$emit("dataChange", {
        code: this.model.code,
        index: this.formIndex,
        value: this.formData
      });
    }
  },
  created() {
    this.$on("actionCall", ({ code, data }) => {
      if (this[code + "Handler"]) {
        this[code + "Handler"](data);
      }
    });
  },
  beforeCreate() {
    this.$options.components.DataForm = require("./dataForm.vue").default;
  }
};
</script>

<style lang="less">

</style>
