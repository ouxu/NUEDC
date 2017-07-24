/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Form, Modal, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'

const StudentScoreManage = ({ studentScore, dispatch, }) => {
  const {table, contest = []} = studentScore
  const onOptionChange = (value) => {
    dispatch({type: 'studentScore/onFilter', payload: value})
    dispatch({type: 'studentScore/filter', payload: value})
  }
  const columns = [
    {title: '竞赛名称', dataIndex: 'contestTitle', key: 'contestTitle', width: 250},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 250},
    {title: '竞赛结果', dataIndex: 'result', key: 'result', width: 100},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 170},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 100},
    {title: '审核状态', dataIndex: 'status', key: 'status', width: 100, fixed: 'right'}
  ]
  return (
    <div className='student-score'>
      <div className='student-score-header'>
        <div className='student-score-select'>
          <Select
            showSearch
            style={{width: 300, marginRight: 10}}
            placeholder='竞赛名称'
            onChange={onOptionChange}
          >
            {contest.map(item => (
              <Select.Option key={'' + item.id} value={'' + item.id}>
                {item.title}
                </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1600}}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default connect(({app, studentScore}) => ({app, studentScore}))(Form.create()(StudentScoreManage))
