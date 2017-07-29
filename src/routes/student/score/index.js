/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Alert, Form, Icon, Select, Table, Tooltip } from 'antd'
import './index.less'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'

const StudentScoreManage = ({studentScore, dispatch, location}) => {
  const {table, contest = []} = studentScore
  const {query} = location
  const columns = [
    {title: '竞赛名称', dataIndex: 'contestTitle', key: 'contestTitle', width: 250},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 250},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 170},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 100},
    {
      title: (
        <Tooltip title='空白代表未选题'>
          <span> 所选题目 <Icon type="question-circle-o" /></span>
        </Tooltip>
      ),
      dataIndex: 'problemTitle',
      key: 'problem_selected',
      width: 250
    },
    {title: '备注', dataIndex: 'onsite_info', key: 'onsite_info', width: 300},
    {title: '获得奖项', dataIndex: 'result', key: 'result', width: 100, fixed: 'right'}
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
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
        query.contest_id === 'none' ? (
          <Alert
            message={(<span>您尚未参加过任何比赛</span>)}
            description={(<Link to='/student'> 点击报名参赛</Link>)}
            showIcon
          />
        ) : (
          table.length > 0 ? (
            <Table
              columns={columns} bordered
              dataSource={table} scroll={{x: 2000}}
              rowKey={record => record.id}
            />
          ) : (
            <Alert
              message={(<span>比赛结果尚未公布</span>)}
              description={' '}
              showIcon
            />
          )
        )
      }
    </div>
  )
}

export default connect(({app, studentScore}) => ({app, studentScore}))(Form.create()(StudentScoreManage))
