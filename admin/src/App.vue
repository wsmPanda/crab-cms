<template>
    <div class="layout">
      <header class="layout-header">header</header>
      <div class="layout-body">
        <Workspace class="layout-menu"></Workspace>
        <router-view class="layout-view"/>
      </div>
    </div>
</template>

<script>
import Workspace from "@/components/workspace";
export default {
  name: "app",
  components: {
    Workspace
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
.layout {
  display: flex;
  height: 100%;
  flex-direction: column;
  .layout-header {
    height: 40px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  .layout-body {
    display: flex;
    flex: 1;
    .layout-view {
      background: #f5f7f9;
      flex: 1;
    }
    .layout-menu {
      background: #fff;
      border-right: 1px solid #eee;
    }
  }
}
</style>
