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
  const {loginLoading} = login

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
        <Tabs defaultActiveKey='1' type='line'>
          <TabPane tab='学生' key='1'>
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
              <Button type='primary' size='large' onClick={handleOk} loading={loginLoading}>
                登录
              </Button>

              <div className='login-footer'>
                <Link to={'/register'}>
                  <span>注册账号</span>
                </Link>
                <Link to={'/forget'}>
                  <span className='login-form-forgot'>忘记密码</span>
                </Link>
              </div>

            </Form>
          </TabPane>
          <TabPane tab='校管理员' key='2'>Content of Tab Pane 2</TabPane>
          <TabPane tab='总管理员' key='3'>Content of Tab Pane 3</TabPane>
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
