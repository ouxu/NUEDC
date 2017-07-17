/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Form, Modal, Select, Table } from 'antd'
import formConfig from '../joinedTeams/formConfig'
import './index.less'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'

const Option = Select.Option
const confirm = Modal.confirm
const JoinedTeamsManage = ({joinedTeams, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, table, modalContent} = joinedTeams
  const {contests = []} = modalContent

  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        dispatch({type: 'joinedTeams/updateModalContent', payload: record})
        dispatch({type: 'joinedTeams/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: (
            <p>确认删除{record.team_name}吗？</p>
          ),
          onOk () {
            dispatch({type: 'joinedTeams/delete', payload: record})
          },
          onCancel () {}
        })
        break
      case 'audit':
        dispatch({type: 'joinedTeams/audit', payload: record.id})
        break
      default:
        break
    }
  }
  const onAddClick = e => {
    e.preventDefault()
    dispatch({type: 'joinedTeams/showModal', payload: 'add'})
  }
  const onOptionChange = (value) => {
    dispatch({type: 'joinedTeams/onFilter', payload: value})
    dispatch({type: 'joinedTeams/filter', payload: value})
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'joinedTeams/onFormSubmit', payload: values})
      dispatch({type: `joinedTeams/${modal === 'edit' ? 'edit' : 'add'}`, payload: values})
      dispatch({type: 'joinedTeams/hideModal'})
    })
  }
  const excelOut = () => {
    dispatch({type: 'joinedTeams/joinedOut', payload: 'out'})
  }

  const columns = [
    {title: '竞赛id', dataIndex: 'contest_id', key: 'contest_id', width: 100},
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 300},
    {title: '学校id', dataIndex: 'school_id', key: 'school_id', width: 100},
    {title: '学校名称', dataIndex: 'school_name', key: 'school_name', width: 300},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 200},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 150},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 200},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 300},
    {title: '参赛状态', dataIndex: 'status', key: 'status', width: 150},
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
  return (
    <div className='joined-teams'>
      <div className='joined-teams-header'>
        <Select
          showSearch
          style={{width: 100}}
          placeholder='竞赛ID'
          onChange={onOptionChange}
        >
          {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.id}</Select.Option>)}
        </Select>
        <Button type='primary' onClick={onAddClick}>+ 增加比赛队伍</Button>
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1500}}
        pagination={false} rowKey={record => record.id}
      />
      <Modal
        title={`${modal === 'edit' ? '编辑队伍信息' : '增加比赛队伍'}`}
        visible={joinedTeams.modal === 'edit' || joinedTeams.modal === 'add'}
        onCancel={() => dispatch({type: 'joinedTeams/hideModal'})}
        onOk={onModalOk}
        key={joinedTeams.modal}
      >
        <Form className='form-content'>
          {formConfig.map(config => FormItemRender(config, getFieldDecorator))}
        </Form>
      </Modal>
      <Button className='joined-teams-out' type='primary' onClick={excelOut}>导出excel</Button>
    </div>
  )
}

export default connect(({app, joinedTeams}) => ({app, joinedTeams}))(Form.create()(JoinedTeamsManage))
