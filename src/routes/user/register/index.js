/**
 * Created by out_xu on 17/7/16.
 */
import React from 'react'
import { connect } from 'dva'
import CountUp from 'react-countup'
import { Button, Col, Form, Input, Row } from 'antd'
import { config } from '../../../utils'
import './index.less'
import FormItemRender from '../../../components/FormItemRender'
import formConfig from './formConfig'

const FormItem = Form.Item

const Register = ({login, dispatch, form: {getFieldDecorator, getFieldValue, validateFieldsAndScroll}}) => {
  const {counter, loginLoading} = login
  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'login/register', payload: values})
    })
  }

  const counterStart = (e) => {
    e.preventDefault()
    const data = {
      mobile: getFieldValue('mobile')
    }
    dispatch({type: 'login/getCode', payload: data})
    dispatch({type: 'login/counterStart'})
    setTimeout(() => {
      dispatch({type: 'login/counterReset'})
    }, 60000)
  }
  const extra = {
    formItemLayout: {
      labelCol: {span: 24},
      wrapperCol: {span: 24}
    }
  }

  return (
    <div className='register-wrapper'>
      <div className='form'>
        <div className='login-title'>
          <span>{config.name} · 注册账户</span>
        </div>

        <Form>
          {formConfig.map(config => FormItemRender(config, getFieldDecorator, extra))}
          <FormItem
            label='验证码'
          >
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('code', {
                  rules: [{required: true, message: '请输入你获取到的验证码'}]
                })(
                  <Input size='large' />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size='large' disabled={counter}
                  onClick={counterStart}>
                  {counter ? (
                    <CountUp
                      start={60}
                      end={0}
                      useEasing={false}
                      duration={60}
                    />
                  ) : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <Button type='primary' size='large' onClick={handleOk} loading={loginLoading}>
            注册
          </Button>

        </Form>
      </div>
    </div>
  )
}

export default connect(({login}) => ({login}))(Form.create()(Register))
