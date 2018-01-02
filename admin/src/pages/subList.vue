<template>
  <div class="list-wrapper" :key="tableCode">
    <Button @click="actionCall('add')" icon="plus" size="small" type="primary">新增</Button>
    <hr>
    <DataTable :data="data" :model="model" :fetching="fetching" @actionCall="actionCall"></DataTable>
    <div class="sub-pagination">
       <Page @on-change="pageChange" :total="page.total" :page-size="page.size" size="small" :current="page.on"></Page>
    </div>
</div>  
</template>

<script>
import base from "./list";
import $ from "util";
export default {
  extends: base,
  props: {
    modelCode: {},
    filter: {
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      routePath: this.$route.path
    };
  },
  computed: {
    tableCode() {
      return this.modelCode;
    }
  },
  methods: {
    fetchPostData(data) {
      return $.setObj(data, { filter: this.filter });
    },
    action_add() {
      var query = "?";
      for (let i in this.filter) {
        query += `${i}=${this.filter[i]}&`;
      }
      query = query.slice(0, -1);
      this.$router.push(`/page/${this.tableCode}/detail${query}`);
    }
  }
};
</script>

<style>
.sub-pagination {
  padding: 8px 0px;
  text-align: center;
}
</style>
