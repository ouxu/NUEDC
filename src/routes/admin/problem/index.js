/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import DropOption from '../../../components/DropOption/'
const ProblemManage = ({app, dispatch, contest, location, adminProblems}) => {
  const {query} = location
  const {table = []} = adminProblems
  const {table: contestTable = []} = contest
  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '题目标题', dataIndex: 'title', key: 'title', width: 250},
    {title: '附加信息', dataIndex: 'status', key: 'status'}
  ]

  return (
    <div className='problem'>
      <div className='problem-header'>
        <Select
          showSearch
          style={{width: 260}}
          placeholder='选择竞赛'
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(value) => {
            dispatch(routerRedux.push(`/admin/problem?contest_id=` + value))
          }}
          value={query.contest_id || undefined}
        >
          {contestTable.map(item => (
            <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
          ))}
        </Select>
        <Button type='primary'>添加题目</Button>
      </div>
      {
        JSON.stringify(query).length < 3 ? (
          <Alert
            message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
            description='请先在下拉选单中选择竞赛'
            showIcon
          />
        ) : (
          <Table
            columns={columns} bordered
            dataSource={table}
            pagination={false} rowKey={record => record.id}
            expandedRowRender={record => (
              <div className='expanded-row'>
                <span>{record.content}</span>
              </div>
            )}
          />
        )
      }
    </div>
  )
}

export default connect(({app, contest, adminProblems}) => ({app, contest, adminProblems}))(Form.create()(ProblemManage))
