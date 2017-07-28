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
      requiredMessage: '请输入您的队伍名称',
      pattern: '',
      patternMessage: '！'
    }
  }, {
    value: 'member1',
    label: '队长姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入队长的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member2',
    label: '成员1',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入成员1的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'member3',
    label: '成员2',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入成员2的姓名',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'teacher',
    label: '指导老师',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入指导教师姓名'
    }
  }, {
    value: 'contact_mobile',
    label: '联系电话',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入队伍队长的手机号',
      pattern: verify.mobile,
      patternMessage: '输入合法的手机！'
    }
  }, {
    value: 'email',
    label: '邮箱',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入队伍队长的邮箱',
      pattern: verify.mail,
      patternMessage: '输入合法的邮箱！'
    }
  }
]
