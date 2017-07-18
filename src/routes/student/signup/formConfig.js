/**
 * Created by Pororo on 17/7/15.
 */
import { verify } from '../../../utils/index'

export default [
  {
    value: 'teamName',
    label: '队伍名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入队伍名称',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'schoolId',
    label: '学校名称',
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择您所在的学校'
    },
    options: [{'label': '东北大学秦皇岛分校', 'value': '1'}, {'label': '燕山大学', 'value': '2'}]
  }, {
    value: 'schoolLevel',
    label: '学校等级',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入学校等级',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member1',
    label: '成员1',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队友的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member2',
    label: '成员2',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队友的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member3',
    label: '成员3',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的队友的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'teacher',
    label: '指导教师姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入指导教师姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'mobile',
    label: '队长手机号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您队伍队长的QQ号',
      pattern: verify.mobile,
      patternMessage: '输入合法的QQ号！'
    }
  }, {
    value: 'email',
    label: '队长邮箱',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您队伍队长的邮箱',
      pattern: verify.email,
      patternMessage: '输入合法的邮箱！'
    }
  }
]
