<template>
    <div class="layout">
      <NodeMenu class="layout-menu"></NodeMenu>
      <div class="layout-body">
         <header class="layout-header"></header>
        <router-view class="layout-view"/>
      </div>
    </div>
</template>

<script>
import NodeMenu from "@/components/nodeMenu";
export default {
  name: "app",
  components: {
    NodeMenu
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
  overflow: hidden;
  flex-direction: row;
  .layout-header {
    height: 48px;
    width: 100%;
    background: #fff;
    border-bottom: 2px solid #dddee1;
  }
  .layout-body {
    flex-direction: column;
    display: flex;
    flex: 1;
    .layout-view {
      background: #fff;
      position: relative;
      flex: 1;
      padding: 8px 16px;
      overflow: auto;
      margin-bottom: 46px;
    }
  }
  .layout-menu {
    background: #fff;
    display: flex;
    flex-direction: column;
  }
}
</style>
