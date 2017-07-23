/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
const ProblemManage = ({app, dispatch, contest, location, adminProblems}) => {
  const {query} = location
  const {contest_id = ''} = query
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
        contest_id.length > 0 ? (
          table.length > 0 ? (
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
          ) : (
            <Alert
              message={(<span>暂无题目，请添加</span>)}
              description='请点击右上角按钮添加题目'
              showIcon
            />
          )
        ) : (
          <Alert
            message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
            description='请先在下拉选单中选择竞赛'
            showIcon
          />
        )
      }
    </div>
  )
}

export default connect(({app, contest, adminProblems}) => ({app, contest, adminProblems}))(Form.create()(ProblemManage))
