/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Input, Modal, Select, Table } from 'antd'
import formConfig from './formConfig'
import './index.less'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'

const confirm = Modal.confirm
const ContestManage = ({contest, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, table} = contest

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        dispatch({type: 'contest/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: (
            <Input
              type='password' placeholder='请输入你的密码'
              onChange={(e) => dispatch({type: 'contest/onInputChange', payload: e.target.value})}
            />
          ),
          onOk () { dispatch({type: 'contest/delete', payload: record}) },
          onCancel () {}
        })
        break
      default:
        break
    }
  }
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'contest/showModal', payload: 'create'})
  }

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: `contest/${modal === 'edit' ? 'edit' : 'create'}`, payload: values})
      dispatch({type: 'contest/hideModal'})
    })
  }

  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '赛事名称', dataIndex: 'title', key: 'title', width: 250},
    {title: '赛事状态', dataIndex: 'status', key: 'status', width: 100},
    {title: '报名', dataIndex: 'can_register', key: 'can_register', width: 50},
    {title: '选题', dataIndex: 'can_select_problem', key: 'can_select_problem', width: 50},
    {title: '报名开始时间', dataIndex: 'register_start_time', key: 'register_start_time', width: 150},
    {title: '报名结束时间', dataIndex: 'register_start_time', key: 'register_end_time', width: 150},
    {title: '选题时间', dataIndex: 'problem_start_time', key: 'problem_start_time', width: 150},
    {title: '附加', dataIndex: 'problem_start_time', key: 'problem_end_time'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{key: 'edit', name: '编辑'}, {key: 'delete', name: '删除'}]}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 100,
      key: '9'
    }
  ]

  return (
    <div className='contest'>
      <div className='contest-header'>
        <Select
          showSearch
          style={{width: 100}}
          placeholder='选择年份'
          defaultValue='all'
        >
          <Select.Option value='all'>ALL</Select.Option>
        </Select>
        <Button type='primary' onClick={onCreateClick}>创建比赛</Button>
      </div>

      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1500}}
        pagination={false} rowKey={record => record.id}
        expandedRowRender={record => (
          <div className='expanded-row'>
            <span>{record.description}</span>
            <span>{record.description}</span>
          </div>
        )}
      />
      <Modal
        title={`${modal === 'edit' ? '编辑竞赛' : '创建竞赛'}`}
        visible={modal === 'edit' || modal === 'create'}
        onCancel={() => dispatch({type: 'contest/hideModal'})}
        onOk={onModalOk}
        key={modal}
      >
        <Form className='form-content'>
          {formConfig.map(config => FormItemRender(config, getFieldDecorator))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, contest}) => ({app, contest}))(Form.create()(ContestManage))
