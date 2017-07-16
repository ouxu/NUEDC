/**
 * Created by out_xu on 17/6/28.
 */
import React from 'react'
import { Form, Input, Radio, Select } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

export default (config, getFieldDecorator, extra = {}) => {
  const {
    formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
      }
    },
    initialValue
  } = extra
  const {rules, formType} = config
  let options = []
  switch (formType) {
    case 0:
      return (
        <FormItem
          label={config.label}
          {...formItemLayout}
          hasFeedback={config.hasFeedback || true}
          key={config.value}
        >
          {getFieldDecorator(config.value, {
            rules: [{
              pattern: rules.pattern || false, message: rules.patternMessage || ''
            }, {
              required: rules.required || false, message: rules.requiredMessage || ''
            }],
            initialValue: initialValue || ''
          })(
            <Input
              className='form-content-input'
              placeholder={config.placeholder || ''}
              disabled={config.disabled || false}
            />
          )}
        </FormItem>
      )
    case 1:
      options = config.options.map(option => (
        <Radio value={option.value} key={option.value}>{option.label}</Radio>
      ))
      return (
        <FormItem
          label={config.label}
          {...formItemLayout}
          key={config.value}
        >
          {getFieldDecorator(config.value, {
            rules: [{required: rules.required || false, message: rules.requiredMessage || ''}],
            initialValue: initialValue || ''
          })(
            <RadioGroup>
              {options}
            </RadioGroup>
          )}
        </FormItem>
      )
    case 2:
      options = config.options.map(option => (
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
            initialValue: initialValue || ''
          })(
            <Select >
              {options}
            </Select>
          )}
        </FormItem>
      )
  }
}
