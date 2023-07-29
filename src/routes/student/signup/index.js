/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Col, Form, Row } from 'antd'
import { userConfig } from './formConfig'
import './index.less'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'
const FormItem = Form.Item

const StudentSignUpManage = ({location, studentContest, app, login, studentSignUp, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  let {user} = app
  const {table: schools} = login
  const {contest = [], info = {}} = studentSignUp
  const {query} = location
  const {tableSignUp} = studentContest
  if (query.signed && tableSignUp.length) {
    const signUpArr = tableSignUp.map(item => item.id)
    const index = signUpArr.indexOf(+query.contest_id)
    const record = tableSignUp[index];
    console.log(tableSignUp[index])
    user = {
      ...user,
      ...record,
      teamName: record.team_name,
      name: record.member1,
      member1Major: record.member1_major,
      member1Year: record.member1_year,
      member2Major: record.member2_major,
      member2Year: record.member2_year,
      member3Major: record.member3_major,
      member3Year: record.member3_year,
    }
  } else {
    user.name = ""
  }
  const onSubmitClick = e => {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {email, member2, member3, name, mobile, schoolId, teacher, teamName} = values
      const {member1Major, member1Year, member2Major, member2Year, member3Major, member3Year} = values
      let schoolName = '', schoolLevel = ''
      schools.forEach(item => {
        if (item.id === +schoolId) {
          schoolName = item.name
          schoolLevel = item.level
        }
      })
      const body = {
        email,
        member2,
        member3,
        mobile,
        teamName,
        member1: name,
        contestId: query.contest_id,
        teacher,
        schoolId,
        schoolName,
        schoolLevel,
        member1Major, member1Year, member2Major, member2Year, member3Major, member3Year
      }
      dispatch({type: 'studentSignUp/signUpContest', payload: body})
    })
  }
  const schoolOptions = schools.map(config => {
    return {
      value: config.id + '',
      label: config.name,
      level: config.level
    }
  })
  return (
    <div className='sign-up'>
      <Form className='form-content'>
        <Row className='sign-up-header'>
          <Col offset={6}>
            <h2>{query.signed ? '修改：' : '报名：'}{query.title}</h2>
          </Col>
        </Row>
        {
          FormItemRender({
            value: 'schoolId',
            label: '学校',
            formType: 2,
            contentType: 'string',
            rules: {
              required: true,
              requiredMessage: '请选择您所在的学校'
            },
            options: schoolOptions,
            disabled: true
          }, getFieldDecorator, {initialValue: user['school_id'] + ''})
        }
        {userConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: user[config.value]}))}
        <FormItem>
          <Row>
            <Col offset={6}>
              <Button
                type='primary' className='student-submit-button'
                onClick={onSubmitClick}>{query.signed ? '修改' : '报名'}</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
  )
}

export default connect(({app, login, studentSignUp, studentContest}) => ({
  app,
  login,
  studentSignUp,
  studentContest
}))(Form.create()(StudentSignUpManage))
