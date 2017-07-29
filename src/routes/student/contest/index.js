/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Card, Col, Collapse, Form, Row, Tag } from 'antd'
import { routerRedux } from 'dva/router'
import './index.less'
import { connect } from 'dva'
import { color, newDate, urlEncode } from '../../../utils'

const Panel = Collapse.Panel
const ContestManage = ({studentContest, dispatch}) => {
  const {modal = false, modalContent = {}, table, alert, tableSignUp = []} = studentContest
  const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0
  }
  const SignUpContest = (item) => {
    const {id: contest_id, title} = item
    dispatch(routerRedux.push(`/student/signup?` + urlEncode({contest_id, title})))
  }
  const selectProblem = (item) => {
    const {id: contest_id} = item
    dispatch(routerRedux.push(`/student/problem?` + urlEncode({contest_id})))
  }
  return (
    <div className='contest'>
      <Collapse bordered={false} defaultActiveKey={['signUp', 'canRegister']}>
        <Panel header='可报名竞赛' key='canRegister' style={customPanelStyle}>
          <Row type='flex' gutter={12}>
            {table.map(item => {
              let extra
              if (item.can_register === 1) {
                extra = (<Tag color={color.blue} onClick={() => SignUpContest(item)}>点击报名本竞赛</Tag>)
              } else if (item.can_register === -1) {
                if (newDate(item.register_start_time) > Date.now()) {
                  extra = (<Tag>报名尚未开始</Tag>)
                } else if (newDate(item.register_end_time) > Date.now()) {
                  extra = (<Tag color={color.blue} onClick={() => SignUpContest(item)}>点击报名本竞赛</Tag>)
                } else {
                  extra = (<Tag disabled>报名已结束</Tag>)
                }
              } else {
                extra = (<Tag disabled>报名已关闭</Tag>)
              }
              return (
                <Col xs={{span: 24}} sm={{span: 8}} xl={{span: 6}} key={'can-register-' + item.id}
                  className='contest-item'>
                  <Card
                    title={<div className='contest-card-title'>{item.title}</div>}
                    extra={item.register_start_time.substring(0, 10)}
                    bodyStyle={{padding: '20px 0 20px 20px'}}>
                    <div className='contest-item-content'>
                      <p>{item.description}</p>
                    </div>
                    <div className='contest-item-footer'>
                      {extra}
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Panel>
        <Panel header='已报名竞赛' key='signUp' style={customPanelStyle}>
          <Row type='flex' gutter={12}>
            {tableSignUp.map(item => {
              let extra
              if (item.signUpStatus === '未审核') {
                extra = (<Tag color={color.red}>等待学校管理员审核中</Tag>)
              }
              else if (item.can_select_problem === 1) {
                extra = (<Tag color={color.blue} onClick={() => selectProblem(item)}>点击进行选题</Tag>)
              } else if (item.can_select_problem === -1) {
                if (newDate(item.problem_start_time) > Date.now()) {
                  extra = (<Tag>选题尚未开始</Tag>)
                } else if (newDate(item.problem_end_time) > Date.now()) {
                  extra = (<Tag color={color.blue} onClick={() => selectProblem(item)}>点击进行选题</Tag>)
                } else {
                  extra = (<Tag disabled>选题已结束</Tag>)
                }
              } else {
                extra = (<Tag disabled>选题已关闭</Tag>)
              }
              return (
                <Col xs={{span: 24}} sm={{span: 8}} xl={{span: 6}} key={'sign-up-' + item.id} className='contest-item'>
                  <Card
                    title={<div className='contest-card-title'>{item.title}</div>}
                    extra={item.register_start_time.substring(0, 10)}
                    bodyStyle={{padding: '20px 0 20px 20px'}}>
                    <div className='contest-item-content'>
                      <p>{item.description}</p>
                    </div>
                    <div className='contest-item-footer'>
                      {extra}
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Panel>

      </Collapse>
    </div>
  )
}

export default connect(({app, loading, studentContest}) => ({
  app,
  loading,
  studentContest
}))(Form.create()(ContestManage))
