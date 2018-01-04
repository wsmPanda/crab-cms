<template>
  <div>
    <Upload :show-upload-list="false" type="drag" :action="uploadAction" :data="uploadData" :on-success="uploadSuccess">
      <div style="padding: 20px 0">
        <template v-if="!value">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或拖拽上传文件</p>
        </template>
        <div v-else>
          <img :src="'/'+value">
          <p v-if="fileName">{{fileName}}</p>
        </div>
      </div>
    </Upload>
  </div> 
</template>
<script>
import base from "./code";
export default {
  extends: base,
  data() {
    return {
      fileName: null
    };
  },
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
    uploadSuccess(res, data) {
      this.fileName = data.name;
      this.input(res.path.replace("static\\", ""));
      console.log(this.model.mapping);
      if (this.model.mapping) {
        let mappingData = {
          name: data.name,
          size: res.size,
          path: res,
          file: res.filename,
          destination: res.destination
        };
        for (let i in this.model.mapping) {
          this.inputField(i, mappingData[this.model.mapping[i]]);
        }
      }
    }
  },
  components: {}
};
/* 返回数据实例
{ fieldname: 'file',
  originalname: 'role_model.json',
  encoding: '7bit',
  mimetype: 'application/octet-stream',
  destination: 'static/upload/',
  filename: '1514966657229.json',
  path: 'static\\upload\\1514966657229.json',
  size: 7887 }
 */
</script>

<style>

</style>
