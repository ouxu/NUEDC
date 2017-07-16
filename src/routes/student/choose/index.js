/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Select,Table } from 'antd'
import './index.less'
import { connect } from 'dva'
import DropOption from '../../../components/DropOption/'

const ChooseProblemManage = ({app, contest, problem}) => {
  const {table = []} = contest

  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '题目名称', dataIndex: 'title', key: 'title', width: 250},
    {title: '题目状态', dataIndex: 'status', key: 'status', width: 100},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{key: 'choose', name: '选择'}, {key: 'reset', name: '重选'}]}
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

export default connect(({app, contest, problem}) => ({app, contest, problem}))(Form.create()(ChooseProblemManage))
