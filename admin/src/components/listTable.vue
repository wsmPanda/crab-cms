<template>
  <div class="list-wrapper">
    <div class="table-wrapper">
      <Button @click="actionCall('add')" icon="plus" type="primary">新增</Button>
      <hr>
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
        <tbody>
          <tr v-for="(row,index) in data" :key="index">
            <td  class="row-check">
              <Checkbox></Checkbox>
            </td>
            <td v-for="col in columns" :key="col.code">
              <div v-html="row[col.code]"></div>
            </td>
            <td>
              <Button @click="actionCall('edit',row.id)" icon="edit">编辑</Button>
              <Button @click="actionCall('delete',row.id)" icon="close">删除</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="page-wrapper bottom-fixed">
       <Page></Page>
    </div>
  </div>
</template>

<script>
import $ from "util";
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
      }
    };
  },
  computed: {
    columns() {
      return (this.model && this.model.fields) || [];
    }
  },
  watch: {
    code() {
      this.load();
    }
  },
  methods: {
    fetchModel() {
      return $.fetchModel(this.code).then(model => {
        this.$set(this, "model", model);
      });
    },
    fetchData() {
      return $.linkPath("list", null, {
        param: {
          code: this.code
        }
      }).then(({ data }) => {
        this.$set(this, "data", data);
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
}
.table-data {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
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
