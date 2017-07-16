/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'

const Option = Select.Option
const SchoolResultManage = ({schoolResult, dispatch}) => {
  const {table} = schoolResult
  const onOptionChange = (value) => {
    dispatch({type: 'schoolResult/onFilter', payload: value})
    dispatch({type: 'schoolResult/filter', payload: value})
  }
  const excelOut = () => {
    dispatch({type: 'schoolResult/ResultOut', payload: 'out'})
  }
  const columns = [
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'name', key: 'name', width: 280},
    {title: '队伍信息', dataIndex: 'info', key: 'info', width: 350},
    {title: '获奖审核状态', dataIndex: 'status', key: 'status', width: 150},
    {title: '结果', dataIndex: 'result', key: 'result', width: 150},
    {title: '审核时间', dataIndex: 'audit_time', key: 'audit_time', width: 250}
  ]
  return (
    <div className='school-result'>
      <div className='school-result-header'>
        <Select
          showSearch
          style={{width: 200}}
          placeholder='选择比赛年份'
          onChange={onOptionChange}
        >
          {table.map(item => <Select.Option key={'' + item} value={'' + item.time}>{item.time}</Select.Option>)}
        </Select>
        <Button type='primary' onClick={excelOut}>导出excel</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1200}}
        pagination={false} rowKey={record => record.id}
      />
    </div>
  )
}

export default connect(({app, schoolResult}) => ({app, schoolResult}))(SchoolResultManage)
