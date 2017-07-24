/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Modal, Select, Table, Alert } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { editConfig } from './formConfig'
import { color, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'
const {confirm} = Modal

const ContestRecordManage = ({location, adminContestRecord, contest, login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableSize, tableCount, tablePage} = adminContestRecord
  const {table: tableContest = []} = contest
  const {table: tableSchool = []} = login
  const {query} = location

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        record.status = '' + record.status
        dispatch({type: 'adminContestRecord/updateModalContent', payload: record})
        dispatch({type: 'adminContestRecord/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除 ${record.name} 管理员账号？`,
          onOk () { dispatch({type: 'adminContestRecord/delete', payload: record}) },
          onCancel () {}
        })
        break
      default:
        break
    }
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'adminContestRecord/update', payload: values})
    })
  }
  const columns = [
    {title: '#', dataIndex: 'id', key: 'id', width: 50, fixed: 'left'},
    {title: '报名ID', dataIndex: 'register_id', key: 'register_id', width: 70, fixed: 'left'},
    {title: '队名', dataIndex: 'team_name', key: 'team_name', width: 200, fixed: 'left'},
    {title: '所属学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 90},
    {title: '队员1姓名', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2姓名', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3姓名', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 90},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 170},
    {title: '邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '所选题目', dataIndex: 'problem_selected', key: 'problem_selected', width: 100},
    {title: '报名状态', dataIndex: 'status', key: 'status', width: 100},
    {title: '比赛结果', dataIndex: 'result', key: 'result', width: 100},
    {title: '审核状态', dataIndex: 'result_info', key: 'result_info', width: 100},
    {title: '现场赛附加信息', dataIndex: 'onsite_info', key: 'onsite_info', width: 200},
    {title: '选题时间', dataIndex: 'problem_selected_at', key: 'problem_selected_at', width: 170},
    {title: '评奖时间', dataIndex: 'result_at', key: 'result_at', width: 170},
    {title: '报名时间', dataIndex: 'created_at', key: 'created_at', width: 170},
    {title: '上次编辑时间', dataIndex: 'updated_at', key: 'updated_at', width: 170},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{
              key: 'edit', name: '编辑'
            }, {
              key: 'delete', name: '删除'
            }]}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 100,
      key: 'edit'
    }
  ]
  const pagination = {
    pageSize: +tableSize,
    current: +tablePage,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({...query, page: current})))
    }
  }

  const statusArr = [
    {
      value: '未审核',
      label: '未审核',
      color: color.red
    },
    {
      value: '已审核',
      label: '已审核',
      color: color.blue
    }
  ]

  return (
    <div className='contest-record'>
      <div className='contest-record-header'>
        <div>
          <Select
            showSearch
            style={{width: 260}}
            placeholder='选择竞赛'
            onChange={(value) => {
              dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({
                  ...query,
                  contest_id: value || tableContest[tableContest.length - 1].contest_id
                })))
            }}
            value={query.contest_id || undefined}
          >
            {tableContest.map(item => (
              <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
            ))}
          </Select>
          <Select
            showSearch
            style={{width: 100}}
            placeholder='报名状态'
            onChange={(value) => {
              dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({...query, status: value || undefined})))
            }}
            allowClear
            value={query.status || undefined}
          >
            {statusArr.map(item => (
              <Select.Option key={'contest-status-' + item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          <Select
            showSearch
            style={{width: 100}}
            placeholder='比赛结果'
            onChange={(value) => {
              dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({...query, result: value || undefined})))
            }}
            allowClear
            value={query.result || undefined}
          >
            {statusArr.map(item => (
              <Select.Option key={'contest-result-' + item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          <Select
            showSearch
            style={{width: 260}}
            placeholder='学校'
            onChange={(value) => {
              dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({...query, school_id: value || undefined})))
            }}
            allowClear
            value={query.school_id || undefined}
          >
            {tableSchool.map(item => (
              <Select.Option key={'contest-school-' + item.id} value={item.id + ''}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Button type='primary' onClick={() => dispatch(routerRedux.push('/admin/contestRecord?' + urlEncode({
            ...query,
            contest_id: undefined,
            status: undefined,
            result: undefined,
            school_id: undefined
          })))}>
          重置筛选</Button>
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
      <Modal
        title='修改队伍信息'
        visible={modal === 'edit'}
        onCancel={() => dispatch({type: 'adminContestRecord/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, contest, login, adminContestRecord}) => ({
  app,
  login,
  loading,
  adminContestRecord,
  contest
}))(Form.create()(ContestRecordManage))
