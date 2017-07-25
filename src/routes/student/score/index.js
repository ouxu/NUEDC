/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Alert, Form, Select, Table } from 'antd'
import './index.less'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

const StudentScoreManage = ({studentScore, dispatch, location}) => {
  const {table, contest = []} = studentScore
  const {query} = location

  const columns = [
    {title: '竞赛名称', dataIndex: 'contestTitle', key: 'contestTitle', width: 250},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 250},
    {title: '竞赛结果', dataIndex: 'result', key: 'result', width: 100},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 170},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 100},
    {title: '审核状态', dataIndex: 'status', key: 'status', width: 100, fixed: 'right'}
  ]
  return (
    <div className='student-score'>
      <div className='student-score-header'>
        <div className='student-score-select'>
          <Select
            showSearch
            style={{width: 300, marginRight: 10}}
            placeholder='竞赛名称'
            onChange={(value) => {
              dispatch(routerRedux.push(`/student/score?contest_id=` + value))
            }}
            value={query.contest_id || undefined}
          >
            {contest.map(item => (
              <Select.Option key={'' + item.id} value={'' + item.id}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      {
        JSON.stringify(query.contest_id) ? (
          <Table
            columns={columns} bordered
            dataSource={table} scroll={{x: 1600}}
            rowKey={record => record.id}
          />
        ) : <Alert
          message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
          description={(<span>请先在下拉选单里选择竞赛</span>)}
          showIcon
        />
      }

    </div>
  )
}

export default connect(({app, studentScore}) => ({app, studentScore}))(Form.create()(StudentScoreManage))
