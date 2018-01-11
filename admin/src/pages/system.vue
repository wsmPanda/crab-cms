<template>
  <div class="page-system">
    <table class="table-data table-func">
      <tr>
        <th>角色</th>
        <th>功能</th>
        <th>任务</th>
      </tr>
      <tr>
        <td rowspan="3">管理员</td>
        <td>账号管理</td>
        <td></td>
      </tr>
      <tr>
        <td>日志查看</td>
        <td></td>
      </tr>
      <tr>
        <td>表单定义</td>
        <td></td>
      </tr>
      <tr>
        <td rowspan="5">维护者</td>
        <td>导航管理</td>
        <td></td>
      </tr>
      <tr>
        <td>页面内容编辑</td>
        <td></td>
      </tr>
      <tr>
        <td>查看表单</td>
        <td></td>
      </tr>
      <tr>
        <td>查看表单</td>
        <td></td>
      </tr>
      <tr>
        <td>定义标签</td>
        <td></td>
      </tr>
      <tr>
        <td rowspan="3">访客</td>
        <td>内容查看</td>
        <td></td>
      </tr>
      <tr>
        <td>内容分享</td>
        <td></td>
      </tr>
      <tr>
        <td>表单填写</td>
        <td></td>
      </tr>
    </table>
    <Row v-show="0">
      <Col :span="6">
      <Card :bordered="false">
        <p slot="title">页面状态</p>
        <p>
          <Button>重新生成页面</Button>
          <Button>刷新缓存</Button>
        </p>
      </Card>
      </Col>
      <Col :span="6">
      <Card :bordered="false">
        <p slot="title">内容统计</p>
        <p>
          文章数量:0
        </p>
        <p>
          评论数量:0
        </p>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.table-func {
  th,
  td {
    border: 1px solid #dddee1;
  }
}
</style>
