/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Icon, Select, Table, Tooltip } from 'antd'
import './index.less'
import { routerRedux } from 'dva/router'
import { urlEncode } from '../../../utils'
import { connect } from 'dva'

const Option = Select.Option
const SchoolResultManage = ({location, schoolResult, dispatch}) => {
  const {table, contest = {}, tableSize, tableCount, tablePage} = schoolResult
  const {contests = []} = contest
  const {query} = location
  const dataFlag = query.contest_id > 0
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
        <Tooltip title='-1 代表未选题'>
          <span> 选题情况 <Icon type="question-circle-o" /></span>
        </Tooltip>
      ),
      render: (record) => {
        if (record.problem_selected === -1) {
          return '未选题'
        } else {
          return record.problem_selected
        }
      },
      key: 'problem_selected',
      width: 100
    },
    {title: '选题时间', dataIndex: 'problem_selected_at', key: 'problem_selected_at', width: 200},
    {title: '奖项确定时间', dataIndex: 'result_at', key: 'result_at', width: 200},
    {title: '现场赛相关信息', dataIndex: 'onsite_info', key: 'onsite_info', width: 300},
    {title: '审核状态', dataIndex: 'result_info', key: 'result_info', width: 100, fixed: 'right'},
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
          >
            {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.title}</Select.Option>)}
          </Select>
          <Button type='primary' onClick={() => dispatch(routerRedux.push('/school/schoolResult?' + urlEncode({
              ...query,
              contest_id: undefined,
              result_info: undefined
            })))}>
            重置筛选</Button>
        </div>
        <Button type='primary' onClick={excelOut}>导出excel</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 2000}}
        pagination={pagination} rowKey={record => record.id}
      />
    </div>
  )
}

export default connect(({app, schoolResult}) => ({app, schoolResult}))(SchoolResultManage)
