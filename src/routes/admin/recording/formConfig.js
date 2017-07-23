/**
 * Created by Pororo on 17/7/15.
 */

export default [
  {
    value: 'id',
    label: '队伍id',
    formType: 0,
    contentType: 'string',
    disabled: true,
    rules: {
      required: true,
      requiredMessage: '',
      pattern: '',
      patternMessage: ''
    }
  },
  {
    value: 'result',
    label: '比赛结果',
    formType: 0,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请输入比赛结果'
    }
  }, {
    value: 'result_info',
    label: '审核状态',
    formType: 2,
    contentType: 'string',
    rules: {
      required: true,
      requiredMessage: '请选择审核状态'
    },
    options: [{
      value: '待审核',
      label: '待审核'
    }, {
      value: '已审核',
      label: '已审核'
    }]
  }
]
