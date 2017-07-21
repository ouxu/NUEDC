/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Modal, Radio, Select, Table, Tag } from 'antd'

import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { editConfig } from './formConfig'
import { color, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'
const {confirm} = Modal

const SchoolAdminManage = ({location, adminSchoolAdmin, dispatch, login, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableSize, tableCount, tablePage} = adminSchoolAdmin
  const {table: schoolTable = []} = login
  const {query} = location
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'adminSchoolAdmin/updateModalContent', payload: {}})
    dispatch({type: 'adminSchoolAdmin/showModal', payload: 'create'})
  }

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        record.status = '' + record.status
        dispatch({type: 'adminSchoolAdmin/updateModalContent', payload: record})
        dispatch({type: 'adminSchoolAdmin/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除 ${record.name} 管理员账号？`,
          onOk () { dispatch({type: 'adminSchoolAdmin/delete', payload: record}) },
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
      if (modal === 'edit') {
        values.status = +values.status
      }
      dispatch({type: `adminSchoolAdmin/${modal === 'edit' ? 'update' : 'create'}`, payload: values})
    })
  }
  const columns = [
    {title: 'id', dataIndex: 'id', key: 'id', width: 50},
    {title: '用户名', dataIndex: 'name', key: 'name', width: 150},
    {title: '邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '手机号', dataIndex: 'mobile', key: 'mobile', width: 120},
    {title: '所属学校名称', dataIndex: 'school_name', key: 'school_name'},
    {title: '性别', dataIndex: 'sex', key: 'sex', width: 50},
    {
      title: '状态',
      render: (record) => (
        <Tag color={record.status === 0 ? color.red : color.blue}>{record.status === 0 ? '未激活' : '已激活'}</Tag>),
      key: 'status',
      width: 50
    }, // TODO 状态解释
    {title: '创建于', dataIndex: 'created_at', key: 'created_at', width: 170},
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
    pageSizeOptions: ['20', '50', '100'],
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/admin/schoolAdmin?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/admin/schoolAdmin?` + urlEncode({...query, page: current, size: tableSize})))
    }
  }
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16}
    }
  }
  return (
    <div className='school-admin'>
      <div className='school-admin-header'>
        <div>
          <span>学校管理员列表</span>
          <Select
            showSearch
            style={{width: 200, marginRight: 10, marginLeft: 20}}
            placeholder='选择学校'
            value={query.school_id || undefined}
            onChange={(value) => {
              dispatch(routerRedux.push(`/admin/schoolAdmin?` + urlEncode({...query, school_id: value || undefined})))
            }}
            allowClear
          >
            {table.map(item => (
              <Select.Option key={'contest-status-' + item.school_id} value={item.school_id + ''}>
                {item.school_name}
              </Select.Option>
            ))}
          </Select>
          <Button type='primary' onClick={() => dispatch(routerRedux.push('/admin/schoolAdmin?' + urlEncode({
            ...query,
            school_id: undefined
          })))}>
            重置筛选</Button>
        </div>
        <Button type='primary' onClick={onCreateClick}>生成账号</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1100}}
        pagination={pagination} rowKey={record => record.id}
      />
      <Modal
        title={`${modal === 'edit' ? '修改学校管理员信息' : '添加学校管理员'}`}
        visible={modal === 'edit' || modal === 'create'}
        onCancel={() => dispatch({type: 'adminSchoolAdmin/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'create' && (
            <Form.Item
              label='选择学校'
              key='school-select'
              {...formItemLayout}
            >
              {getFieldDecorator('school_id', {
                rules: [{required: true, message: '请选择学校'}]
              })(
                <Select>
                  {schoolTable.map(option => (
                    <Radio value={'' + option.id} key={option.id}>{option.name}</Radio>
                  ))}
                </Select>
              )}
            </Form.Item>
          )}
          { editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }

        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, login, adminSchoolAdmin}) => ({
  app,
  loading,
  login,
  adminSchoolAdmin
}))(Form.create()(SchoolAdminManage))
