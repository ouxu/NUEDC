/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Form, Input, Modal, Select, Table } from 'antd'
import formConfig from '../joinedTeams/formConfig'
import './index.less'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'

const Option = Select.Option
const confirm = Modal.confirm
const JoinedTeamsManage = ({joinedTeams, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false} = joinedTeams

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        dispatch({type: 'joinedTeams/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: (
            <Input
              type='password' placeholder='请输入你的密码'
              onChange={(e) => dispatch({type: 'joinedTeams/onInputChange', payload: e.target.value})}
            />
          ),
          onOk () { dispatch({type: 'joinedTeams/delete', payload: record}) },
          onCancel () {}
        })
        break
      case 'audit':
        dispatch({type: 'joinedTeams/audit', payload: 'audit'})
        break
      default:
        break
    }
  }
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'joinedTeams/showModal', payload: 'create'})
  }

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: `joinedTeams/${modal === 'edit' ? 'edit' : 'create'}`, payload: values})
      dispatch({type: 'joinedTeams/hideModal'})
    })
  }

  const columns = [
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'title', key: 'title', width: 380},
    {title: '队伍信息', dataIndex: 'status', key: 'status', width: 420},
    {title: '审核状态', dataIndex: 'can_register', key: 'can_register', width: 250},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{key: 'edit', name: '编辑'}, {key: 'delete', name: '删除'}, {key: 'audit', name: '审核'}]}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      width: 100,
      fixed: 'right',
      key: '9'
    }
  ]

  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      title: `电子设计竞赛 ${i}`,
      status: '未开始'
    })
  }
  return (
    <div className='joined-teams'>
      <div className='joined-teams-header'>
        <Select
          showSearch
          style={{width: 100}}
          placeholder='选择年份'
          defaultValue='2017'
        >
          <Option value='2017'>2017</Option>
        </Select>
        <Button type='primary' onClick={onCreateClick}>+ 增加比赛队伍</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={data} scroll={{x: 1000}}
        pagination={false} rowKey={record => record.id}
      />
      <Modal
        title={`${modal === 'edit' ? '编辑竞赛' : '创建竞赛'}`}
        visible={joinedTeams.modal === 'edit' || joinedTeams.modal === 'create'}
        onCancel={() => dispatch({type: 'joinedTeams/hideModal'})}
        onOk={onModalOk}
        key={joinedTeams.modal}
      >
        <Form className='form-content'>
          {formConfig.map(config => FormItemRender(config, getFieldDecorator))}
        </Form>
      </Modal>
      <Button className='joined-teams-out' type='primary'>导出excel</Button>
    </div>
  )
}

export default connect(({app, joinedTeams}) => ({app, joinedTeams}))(Form.create()(JoinedTeamsManage))
