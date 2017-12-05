<template>
  <div class="list-wrapper">
    <Button @click="actionCall('add')" icon="plus" type="primary">新增</Button>
      <hr>
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
              <Button @click="actionCall('edit',row.id)" icon="edit">编辑</Button>
              <Button @click="actionCall('delete',row.id)" icon="close">删除</Button>
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
    <div class="page-wrapper bottom-fixed">
       <Page @on-change="pageChange" :total="page.total" :page-size="page.size"  :current="page.on"></Page>
    </div>
  </div>
</template>

<script>
import $ from "util";
import Time from "util/time";
export default {
  props: {
    code: {}
  },
  data() {
    return {
      data: [],
      page: {
        on: 1,
        size: 10,
        count: 1,
        tolal: 1
      },
      model: {
        code: this.code
      },
      fetching: true
    };
  },
  computed: {
    columns() {
      var cols = (this.model && this.model.fields) || [];
      return cols.filter(field => {
        return field.type !== "text";
      });
    }
  },
  watch: {
    code() {
      this.load();
    }
  },
  methods: {
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
    fetchModel() {
      return $.fetchModel(this.code).then(model => {
        this.$set(this, "model", model);
      });
    },
    fetchData(postData = {}) {
      this.fetching = true;
      return $.linkPath("list", postData, {
        param: {
          code: this.code
        }
      })
        .then(({ data }) => {
          if (!data.data) {
            this.$set(this, "data", data);
            this.page.on = 1;
            this.page.size = data.length;
            this.page.count = 1;
            this.page.total = data.length;
          } else {
            this.$set(this, "data", data.data);
            this.page.on = data.pageOn;
            this.page.size = data.pageSize;
            this.page.count =
              Math.round((data.totalCount - 1) / data.pageSize) + 1;
            if (this.page.count <= 0) this.page.count = 1;
            this.page.total = data.totalCount;
          }
        })
        .finally(() => {
          this.fetching = false;
        });
    },
    actionCall(code, value) {
      if (this[`action_${code}`]) {
        this[`action_${code}`](value);
      }
    },
    action_add() {
      this.$router.push(`/page/${this.code}/detail`);
    },
    action_edit(value) {
      this.$router.push(`/page/${this.code}/detail/${value}`);
    },
    action_delete(value) {
      $.linkPath("delete", [value], {
        param: {
          code: this.code
        }
      }).then(() => {
        this.$Message.success("数据删除成功");
        this.fetchData();
      });
    },
    load() {
      this.fetchModel().then(res => {
        this.fetchData();
      });
    },
    pageChange(index) {
      console.log(index);
      this.fetchData({
        pageSize: this.page.size,
        pageOn: index
      });
    }
  },
  created() {
    this.load();
  }
};
</script>

<style lang="less">
.list-wrapper {
  hr {
    margin: 8px 0 0;
  }
  .table-wrapper {
    position: relative;
  }
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
.page-wrapper {
  padding: 8px 16px;
  position: fixed;
  bottom: 0;
  text-align: right;
  right: 0;
  width: 100%;
  border-top: 2px solid #dddee1;
}
</style>
