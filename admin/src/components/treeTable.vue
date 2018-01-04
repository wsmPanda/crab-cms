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
              <Button @click="actionCall('edit',row.id)" type="text" icon="edit">编辑</Button>
              <Button @click="actionCall('delete',row.id)" type="text" icon="close">删除</Button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td  class="row-empty" colspan="999">
              未查询到数据
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import DataTable from "./dataTable";
export default {
  extends: DataTable,
  computed: {
    treeData() {
      var data = {};
    }
  }
};
</script>

<style lang="less">
.block-box {
  padding: 8px;
  text-align: center;
  box-shadow: 0 0 2px rgba(121, 121, 121, 0.3);
  border-radius: 4px;
  margin-top: 12px;
  border: 1px solid rgba(171, 171, 171, 0.5);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 4px rgba(80, 80, 80, 0.6);
  }
  &.active {
    box-shadow: 0 0 4px rgba(0, 161, 255, 0.7);
    border: 1px solid rgba(91, 179, 255, 0.8);
  }
}
.block-item {
  height: 200px;
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 8px;

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
