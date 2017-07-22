/**
 * Created by Pororo on 17/7/15.
 */
import { verify } from '../../../utils/index'

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
      requiredMessage: '请输入您的队伍名称',
      pattern: verify.chinese,
      patternMessage: '输入包含非中文字符！'
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
