<template>
<div class="list-wrapper" :key="tableCode">
    <Button @click="actionCall('add')" icon="plus" type="primary">新增</Button>
    <hr>
    <DataTable :data="data" :model="model" :fetching="fetching" @actionCall="actionCall"></DataTable>
    <div class="page-wrapper bottom-fixed">
       <Page @on-change="pageChange" :total="page.total" :page-size="page.size"  :current="page.on"></Page>
    </div>
</div>  
</template>

<script>
import $ from "util";
import base from "./node";
import DataTable from "@/components/dataTable";
export default {
  extends: base,
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
    },
    tableCode() {
      return this.code;
    }
  },
  watch: {
    code() {
      this.$set(this,'data',[])
      this.load();
    }
  },
  methods: {
    fetchModel() {
      return $.fetchModel(this.tableCode).then(model => {
        this.$set(this, "model", model);
      });
    },
    fetchPostData(data) {
      return data;
    },
    fetchData(postData = {}) {
      this.fetching = true;
      return $.linkPath("list", this.fetchPostData(postData), {
        param: {
          code: this.tableCode
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
    actionCall(e) {
      var code = null;
      var data = null;
      if (typeof e === "string") {
        code = e;
      } else {
        code = e.code;
        data = e.data;
      }

      if (this[`action_${code}`]) {
        this[`action_${code}`](data);
      }
    },
    action_add() {
      this.$router.push(`/page/${this.tableCode}/detail`);
    },
    action_edit(value) {
      this.$router.push(`/page/${this.tableCode}/detail/${value}`);
    },
    action_delete(value) {
      $.linkPath("delete", [value], {
        param: {
          code: this.tableCode
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
      this.fetchData({
        pageSize: this.page.size,
        pageOn: index
      });
    }
  },
  created() {
    this.load();
  },
  components: {
    DataTable
  }
};
</script>

<style lang="less">
.list-wrapper {
  hr {
    margin: 8px 0 0;
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
