/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Card, Col, Collapse, Form, Modal, Row, Tag } from 'antd'
import './index.less'
import { connect } from 'dva'
import { color } from '../../../utils'
const {confirm} = Modal
const Panel = Collapse.Panel
const ContestManage = ({studentContest, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, alert,tablePass} = studentContest
  const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
  }

  return (
    <div className='contest'>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header="已报名竞赛" key="1" style={customPanelStyle}>
          <Row type='flex' gutter='12'>
            {tablePass.map(item => {
              let extra
              if (item.can_select_problem === 1) {
                extra = (<Tag color={color.blue}>点击进行选题</Tag>)
              } else if (item.can_select_problem === -1) {
                if (item.problem_start_time > Date.now()) {
                  extra = (<Tag>选题尚未开始</Tag>)
                } else if (item.problem_end_time > Date.now()) {
                  extra = (<Tag color={color.blue}>点击进行选题</Tag>)
                } else {
                  extra = (<Tag disabled>选题已结束</Tag>)
                }
              } else {
                extra = (<Tag disabled>选题已关闭</Tag>)
              }
              return (
                <Col xs={{span: 24}} sm={{span: 8}} xl={{span: 6}} key={item.id} className='contest-item'>
                  <Card
                    title={item.title} extra={item.register_start_time.substring(0, 10)}
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
        <Panel header="全部竞赛" key="2" style={customPanelStyle}>
          <Row type='flex' gutter='12'>
            {table.map(item => {
              let extra
              if (item.can_register === 1) {
                extra = (<Tag color={color.blue}>点击报名本竞赛</Tag>)
              } else if (item.can_register === -1) {
                if (item.register_start_time > Date.now()) {
                  extra = (<Tag>报名尚未开始</Tag>)
                } else if (item.register_end_time > Date.now()) {
                  extra = (<Tag color={color.blue}>点击报名本竞赛</Tag>)
                } else {
                  extra = (<Tag disabled>报名已结束</Tag>)
                }
              } else {
                extra = (<Tag disabled>报名已关闭</Tag>)
              }
              return (
                <Col xs={{span: 24}} sm={{span: 8}} xl={{span: 6}} key={item.id} className='contest-item'>
                  <Card
                    title={item.title} extra={item.register_start_time.substring(0, 10)}
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
        <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
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
