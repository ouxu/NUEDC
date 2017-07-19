/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Form, Modal, Select, Table } from 'antd'
import formConfig from '../signup/formConfig'
import './index.less'

const FormItem = Form.Item
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'
// 这一部分代码有毒。
const schoolId = {
  value: 'schoolId',
  res: 'school_name',
  label: '学校名称',
  formType: 2,
  contentType: 'string',
  rules: {
    required: true,
    requiredMessage: '请选择您所在的学校'
  },
  options: []
}
const contestID = {
  value: 'contestId',
  res: 'contest_id',
  label: '竞赛名称',
  formType: 2,
  contentType: 'string',
  rules: {
    required: true,
    requiredMessage: '请输入竞赛名称'
  },
  options: []

}
const StudentSignUpManage = ({studentSignUp, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {contest = [], info = {}, schools = []} = studentSignUp
  // const onOptionChange = (value) => {
  //   dispatch({type: 'studentSignUp/onFilter', payload: value})
  //   dispatch({type: 'studentSignUp/filter', payload: value})
  // }
  const onSubmitClick = e => {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      // values.schoolName = schoolId.options[values.schoolId - 1].label
      const schoolsObj = schoolOptions.filter(config => {
        return config.value === values.schoolId
      })
      console.log(schoolsObj)
      values.schoolName = schoolsObj[0].label
      values.schoolLevel = schoolsObj[0].level
      dispatch({type: 'studentSignUp/signUpContest', payload: values})
    })
  }
  const schoolOptions = schools.map(config => {
    return {
      value: config.id,
      label: config.name,
      level: config.level
    }
  })
  const contestOptions = contest.map(config => {
    return {
      value: config.id,
      label: config.title
    }
  })
  return (
    <div className='sign-up'>
      {/*<div className='sign-up-header'>*/}
      {/*<Select*/}
      {/*showSearch*/}
      {/*style={{width: 300}}*/}
      {/*placeholder='竞赛名称'*/}
      {/*onChange={onOptionChange}*/}
      {/*>*/}
      {/*{contest.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.title}</Select.Option>)}*/}
      {/*</Select>*/}
      {/*</div>*/}
      <Form className='form-content'>
        {[{
          ...contestID,
          options: contestOptions
        }, {
          ...schoolId,
          options: schoolOptions
        }, ...formConfig].map(config => FormItemRender({
          disabled: info.status === '已审核',
          ...config
        }, getFieldDecorator, {initialValue: info[config.res]}))}
        <FormItem style={{textAlign: 'center'}}>
          <Button type="primary" className="student-submit-button" disabled={info.status === '已审核'}
                  onClick={onSubmitClick}>{info.id ? '编辑' : '提交'}</Button>
        </FormItem>
      </Form>
    </div>
  )
}

export default connect(({app, studentSignUp}) => ({app, studentSignUp}))(Form.create()(StudentSignUpManage))
