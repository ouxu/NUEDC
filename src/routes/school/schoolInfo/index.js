/**
 * Created by Pororo on 17/7/17.
 */
import React from 'react'
import './index.less'
import config from './formConfig.json'
import { Form, Input, Button } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item
const SchoolInfoManage = ({schoolInfo, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false} = schoolInfo
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 4, offset: 5}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 6}
    }
  }
  const InputInfo = () => {
    return (
      modal ? <Input
        className='school-info-input'
        placeholder={config.placeholder || ''}
        disabled={config.disabled || false}
        type={config.type || 'input'}
        defaultValue='队伍信息'
      /> : <span className='school-info-span'>队伍信息</span>
    )
  }
  const EditButton = () => {
    return (
      <div>
        <Button className='school-info-button' onClick={cancelInfo}>取消</Button>
        <Button className='school-info-button' onClick={saveInfo}>保存信息</Button>
      </div>
    )
  }
  const changeInfo = () => {
    dispatch({type: 'schoolInfo/showModal', payload: true})
  }
  const cancelInfo = () => {
    dispatch({type: 'schoolInfo/hideModal'})
  }
  const saveInfo = () => {
    dispatch({type: 'schoolInfo/hideModal'})
  }
  const {rules, initialValue} = config
  return (
    <div className='school-info-wrapper'>
      <Form>
        <FormItem
          label={config.label}
          {...formItemLayout}
          hasFeedback={config.hasFeedback || false}
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
            <InputInfo />
          )}
        </FormItem>
        {
          modal ? <EditButton /> : <Button className='school-info-button' onClick={changeInfo}>修改信息</Button>
        }
      </Form>
    </div>
  )
}

export default connect(({app, schoolInfo}) => ({app, schoolInfo}))(Form.create()(SchoolInfoManage))
