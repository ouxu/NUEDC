/**
 * Created by out_xu on 17/6/28.
 */
import React from 'react'
import { Form, Input, Radio, Select } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

export default (config, getFieldDecorator) => {
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
    },
  }
  const {rules, formType} = config
  if (formType === 0) {
    return (
      <FormItem
        label={config.label}
        {...formItemLayout}
        hasFeedback={config.hasFeedback || true}
        key={config.value}
      >
        {getFieldDecorator(config.value, {
          rules: [{
            pattern: rules.pattern, message: rules.patternMessage
          }, {
            required: rules.required, message: rules.requiredMessage
          }],
          initialValue: config.initialValue || ''
        })(
          <Input
            className='form-content-input'
            placeholder={config.placeholder || ''}
            disabled={config.disabled || false}
          />,
        )}
      </FormItem>
    )
  } else if (formType === 1) {
    const options = config.options.map(option => (
      <Radio value={option.value} key={option.value}>{option.label}</Radio>
    ))
    return (
      <FormItem
        label={config.label}
        {...formItemLayout}
        key={config.value}
      >
        {getFieldDecorator(config.value, {
          rules: [{required: rules.required, message: rules.requiredMessage}],
        })(
          <RadioGroup>
            {options}
          </RadioGroup>
        )}
      </FormItem>
    )
  } else if (formType === 2) {
    const options = config.options.map(option => (
      <Option value={option.value} key={option.value}>{option.label}</Option>
    ))
    return (
      <FormItem
        label={config.label}
        {...formItemLayout}
        key={config.value}
      >
        {getFieldDecorator(config.value, {
          rules: [{required: rules.required, message: rules.requiredMessage}],
        })(
          <Select >
            {options}
          </Select>
        )}
      </FormItem>
    )
  }
}