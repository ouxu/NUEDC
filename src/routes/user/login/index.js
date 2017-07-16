import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Icon, Input, Tabs } from 'antd'
import { config, verify } from '../../../utils/'
import { Link } from 'dva/router'
import './index.less'

const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Login = ({login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {loading} = login

  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'login/login', payload: values})
    })
  }

  return (
    <div className='login-wrapper'>
      <div className='form'>
        <div className='login-title'>
          <span>{config.name}</span>
        </div>
        <Tabs defaultActiveKey='student' onChange={(value) => dispatch({type: 'login/roleChange', payload: value})}>
          <TabPane tab='学生' key='student'>
            <Form>
              <FormItem hasFeedback>
                {getFieldDecorator('identifier', {
                  rules: [{
                    pattern: verify.mobile, message: '请输入有效的手机号'
                  }, {
                    required: true, message: '请输入手机号'
                  }]
                })(
                  <Input addonBefore={<Icon type='user' />} placeholder='手机号' />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{
                    pattern: verify.password, message: '请输入有效的密码（6-18位）'
                  }, {
                    required: true, message: '请输入密码！'
                  }]
                })(
                  <Input addonBefore={<Icon type='lock' />} type='password' onPressEnter={handleOk} placeholder='密码' />
                )}
              </FormItem>
              <Button type='primary' size='large' onClick={handleOk} loading={loading}>
                登录
              </Button>

            </Form>
            <div className='login-footer'>
              <Link to={'/register'}>
                <span>注册账号</span>
              </Link>
              <Link to={'/forget'}>
                <span className='login-form-forgot'>忘记密码</span>
              </Link>
            </div>
          </TabPane>
          <TabPane tab='校管理员' key='school'>
            <Form>
              <FormItem hasFeedback>
                {getFieldDecorator('identifier', {
                  rules: [{
                    required: true, message: '请输入用户名'
                  }]
                })(
                  <Input addonBefore={<Icon type='user' />} placeholder='用户名' />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{
                    pattern: verify.password, message: '请输入有效的密码（6-18位）'
                  }, {
                    required: true, message: '请输入密码！'
                  }]
                })(
                  <Input addonBefore={<Icon type='lock' />} type='password' onPressEnter={handleOk} placeholder='密码' />
                )}
              </FormItem>
              <Button type='primary' size='large' onClick={handleOk} loading={loading}>
                登录
              </Button>
              <div className='login-footer'>
                <span />
                <Link to='/forget'>
                  <span className='login-form-forgot'>忘记密码</span>
                </Link>
              </div>
            </Form>
          </TabPane>
          <TabPane tab='总管理员' key='admin'>
            <Form>
              <FormItem hasFeedback>
                {getFieldDecorator('identifier', {
                  rules: [{
                    required: true, message: '请输入用户名'
                  }]
                })(
                  <Input addonBefore={<Icon type='user' />} placeholder='用户名' />
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [{
                    pattern: verify.password, message: '请输入有效的密码（6-18位）'
                  }, {
                    required: true, message: '请输入密码！'
                  }]
                })(
                  <Input addonBefore={<Icon type='lock' />} type='password' onPressEnter={handleOk} placeholder='密码' />
                )}
              </FormItem>
              <Button type='primary' size='large' onClick={handleOk} loading={loading}>
                登录
              </Button>
              <div className='login-footer'>
                <span />
                <Link to='/forget'>
                  <span className='login-form-forgot'>忘记密码</span>
                </Link>
              </div>
            </Form>
          </TabPane>
        </Tabs>

      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({login}) => ({login}))(Form.create()(Login))
