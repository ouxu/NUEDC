/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Select,Table } from 'antd'
import './index.less'
import { connect } from 'dva'
import DropOption from '../../../components/DropOption/'

const StudentProblemManage = ({app, contest, problem}) => {
  const {table = []} = contest

  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '题目名称', dataIndex: 'title', key: 'title', width: 250},
    {title: '题目状态', dataIndex: 'status', key: 'status', width: 100},
    {title: '选题时间', dataIndex: 'problem_start_time', key: 'problem_start_time', width: 150},
    {title: '说明', dataIndex: 'problem_start_time', key: 'problem_end_time'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{key: 'view', name: '查看'}, {key: 'download', name: '下载'}]}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 100,
      key: '9'
    }
  ]

  return (
    <div className='problem'>
      <div className='problem-header'>
        {/*<Select*/}
          {/*showSearch*/}
          {/*style={{width: 300}}*/}
          {/*placeholder='选择年份'*/}
          {/*// defaultValue={'' + table[0].id}*/}
        {/*>*/}
          {/*{table.map(item => <Select.Option key={'' + item} value={'' + item.id}>{item.title}</Select.Option>)}*/}
        {/*</Select>*/}
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1500}}
        pagination={false} rowKey={record => record.id}
        expandedRowRender={record => (
          <div className='expanded-row'>
            <span>{record.description}</span>
            <span>{record.description}</span>
          </div>
        )}
      />
    </div>
  )
}

export default connect(({app, contest, problem}) => ({app, contest, problem}))(Form.create()(StudentProblemManage))
