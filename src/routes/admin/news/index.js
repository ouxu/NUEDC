/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Form, Modal, Select, Table } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { editConfig } from './formConfig'
import { color, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'
const {confirm} = Modal

const NewsManage = ({location, adminNews, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableSize, tableCount, tablePage} = adminNews
  const {query} = location

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        record.status = '' + record.status
        dispatch({type: 'adminNews/updateModalContent', payload: record})
        dispatch({type: 'adminNews/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除 ${record.name} 管理员账号？`,
          onOk () { dispatch({type: 'adminNews/delete', payload: record}) },
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
      dispatch({type: 'adminNews/update', payload: values})
    })
  }
  const columns = [
    {title: '#', dataIndex: 'id', key: 'id', width: 50, fixed: 'left'},
    {title: '报名ID', dataIndex: 'register_id', key: 'register_id', width: 70, fixed: 'left'},
    {title: '队名', dataIndex: 'team_name', key: 'team_name', width: 200, fixed: 'left'},
    {title: '所属学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '竞赛场次', dataIndex: 'contest_id', key: 'contest_id', width: 200},  // TODO 竞赛场次解释
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
    {title: '跟新时间', dataIndex: 'updated_at', key: 'updated_at', width: 170},
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
        <Select
          showSearch
          style={{width: 260}}
          onChange={(value) => {
            dispatch(routerRedux.push(`/admin/contestRecord?` + urlEncode({
                ...query,
                type: value || undefined
              })))
          }}
          value={query.type || 'news'}
        >

          <Select.Option key='news-select-news' value='news'>新闻管理</Select.Option>
          <Select.Option key='news-select-news' value='notices'>通知管理</Select.Option>
        </Select>
        <div />
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 2800}}
        pagination={pagination} rowKey={record => record.id}
      />
      <Modal
        title='修改队伍信息'
        visible={modal === 'edit'}
        onCancel={() => dispatch({type: 'adminNews/hideModal'})}
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

export default connect(({app, loading, contest, login, adminNews}) => ({
  app,
  loading,
  adminNews
}))(Form.create()(NewsManage))
