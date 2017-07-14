/**
 * Created by out_xu on 17/7/13.
 */
import React, { Component } from 'react'
import { Select, Table, Button } from 'antd'
import { connect } from 'dva'

import './index.less'
import DropOption from '../../../components/DropOption/'

const Option = Select.Option

@connect(({app}) => ({app}))
class CompetitionManage extends Component {
  onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        this.props.dispatch({type: 'competition/edit', payload: record})
        break
      case 'delete':
        this.props.dispatch({type: 'competition/delete', payload: record})
        break
      default:
        break
    }
  }

  render () {
    const columns = [
      {title: '序号', dataIndex: 'id', key: 'id', width: 50},
      {title: '赛事名称', dataIndex: 'name', key: 'name', width: 250},
      {title: '比赛日期', dataIndex: 'competition_time', key: 'competition-time', width: 150},
      {title: '报名日期', dataIndex: 'apply_time', key: '4', width: 150},
      {title: 'Column 5', dataIndex: 'address', key: '5', width: 150},
      {title: 'Column 6', dataIndex: 'address', key: '6', width: 150},
      {title: 'Column 7', dataIndex: 'address', key: '7', width: 150},
      {title: 'Column 8', dataIndex: 'address', key: '8'},
      {
        title: '操作',
        render: (record) => {
          return (
            <DropOption
              menuOptions={[{key: 'edit', name: '编辑'}, {key: 'delete', name: '删除'}]}
              buttonStyle={{border: 'solid 1px #eee', width: 60}}
              onMenuClick={({key}) => this.onMenuClick(key, record)}
            />
          )
        },
        fixed: 'right',
        width: 100,
        key: '9'
      }
    ]

    const data = []
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      })
    }

    return (
      <div className='competition'>
        <div className='competition-header'>
          <Select
            showSearch
            style={{width: 100}}
            placeholder='选择年份'
            defaultValue='2017'
          >
            <Option value='2017'>2017</Option>
          </Select>
          <Button type='primary'>创建比赛</Button>
        </div>

        <Table columns={columns} bordered dataSource={data} scroll={{x: 1500}} pagination={false}/>
      </div>
    )
  }
}

export default CompetitionManage
