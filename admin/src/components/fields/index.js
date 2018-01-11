import code from './code'
import text from './text'
import html from './html'
import datetime from './datetime'
import state from './state'
import integer from './integer'
import file from './file'
import memo from './memo'
import ref from './ref'
import refs from './refs'
import bool from './bool'
import json from './json'

var FormConrol = {
  controls: {}
}
/**
 * 数据类型规划
 * refs 
 * 多选引用类型
 * a.使用多选select完成
 * b.使用弹窗的左右栏的办法编辑，并且可以再编辑过程中新增项目
 * 建表时建立额外的关系中间表，并生成额外的内容显示字段（使用;分割各项）用于列表和初始化加载
 * 
 * content 
 * 通过额外字段指定编码类型（html,json,md），可以更换类型或者使用固定类型,替换html类型
 * 
 * 
 */

var controls = {
  text,
  datetime,
  state,
  file,
  memo,
  code,
  integer,
  html,
  refs,
  bool,
  json,
ref} 
for (let i in controls) {
  FormConrol.controls[`field_${i}`] = controls[i]
}

export default FormConrol
