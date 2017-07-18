/**
 * Created by out_xu on 17/6/28.
 */

import { verify } from '../../../utils'

const createConfig = [
  {
    value: 'school_id',
    label: '学校 ID',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入学校ID'
    },
    hasFeedback: false
  }
]
const editConfig = [
  {
    value: 'name',
    label: '用户名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入您的用户昵称',
      pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
      patternMessage: '2-20位英文字母、汉字、数字'
    }
  }, {
    value: 'email',
    label: '邮箱',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入邮箱',
      pattern: verify.mail,
      patternMessage: '请输入合法的邮箱'
    },
    hasFeedback: false
  }, {
    value: 'mobile',
    label: '手机号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入您的手机',
      pattern: verify.mobile,
      patternMessage: '输入合法的手机号码'
    }
  }, {
    value: 'password',
    label: '密码',
    formType: 0,
    type: 'password',
    extra: '输入后表示重置密码，如不需重置请忽略此项',
    contentType: 'string',
    rules: {
      required: false,
      requiredMessage: '请输入您的密码',
      pattern: verify.password,
      patternMessage: '6-18位数字、英文字母或者下划线'
    }
  }, {
    value: 'sex',
    label: '性别',
    formType: 1,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择性别'
    },
    options: [{'label': '男', 'value': '男'}, {'label': '女', 'value': '女'}]
  }, {
    value: 'status',
    label: '用户状态',
    formType: 1,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择用户状态'
    },
    options: [{'label': '未激活', 'value': '0'}, {'label': '已激活', 'value': '1'}]
  }
]

export { createConfig, editConfig }
