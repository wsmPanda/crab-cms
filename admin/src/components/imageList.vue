<template>
  <div class="table-wrapper">
      <Spin class="table-spin" v-show="fetching"></Spin>
      <Row v-if="data && data.length" :gutter="16">
          <Col :span="4" v-for="(row,index) in data" :key="index" >
            <div class="block-box" :class="{active:checkList[index]}" @click="rowCheck(index)">
            <div class="block-item">
              <img :src="row.path">
            </div>
            <div>{{row.name||'文件名'}}</div>
            </div>
          </Col>
      </Row>
    </div>
</template>

<script>
import DataTable from "./dataTable";
export default {
  extends: DataTable
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
