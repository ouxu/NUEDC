/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Select, Table, Alert } from 'antd'
import './index.less'
import { routerRedux } from 'dva/router'
import { urlEncode } from '../../../utils'
import { connect } from 'dva'

const Option = Select.Option
const SchoolResultManage = ({location, schoolResult, dispatch}) => {
  const {table, contest = {}, tableSize, tableCount, tablePage} = schoolResult
  const {contests = []} = contest
  const {query} = location

  const pagination = {
    pageSize: +tableSize,
    current: +tablePage,
    total: +tableCount,
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
    {title: '竞赛id', dataIndex: 'contest_id', key: 'contest_id', width: 100},
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 300},
    {title: '学校id', dataIndex: 'school_id', key: 'school_id', width: 100},
    {title: '学校名称', dataIndex: 'school_name', key: 'school_name', width: 300},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 100},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 200},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 200},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 200},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 200},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 200},
    {title: '邮箱', dataIndex: 'email', key: 'email', width: 300},
    {title: '所选题目', dataIndex: 'problem_selected', key: 'problem_selected', width: 200},
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
            value={query.contest_id || undefined}
            onChange={onOptionChange}
          >
            {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.title}</Select.Option>)}
          </Select>
          <Select
            showSearch
            style={{width: 200, marginRight: 10}}
            placeholder='审核状态'
            value={query.result_info || undefined}
            onChange={(value) => {
              dispatch(routerRedux.push(`/school/schoolResult?` + urlEncode({
                ...query,
                result_info: value || undefined
              })))
            }}
            allowClear
          >
            <Select.Option key={'school-result-' + 1} value='未审核'>
              未审核
            </Select.Option>
            <Select.Option key={'school-result-' + 2} value='已审核'>
              已审核
            </Select.Option>
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
      {
        JSON.stringify(query.contest_id) ? <Table
          columns={columns} bordered
          dataSource={table} scroll={{x: 2800}}
          pagination={pagination} rowKey={record => record.id}
        /> : <Alert
          message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
          description={(<span>请先在下拉选单里选择竞赛</span>)}
          showIcon
        />
      }
    </div>
  )
}

export default connect(({app, schoolResult}) => ({app, schoolResult}))(SchoolResultManage)
