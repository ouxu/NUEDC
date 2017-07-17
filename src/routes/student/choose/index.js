/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Select, Table, Modal, Input } from 'antd'
import './index.less'
import DropOption from '../../../components/DropOption/'
import formConfig from './formConfig'
import { connect } from 'dva'

const confirm = Modal.confirm
const ChooseProblemManage = ({chooseProblem, dispatch}) => {
  const {table} = chooseProblem
  console.log(chooseProblem)
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'choose':
        dispatch({type: 'chooseProblem/choose', payload: 'choose'})
        break
      case 'reset':
        confirm({
          title: '重选确认',
          content: (
            <Input
              type='password' placeholder='请输入你的密码'
              onChange={(e) => dispatch({type: 'chooseProblem/onInputChange', payload: e.target.value})}
            />
          ),
          onOk () { dispatch({type: 'chooseProblem/reset', payload: record}) },
          onCancel () {}
        })
        break
      default:
        break
    }
  }
  const onOptionChange = (value) => {
    dispatch({type: 'chooseProblem/onFilter', payload: value})
    dispatch({type: 'chooseProblem/filter', payload: value})
  }
  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '题目名称', dataIndex: 'name', key: 'name', width: 150},
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
      // fixed: 'right',
      width: 25,
      key: '9'
    }
  ]

  return (
    <div className='problem'>
      {/*<div className='problem-header'>*/}
        {/*<Select*/}
          {/*showSearch*/}
          {/*style={{width: 300}}*/}
          {/*placeholder='选择年份'*/}
          {/*onChange={onOptionChange}*/}
          {/*defaultVall="all"*/}
        {/*>*/}
          {/*<Select.Option value='all'>ALL</Select.Option>*/}
          {/*{table.map(item => <Select.Option key={'' + item} value={'' + item.id}>{item.title}</Select.Option>)}*/}
        {/*</Select>*/}
      {/*</div>*/}
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1500}}
        pagination={false} rowKey={record => record.id}
      />
    </div>
  )
}

export default connect(({app, chooseProblem}) => ({app, chooseProblem}))(Form.create()(ChooseProblemManage))
