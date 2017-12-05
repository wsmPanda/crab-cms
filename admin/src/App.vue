<template>
    <div class="layout">
      <NodeMenu class="layout-menu"></NodeMenu>
      <div class="layout-body">
         <header class="layout-header">
           <div class="header-right">
             <a href="/" target="_blank"><Icon type="android-globe"></Icon></a>
             <a href="/admin/service/signout"><Icon type="log-out"></Icon></a>
           </div>
         </header>
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
body {
  background: #fff;
}
.layout {
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: row;
  background: #fff;
  .layout-header {
    height: 48px;
    width: 100%;
    background: #fff;
    border-bottom: 2px solid #dddee1;
    .header-right {
      float: right;
      padding: 0 16px;
      > a {
        font-size: 20px;
        line-height: 48px;
        padding: 0 2px;
        color: #495062;
      }
    }
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
