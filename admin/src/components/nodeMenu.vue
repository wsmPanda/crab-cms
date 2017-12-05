<template>
  <div>
    <div class="menu-logo">
      CRAB<svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-crab"></use>
      </svg>ADMIN 
    </div>
    <Menu theme="light" :active-name="activeName" width="200" @on-select="nodeSelect">
      <MenuGroup title="内容管理">
        <MenuItem name="article/list">
        <Icon type="document-text"></Icon>
        文章管理 
        </MenuItem>
        <MenuItem name="comment/list">
        <Icon type="chatbubbles"></Icon>
        评论管理
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="用户管理">
        <MenuItem name="user/list">
        <Icon type="person"></Icon>
        账号管理
        </MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</template>

<script>
export default {
  name: "nodeMenu",
  data() {
    return {};
  },
  computed: {
    activeName() {
      return this.$route.path && this.$route.path.replace("/page/", "");
    }
  },
  methods: {
    nodeSelect(name) {
      if (name) {
        this.$router.push("/page/" + name);
      }
    }
  }
};
</script>
<style lang="less">
.menu-logo {
  padding: 2px 20px 5px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #dddee1;
  height: 48px;
  .icon {
    font-size: 36px;
    line-height: -1px;
    position: relative;
    top: 2px;
  }
}
.ivu-menu {
  flex: 1;
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
    width: 100%;
    margin: 0;
  }
  .ivu-menu-item-group {
    margin: 0;
  }
  .ivu-menu-vertical .ivu-menu-item-group-title {
    padding-left: 20px;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item {
    padding-left: 32px;
  }
}
</style>
