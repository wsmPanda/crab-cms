<template>
  <div class="page-system">
    <Row>
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

<style>

</style>
