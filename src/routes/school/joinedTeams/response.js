/**
 * Created by Pororo on 17/7/15.
 */
import { verify } from '../../../utils/index'

export default [
  {
    value: 'team_name',
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
    value: 'school_id',
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
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入学校等级'
    },
    options: [{'label': '一本院校', 'value': '1'}, {'label': '二本院校', 'value': '2'}, {'label': '三本院校', 'value': '3'}]
  }, {
    value: 'contest_id',
    label: '竞赛名称',
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入学校等级'
    },
    options: [{'label': '2017年电子设计大赛3', 'value': '3'}]
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
  }, {
    value: 'contact_mobile'
  }, {
    value: 'email'
  }
]
