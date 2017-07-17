/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'

const Option = Select.Option
const SchoolResultManage = ({schoolResult, dispatch}) => {
  const {table, modalContent} = schoolResult
  const {contests = []} = modalContent
  const onOptionChange = (value) => {
    dispatch({type: 'schoolResult/onFilter', payload: value})
    dispatch({type: 'schoolResult/filter', payload: value})
  }
  const excelOut = () => {
    dispatch({type: 'schoolResult/ResultOut', payload: 'out'})
  }
  const columns = [
    {title: '竞赛id', dataIndex: 'contest_id', key: 'contest_id', width: 100},
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 300},
    {title: '学校id', dataIndex: 'school_id', key: 'school_id', width: 100},
    {title: '学校名称', dataIndex: 'school_name', key: 'school_name', width: 300},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 100},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 200},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 200},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 200},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 200},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 200},
    {title: '邮箱', dataIndex: 'email', key: 'email', width: 300},
    {title: '所选题目', dataIndex: 'problem_selected', key: 'problem_selected', width: 200},
    {title: '选题时间', dataIndex: 'problem_selected_at', key: 'problem_selected_at', width: 200},
    {title: '奖项确定时间', dataIndex: 'result_at', key: 'result_at', width: 200},
    {title: '现场赛相关信息', dataIndex: 'onsite_info', key: 'onsite_info', width: 300},
    {title: '审查情况', dataIndex: 'result', key: 'result', width: 100, fixed: 'right'},
    {title: '获得奖项', dataIndex: 'result_info', key: 'result_info', width: 100, fixed: 'right'}
  ]
  return (
    <div className='school-result'>
      <div className='school-result-header'>
        <Select
          showSearch
          style={{width: 200}}
          placeholder='竞赛ID'
          onChange={onOptionChange}
        >
          {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.id}</Select.Option>)}
        </Select>
        <Button type='primary' onClick={excelOut}>导出excel</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 2800}}
        pagination={false} rowKey={record => record.id}
      />
    </div>
  )
}

export default connect(({app, schoolResult}) => ({app, schoolResult}))(SchoolResultManage)
