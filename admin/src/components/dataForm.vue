<template>
  <Row class="form-control" :gutter="16">
    <Col :span="formGroups.default.span || 16" classs="form-block">
    <div class="form-group" v-for="(group,index) in formGroupsList" v-if="!group.locate || group.locate==='left'" :key="index">
      <h4 class="form-group-title" v-if="group.name">{{group.name}}</h4>
      <div class="form-item" v-for="(field,index) in group.fields || []" :key="index" :data-code="field.code">
        <div class="label">{{field.name}}</div>
        <component :is="fieldComponent(field)" :value="value[field.code]" :model="field" :data="value" @input="input(field.code,$event)"
          @inputField="input($event.code,$event.value)" class="control"></component>
      </div>
    </div>
    </Col>
    <Col :span="8" class="form-block form-block-right">
    <div class="form-group" v-for="(group,index) in formGroupsList" v-if="group.locate==='right'" :key="index">
      <h4 class="form-group-title" v-if="group.name">{{group.name}}</h4>
      <div class="form-item" v-for="(field,index) in group.fields || []" :key="index" :data-code="field.code">
        <div class="label">{{field.name}}</div>
        <component :is="fieldComponent(field)" :value="value[field.code]" :model="field" :data="value" @input="input(field.code,$event)"
          @inputField="input($event.code,$event.value)" class="control"></component>
      </div>
    </div>
    </Col>
  </Row>
</template>

<script>
/**
   * form组件，通过input时间和v-model绑定来同步数据
   */
import FormControl from "./fields";
export default {
  props: {
    value: {},
    model: {}
  },
  data() {
    return {
      formGroups: {
        default: {
          show: true,
          collapse: false,
          name: null,
          type: null,
          fields: []
        }
      },
      block: {
        left: {

        },
        right: {
          
        }
      }
    };
  },
  computed: {
    formFields() {
      return this.model.fields
        .filter(a => {
          return a.card_pos !== 0;
        })
        .sort((a, b) => {
          return (a.card_pos || 0) - b.card_pos;
        });
    },
    formGroupsList() {
      var list = [];
      for (let field of this.formFields) {
        let code = field.group || "default";
        if (this.formGroups[code]) {
          this.formGroups[code].fields.push(field);
        } else {
          this.formGroups.default.fields.push(field);
        }
      }
      for (let i in this.formGroups) {
        this.formGroups.code = i;
        list.push(this.formGroups[i]);
      }
      return list;
    },
    formFieldsLeft() {
      return this.formFields.filter(a => {
        return !a.loate || a.loate === "right";
      });
    },
    formFieldsRight() {}
  },
  methods: {
    input(code, value) {
      this.$emit("input", {
        code,
        value
      });
    },
    fieldComponent(field) {
      var code = `field_${field.type || "code"}`;
      return FormControl.controls[code] ? code : "field_code";
    }
  },
  created() {
    if (this.model.groups) {
      for (let i in this.model.groups) {
        let group = this.model.groups[i];
        this.formGroups[i] = {
          show: true,
          collapse: false,
          name: null,
          type: null,
          ...this.formGroups[i],
          ...group,
          fields: []
        };
      }
    }
  },
  components: {
    ...FormControl.controls
  }
};
</script>

<style lang="less">
.form-control {
  .label {
    margin: 8px 0 8px;
    font-size: 14px;
  }
}
.form-group-title {
  font-size: 14px;
  padding: 6px 12px;
  background: #efeff1;
  margin-top: 16px;
}
.form-block-right {
  .form-item {
    padding-left: 16px;
  }
}
</style>
