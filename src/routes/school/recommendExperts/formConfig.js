import { verify } from '../../../utils'

export default [
  {
    value: 'major',
    label: '专业',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入专业',
      pattern: '',
      patternMessage: ''
    },
    initialValue: '计算机科学与技术',
    hasFeedback: false
  }, {
    value: 'position',
    label: '职位',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的职位'
    }
  }, {
    value: 'title_of_professor',
    label: '职位',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的职位'
    }
  }, {
    value: 'name',
    label: '姓名',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的姓名',
      pattern: verify.chinese,
      patternMessage: '输入包含非中文字符！'
    }
  }, {
    value: 'mobile',
    label: '手机号',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的手机',
      pattern: verify.mobile,
      patternMessage: '输入合法的手机！'
    }
  }, {
    value: 'telephone',
    label: '办公电话',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入您的办公电话',
      pattern: verify.mobile,
      patternMessage: '输入合法的办公电话！'
    }
  }, {
    value: 'school',
    label: '学校',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择学校'
    }
  }, {
    value: 'notes',
    label: '备注',
    formType: 0,
    contentType: 'string',
    rules: {
      required: false
    },
    hasFeedback: false
  }
]
