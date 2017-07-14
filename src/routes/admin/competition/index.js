/**
 * Created by out_xu on 17/7/13.
 */
import React, { Component } from 'react'
import { Select, Table } from 'antd'
import './index.less'
const Option = Select.Option

class CompetitionManage extends Component {
  render () {
    const columns = [
      {title: 'Column 1', dataIndex: 'address', key: '1', width: 150},
      {title: 'Column 2', dataIndex: 'address', key: '2', width: 150},
      {title: 'Column 3', dataIndex: 'address', key: '3', width: 150},
      {title: 'Column 4', dataIndex: 'address', key: '4', width: 150},
      {title: 'Column 5', dataIndex: 'address', key: '5', width: 150},
      {title: 'Column 6', dataIndex: 'address', key: '6', width: 150},
      {title: 'Column 7', dataIndex: 'address', key: '7', width: 150},
      {title: 'Column 8', dataIndex: 'address', key: '8'},
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href='#'>action</a>
      }
    ]

    const data = []

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
        </div>

        <Table columns={columns} bordered dataSource={data} scroll={{x: 1500}} />
      </div>
    )
  }
}

export default CompetitionManage
