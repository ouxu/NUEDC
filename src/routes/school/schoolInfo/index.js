/**
 * Created by Pororo on 17/7/17.
 */
import React from 'react'
import './index.less'
import config from './formConfig'
import { verify } from '../../../utils/index'
import { Form, Input, Button, Col, Row, Card } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item
const SchoolInfoManage = ({app, schoolInfo, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false} = schoolInfo
  const {user} = app
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 2}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 6, offset: 1}
    }
  }
  const EditButton = () => {
    return (
      <div>
        <Button className='school-info-button' onClick={cancelInfo}>取消</Button>
        <Button type='primary' className='school-info-button' onClick={saveInfo}>确认修改密码</Button>
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
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const {newPassword, oldPassword} = values
        const body = {
          newPassword: newPassword,
          oldPassword: oldPassword
        }
        dispatch({type: 'schoolInfo/changePassword', payload: body})
        dispatch({type: 'schoolInfo/hideModal'})
      }
    })
  }
  const schoolInfoForm = (name, value, index) => {
    return (
      <Row className='school-info-item' key={index}>
        <Col span={3}>{name}：</Col>
        <Col span={5}><span>{value}</span></Col>
      </Row>
    )
  }
  return (
    <div className='school-info-wrapper'>
      <Card>
        <Form>
          {
            config.map((item, index) => schoolInfoForm(item.label, user[item.value], index))
          }
          {
            modal ? <div className='school-info-password'>
              <FormItem
                label='旧密码'
                {...formItemLayout}
                hasFeedback={false}
                key='旧密码'
              >
                {getFieldDecorator('oldPassword', {
                  rules: [{
                    pattern: verify.password, message: '密码不少于六位'
                  }, {
                    required: true, message: '请输入旧密码'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label='新密码'
                {...formItemLayout}
                hasFeedback={false}
                key='新密码'
              >
                {getFieldDecorator('newPassword', {
                  rules: [{
                    pattern: verify.password, message: '密码不少于六位'
                  }, {
                    required: true, message: '请输入新密码'
                  }]
                })(
                  <Input />
                )}
              </FormItem>
            </div> : <Row className='school-info-item'>
              <Col span={3}>密码：</Col>
              <Col span={5}><span>*******</span></Col>
            </Row>
          }
          {
            modal ? <EditButton /> :
              <Button type='primary' className='school-info-button' onClick={changeInfo}>修改密码</Button>
          }
        </Form>
      </Card>
    </div>
  )
}

export default connect(({app, schoolInfo}) => ({app, schoolInfo}))(Form.create()(SchoolInfoManage))
