/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'

const Option = Select.Option
const SchoolResultManage = ({joinedTeams, dispatch}) => {
  const columns = [
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'name', key: 'name', width: 280},
    {title: '队伍信息', dataIndex: 'info', key: 'info', width: 350},
    {title: '获奖审核状态', dataIndex: 'status', key: 'status', width: 150},
    {title: '结果', dataIndex: 'result', key: 'result', width: 150},
    {title: '审核时间', dataIndex: 'audit_time', key: 'audit_time', width: 250}
  ]

  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      info: `信息${i}`,
      name: `电子设计竞赛 ${i}`,
      status: '未开始',
      result: '一等',
      audit_time: '2017-3-5'
    })
  }
  return (
    <div className='school-result'>
      <div className='school-result-header'>
        <Select
          showSearch
          style={{width: 200}}
          placeholder='选择比赛年份'
          defaultValue='2017'
        >
          <Option value='2017'>2017届河北省决赛</Option>
        </Select>
        <Button type='primary'>导出excel</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={data} scroll={{x: 1200}}
        pagination={false} rowKey={record => record.id}
      />
    </div>
  )
}

export default connect(({app, schoolResult}) => ({app, schoolResult}))(SchoolResultManage)
