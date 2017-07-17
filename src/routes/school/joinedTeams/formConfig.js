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
      pattern: verify.chinese,
      patternMessage: '输入包含非中文字符！'
    }
  }, {
    value: 'school_id',
    label: '学校id',
    formType: 0,
    contentType: 'int',
    rules: {
      required: true,
      requiredMessage: '请输入您的学校id',
      patternMessage: '输入包含非数字字符！'
    }
  }, {
    value: 'school_name',
    label: '学校名称',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的学校名称',
      patternMessage: '输入包含非数字字符！'
    }
  }, {
    value: 'contest_id',
    label: '竞赛id',
    formType: 0,
    contentType: 'int',
    rules: {
      required: true,
      requiredMessage: '请输入竞赛id',
      pattern: '',
      patternMessage: ''
    }
  }, {
    value: 'school_level',
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
      requiredMessage: '请输入成员1',
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
      requiredMessage: '请输入成员2',
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
      requiredMessage: '请输入成员3',
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
      requiredMessage: '请输入指导老师'
    }
  }, {
    value: 'contact_mobile',
    label: '联系电话',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的手机',
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
      requiredMessage: '请输入您的邮箱',
      pattern: verify.mail,
      patternMessage: '输入合法的邮箱！'
    }
  }
]
