/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Select } from 'antd'
import './index.less'
import { connect } from 'dva'
import DropOption from '../../../components/DropOption/'
import ProblemItem from './ProblemItem'
const ProblemManage = ({app, contest, problem}) => {
  const {table = []} = contest

  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '赛事名称', dataIndex: 'title', key: 'title', width: 250},
    {title: '赛事状态', dataIndex: 'status', key: 'status', width: 100},
    {title: '报名', dataIndex: 'can_register', key: 'can_register', width: 50},
    {title: '选题', dataIndex: 'can_select_problem', key: 'can_select_problem', width: 50},
    {title: '报名开始时间', dataIndex: 'register_start_time', key: 'register_start_time', width: 150},
    {title: '报名结束时间', dataIndex: 'register_start_time', key: 'register_end_time', width: 150},
    {title: '选题时间', dataIndex: 'problem_start_time', key: 'problem_start_time', width: 150},
    {title: '附加', dataIndex: 'problem_start_time', key: 'problem_end_time'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{key: 'edit', name: '编辑'}, {key: 'delete', name: '删除'}]}
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
        <Select
          showSearch
          style={{width: 300}}
          placeholder='选择年份'
          defaultValue={table[0] ? table[0].id + '' : ''}
        >
          {table.map(item => <Select.Option key={'' + item} value={item.id + '' || ''}>{item.title}</Select.Option>)}
        </Select>
        <Button type='primary'>编辑题目</Button>
      </div>
      <ProblemItem />
    </div>
  )
}

export default connect(({app, contest, problem}) => ({app, contest, problem}))(Form.create()(ProblemManage))
