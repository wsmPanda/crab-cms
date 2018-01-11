<template>
  <div>
    <div class="menu-logo">
      CRAB<svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-crab"></use>
      </svg>ADMIN
    </div>
    <Menu theme="light" :active-name="activeName" width="200" @on-select="nodeSelect">
      <MenuItem name="index">
      <Icon type="monitor"></Icon>
      系统管理
      </MenuItem>
      <MenuGroup title="内容管理">
        <MenuItem name="page/list">
        <Icon type="navicon-round"></Icon>
        导航管理
        </MenuItem>
        <MenuItem name="article/list">
        <Icon type="document-text"></Icon>
        文章管理
        </MenuItem>
        <MenuItem name="recruit/list">
        <Icon type="document-text"></Icon>
        招聘管理
        </MenuItem>
        <MenuItem name="comment/list">
        <Icon type="chatbubbles"></Icon>
        评论管理
        </MenuItem>
        <MenuItem name="tag/list">
        <Icon type="ios-pricetag"></Icon>
        标签管理
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="文件管理">
        <MenuItem name="attachment/list">
        <Icon type="folder"></Icon>
        附件管理
        </MenuItem>
        <MenuItem name="attachment_tag/list">
        <Icon type="ios-pricetag"></Icon>
        附件标签
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="数据管理">
        <MenuItem name="form_struct/list">
        <Icon type="gear-a"></Icon>
        表单定义
        </MenuItem>
        <MenuItem name="form_data/list">
        <Icon type="gear-a"></Icon>
        表单数据
        </MenuItem>
        <MenuItem name="/">
        <Icon type="clipboard"></Icon>
        日志查看*
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
  padding: 2px 6px 7px 10px;
  font-size: 14px;
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
  overflow: auto;
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
