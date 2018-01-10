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
import Time from "util/time";

export default {
  props: {
    data: {},
    model: {},
    fetching: {
      default: false
    }
  },
  data() {
    return {
      checkList: []
    };
  },
  computed: {
    columns() {
      var cols = (this.model && this.model.fields) || [];
      return cols.filter(field => {
        return field.type !== "html" && field.list_pos !== 0;
      });
    }
  },
  methods: {
    actionCall(code, data) {
      this.$emit("actionCall", { code, data });
    },
    renderData(row, col) {
      var value = row[col.code];
      if (col.type === "datetime") {
        return value && value.length ? Time.toTime(new Date(value)) : value;
      }
      if (col.rangeset) {
        return col.rangeset[value] || value;
      } else {
        return value;
      }
    },
    rowCheck(index) {
      this.$set(this.checkList, index, !this.checkList[index]);
    }
  }
};
</script>

<style lang="less">
.table-wrapper {
  position: relative;
}
.table-spin {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  top: 32px;
  bottom: 0;
}
.table-data {
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  th,
  td {
    text-align: left;
    padding: 6px 16px;
    border: none;
  }
  th {
    font-weight: bold;
    vertical-align: bottom;
    border-bottom: 2px solid #e9ecef;
    white-space: nowrap;
  }
  td {
  }
  .row-check {
    width: 32px;
  }
  tr {
    background: #fff;
  }
  tbody tr {
    &:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, 0.02);
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
