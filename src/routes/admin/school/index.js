/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Modal, Table } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'

import DropOption from '../../../components/DropOption'
import FormItemRender from '../../../components/FormItemRender/'
import { commonConfig, createConfig, editConfig } from './formConfig'

const {confirm} = Modal

const SchoolManage = ({adminSchool, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableSize, tableCount, tablePage} = adminSchool
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'adminSchool/updateModalContent', payload: {}})
    dispatch({type: 'adminSchool/showModal', payload: 'create'})
  }

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        dispatch({type: 'adminSchool/updateModalContent', payload: record})
        dispatch({type: 'adminSchool/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: `您确定要删除 ${record.name} 的记录吗？`,
          onOk () { dispatch({type: 'adminSchool/delete', payload: record}) },
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
      const {post_code, principal, principal_mobile, address} = values
      let payload = modal === 'create' ? values : {post_code, principal, principal_mobile, address}

      dispatch({type: `adminSchool/${modal === 'edit' ? 'update' : 'create'}`, payload: payload})
    })
  }
  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '学校名称', dataIndex: 'name', key: 'name', width: 200},
    {title: '学校等级', dataIndex: 'level', key: 'level', width: 80},
    {title: '学校负责人', dataIndex: 'principal', key: 'principal', width: 130},
    {title: '负责人联系方式', dataIndex: 'principal_mobile', key: 'principal_mobile', width: 170},
    {title: '学校通信地址', dataIndex: 'address', key: 'address'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{
              key: 'edit', name: '编辑学校'
            },{
              key: 'gotoAdmin', name: '查看管理'
            }, {
              key: 'delete', name: '删除学校'
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
      dispatch(routerRedux.push(`/admin/school?page=${current}&size=${pageSize}`))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/admin/school?page=${current}&size=${tableSize}`))
    }
  }

  return (
    <div className='school'>
      <div className='school-header'>
        <div>学校列表</div>
        <Button type='primary' onClick={onCreateClick}>添加学校</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1000}}
        pagination={pagination} rowKey={record => record.id}
      />
      <Modal
        title={`${modal === 'edit' ? '编辑学校信息' : '添加学校'}`}
        visible={modal === 'edit' || modal === 'create'}
        onCancel={() => dispatch({type: 'adminSchool/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
          {modal === 'create' && createConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]})) }
          {commonConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, adminSchool}) => ({app, loading, adminSchool}))(Form.create()(SchoolManage))
