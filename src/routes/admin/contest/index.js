/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Input, Modal, Select, Table, Tag } from 'antd'
import { commonConfig, editConfig } from './formConfig'
import './index.less'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'
import moment from 'moment'
import { color } from '../../../utils'
const {confirm} = Modal
const ContestManage = ({contest, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table} = contest

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        const {
          register_start_time,
          register_end_time,
          problem_start_time,
          problem_end_time,
          can_select_problem,
          can_register
        } = record
        const payload = {
          ...record,
          registerTimes: [
            moment(register_start_time, 'YYYY-MM-DD HH:mm:ss'),
            moment(register_end_time, 'YYYY-MM-DD HH:mm:ss')
          ],
          problemTimes: [
            moment(problem_start_time, 'YYYY-MM-DD HH:mm:ss'),
            moment(problem_end_time, 'YYYY-MM-DD HH:mm:ss')
          ],
          can_register: '' + can_register,
          can_select_problem: '' + can_select_problem
        }
        dispatch({type: 'contest/updateModalContent', payload: payload})
        dispatch({type: 'contest/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: `删除确认`,
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
    dispatch({type: 'contest/updateModalContent', payload: 'create'})
    dispatch({type: 'contest/showModal', payload: 'create'})
  }

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {
        title, description, add_on, registerTimes, problemTimes, can_register = '',
        can_select_problem = ''
      } = values
      let payload = {
        title,
        description,
        add_on,
        register_start_time: registerTimes[0].format('YYYY-MM-DD HH:mm:ss'),
        register_end_time: registerTimes[1].format('YYYY-MM-DD HH:mm:ss'),
        problem_start_time: problemTimes[0].format('YYYY-MM-DD HH:mm:ss'),
        problem_end_time: problemTimes[1].format('YYYY-MM-DD HH:mm:ss')
      }
      if (modal === 'edit') {
        payload = {
          ...payload,
          can_register: +can_register,
          can_select_problem: +can_select_problem,
        }
      }
      dispatch({type: `contest/${modal === 'edit' ? 'update' : 'create'}`, payload: payload})
    })
  }
  const status = [{
    color: color.green,
    value: '自动'
  }, {
    color: color.red,
    value: '关闭'
  }, {
    color: color.blue,
    value: '开启'
  }]
  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '赛事名称', dataIndex: 'title', key: 'title'},
    {title: '赛事状态', dataIndex: 'status', key: 'status', width: 100},
    {
      title: '报名',
      render: record => (
        <Tag color={status[record.can_register + 1].color}>{status[record.can_register + 1].value}</Tag>
      ),
      key: 'can_register',
      width: 50
    }, {
      title: '选题',
      render: record => (
        <Tag color={status[record.can_select_problem + 1].color}>{status[record.can_select_problem + 1].value}</Tag>
      ),
      key: 'can_select_problem',
      width: 50
    },
    {title: '报名开始时间', dataIndex: 'register_start_time', key: 'register_start_time', width: 170},
    {title: '报名结束时间', dataIndex: 'register_end_time', key: 'register_end_time', width: 170},
    {title: '选题开始时间', dataIndex: 'problem_start_time', key: 'problem_start_time', width: 170},
    {title: '选题结束时间', dataIndex: 'problem_end_time', key: 'problem_end_time', width: 170},
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
        dataSource={table} scroll={{x: 1380}}
        pagination={false} rowKey={record => record.id}
        expandedRowRender={record => (
          <div className='expanded-row'>
            <span>{record.description}</span>
          </div>
        )}
      />
      <Modal
        title={`${modal === 'edit' ? '编辑竞赛' : '创建竞赛'}`}
        visible={modal === 'edit' || modal === 'create'}
        onCancel={() => dispatch({type: 'contest/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {commonConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, contest}) => ({app, loading, contest}))(Form.create()(ContestManage))
