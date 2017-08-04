/**
 * Created by Pororo on 17/7/17.
 */
import React from 'react'
import './index.less'
import config from './formConfig'
import { verify } from '../../../utils/index'
import { Button, Col, Form, Input, Row } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item
const SchoolInfoManage = ({app, schoolInfo, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false} = schoolInfo
  const {user} = app
  const formItemLayout = {
    labelCol: {
      xs: {span: 3},
      sm: {span: 3}
    },
    wrapperCol: {
      xs: {span: 21},
      sm: {span: 8}
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
      <Form>
        {
          config.map((item, index) => schoolInfoForm(item.label, user[item.value], index))
        }
        {
          modal ? <div className='school-info-password'>
            <Row className='school-info-form'>
              <Col span={3}>旧密码：</Col>
              <Col xs={{span: 19}} sm={{span: 7}}>
                <FormItem
                  hasFeedback={false}
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
              </Col>

              <Col xs={{offset: 0, span: 3}} sm={{offset: 2, span: 3}}>新密码：</Col>
              <Col xs={{span: 19}} sm={{span: 7}}>
                <FormItem
                  hasFeedback={false}
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
              </Col>
            </Row>
          </div> : <Row className='school-info-item'>
            <Col span={3}>密码：</Col>
            <Col span={5}><span>*******</span></Col>
          </Row>
        }
        {
          modal ? <EditButton />
            : <Button type='primary' className='school-info-button' onClick={changeInfo}>修改密码</Button>
        }
      </Form>
    </div>
  )
}

export default connect(({app, schoolInfo}) => ({app, schoolInfo}))(Form.create()(SchoolInfoManage))
