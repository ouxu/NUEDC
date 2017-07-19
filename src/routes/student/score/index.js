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
    // dispatch({type: 'studentScore/onFilter', payload: value})
    dispatch({type: 'studentScore/getAllPassContest', payload: value})
  }
  const columns = [
    {title: '竞赛id', dataIndex: 'contest_id', key: 'contest_id', width: 100},
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 300},
    {title: '学校id', dataIndex: 'school_id', key: 'school_id', width: 100},
    {title: '学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 100},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 200},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 200},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 200},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 200},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 200},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 300},
    {title: '参赛状态', dataIndex: 'status', key: 'status', width: 150, fixed: 'right'}
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
            {contest.map(item => <Select.Option key={'' + item.id}
                                                value={'' + item.id}>{item.title}</Select.Option>)}
          </Select>
        </div>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 2000}}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default connect(({app, studentScore}) => ({app, studentScore}))(Form.create()(StudentScoreManage))
