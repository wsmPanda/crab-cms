<template>
  <div>
    <Upload :show-upload-list="false" type="drag" :action="uploadAction" :data="uploadData" :on-success="uploadSuccess">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>点击或拖拽上传文件</p>
      </div>
    </Upload>
  </div>
</template>
<script>
import base from "./code";
export default {
  extends: base,
  computed: {
    uploadAction() {
      return "/admin/service/upload";
    },
    uploadData() {
      return {
        code: this.model.code
      };
    }
  },
  methods: {
    uploadSuccess(...arg) {
      console.log(...arg);
    }
  },
  components: {}
};
</script>

<style>

</style>
