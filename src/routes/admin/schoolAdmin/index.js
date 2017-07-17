/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Modal, Table } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { createConfig, editConfig } from './formConfig'

import DropOption from '../../../components/DropOption'
const {confirm} = Modal

const SchoolAdminManage = ({adminSchoolAdmin, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableSize, tableCount, tablePage} = adminSchoolAdmin
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
      if (modal==='edit') {
        values.status = + values.status
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
    {title: '状态', dataIndex: 'status', key: 'status', width: 50}, // TODO 状态解释
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
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/admin/schoolAdmin?page=${current}&size=${pageSize}`))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/admin/schoolAdmin?page=${current}&size=${tableSize}`))
    }
  }

  return (
    <div className='school-admin'>
      <div className='school-admin-header'>
        <div>学校管理员列表</div>
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
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
          {modal === 'create' && createConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, adminSchoolAdmin}) => ({
  app,
  loading,
  adminSchoolAdmin
}))(Form.create()(SchoolAdminManage))
