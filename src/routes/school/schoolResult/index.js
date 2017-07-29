/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Alert, Button, Icon, Select, Table, Tooltip } from 'antd'
import './index.less'
import { routerRedux } from 'dva/router'
import { urlEncode } from '../../../utils'
import { connect } from 'dva'

const SchoolResultManage = ({location, schoolResult, dispatch}) => {
  const {table, contests = {}, tableCount} = schoolResult
  const {query} = location
  const pagination = {
    pageSize: +query.size || 50,
    current: +query.page || 1,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/school/schoolResult?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/school/schoolResult?` + urlEncode({...query, page: current})))
    }
  }
  const onOptionChange = (value) => {
    dispatch(routerRedux.push(`/school/schoolResult?` + urlEncode({...query, contest_id: value || undefined})))
  }
  const excelOut = () => {
    dispatch({type: 'schoolResult/ResultOut', payload: {...query, page: undefined, size: undefined}})
  }
  const columns = [
    {title: '#', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 200},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 100},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 170},
    {title: '邮箱', dataIndex: 'email', key: 'email', width: 200},
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
    <div className='school-result'>
      <div className='school-result-header'>
        <div className='school-result-select'>
          <Select
            showSearch
            style={{width: 300, marginRight: 10}}
            placeholder='选择竞赛'
            value={(query.contest_id || undefined)}
            onChange={onOptionChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.title}</Select.Option>)}
          </Select>
        </div>
        <Button type='primary' onClick={excelOut}>导出excel</Button>
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
              dataSource={table} scroll={{x: 1800}}
              pagination={pagination} rowKey={record => record.id}
            />
          ) : (
            <Alert
              message={(<span>比赛进行中</span>)}
              description='竞赛成绩还未发布，请耐心等待'
              showIcon
            />
          )
        )
      }
    </div>
  )
}

export default connect(({app, schoolResult}) => ({app, schoolResult}))(SchoolResultManage)
