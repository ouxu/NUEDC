/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Select, Table } from 'antd'
import './index.less'

const FormItem = Form.Item
import formConfig from './formConfig'
import { connect } from 'dva'
import FormItemRender from '../../../components/FormItemRender/'

const StudentSignUpManage = ({studentSignUp, dispatch, form: {getFieldDecorator, validateFieldsAndScroll, fieldsValue}}) => {
  const {table = []} = studentSignUp
  console.log(studentSignUp)
  const onSubmitClick = e => {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      values.schoolName = formConfig[4].options[values.schoolId - 1].label
      console.log(values)
      dispatch({type: 'studentSignUp/signUpContest', payload: values})
    })
    console.log('yes')
  }
  return (
    <div className='problem'>
      <Form className='form-content'>
        {formConfig.map(config => FormItemRender(config, getFieldDecorator))}
        <FormItem>
          <Button type="primary" className="student-submit-button" onClick={onSubmitClick}>提交</Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default connect(({app, studentSignUp}) => ({app, studentSignUp}))(Form.create()(StudentSignUpManage))
