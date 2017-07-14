import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Input, Row } from 'antd'
import { config } from '../../utils'
import './index.less'

const FormItem = Form.Item

const Login = ({login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const { loginLoading } = login
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className='login-wrapper'>
      <div className='form'>
        <div className='login-title'>
          <span>{config.name}</span>
        </div>
        <Form>
          <FormItem hasFeedback>
            {getFieldDecorator('identifier', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input size='large' onPressEnter={handleOk} placeholder='Username' />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='Password' />)}
          </FormItem>
          <Row>
            <Button type='primary' size='large' onClick={handleOk} loading={loginLoading}>
              登录
            </Button>
            <p>
              <span>Username：guest</span>
              <span>Password：guest</span>
            </p>
          </Row>

        </Form>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
