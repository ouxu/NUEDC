/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Form, Modal, Select, Table } from 'antd'
import formConfig from './formConfig'
import './index.less'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'

const Option = Select.Option
const confirm = Modal.confirm
const JoinedTeamsManage = ({studentProblem, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, table, modalContent, contest = {}} = studentProblem
  const {contests = []} = contest
  const onMenuClick = (key, record) => {
    const {
      contest_id
    } = record
    const payload = {
      ...record,
      contest_id: contest_id + ''
    }
    switch (key) {
      case 'view':
        dispatch({type: 'studentProblem/view', payload: payload})
        dispatch({type: 'studentProblem/showModal', payload: 'view'})
        break
      case 'download':
        dispatch({type: 'studentProblem/view', payload: payload})
        dispatch({type: 'studentProblem/showModal', payload: 'view'})
        break
      case 'choose':
        confirm({
          title: '选择确认',
          content: (
            <p>确认选择{record.team_name}吗？</p>
          ),
          onOk () {
            dispatch({type: 'studentProblem/choose', payload: record})
          },
          onCancel () {}
        })
        break
      default:
        break
    }
  }
  const onAddClick = e => {
    e.preventDefault()
    dispatch({type: 'studentProblem/showModal', payload: 'add'})
  }
  const onOptionChange = (value) => {
    dispatch({type: 'studentProblem/onFilter', payload: value})
    dispatch({type: 'studentProblem/filter', payload: value})
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'studentProblem/onFormSubmit', payload: values})
      dispatch({type: `studentProblem/${modal === 'edit' ? 'edit' : 'add'}`, payload: values})
      dispatch({type: 'studentProblem/hideModal'})
    })
  }
  const excelOut = () => {
    dispatch({type: 'studentProblem/joinedOut', payload: 'out'})
  }

  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '竞赛ID', dataIndex: 'contest_id', key: 'contest_id', width: 250},
    {title: '题目名称', dataIndex: 'title', key: 'title', width: 100},
    // {title: '选题时间', dataIndex: 'problem_start_time', key: 'problem_start_time', width: 150},
    // {title: '说明', dataIndex: 'problem_start_time', key: 'problem_end_time'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{key: 'view', name: '查看'}, {key: 'download', name: '下载'}, {key: 'choose', name: '选择'}]}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      // fixed: 'right',
      width: 100,
      key: '9'
    }
  ]
  return (
    <div className='joined-teams'>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 2000}}
        pagination={false} rowKey={record => record.id}
      />
      <Modal
        title={`${modal === 'edit' ? '编辑队伍信息' : '增加比赛队伍'}`}
        visible={studentProblem.modal === 'edit' || studentProblem.modal === 'add'}
        onCancel={() => dispatch({type: 'studentProblem/hideModal'})}
        onOk={onModalOk}
        key={studentProblem.modal}
      >
        <Form className='form-content'>
          {modal === 'add' && formConfig.map(config => FormItemRender(config, getFieldDecorator))}
          {modal === 'edit' && formConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, studentProblem}) => ({app, studentProblem}))(Form.create()(JoinedTeamsManage))
