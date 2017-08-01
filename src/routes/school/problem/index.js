/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Alert, Form, Modal, Select, Table } from 'antd'
import { editConfig } from '../joinedTeams/formConfig'
import './index.less'
import { routerRedux } from 'dva/router'
import { urlEncode } from '../../../utils'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'
const SchoolProblem = ({location, schoolProblem, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, table, content, modalContent, contests = [], tableCount, alert, status = '未审核'} = schoolProblem
  const {query} = location
  const onMenuClick = (record) => {
    dispatch({type: 'schoolProblem/showModal'})
    console.log(record)
  }
  const pagination = {
    pageSize: +query.size || 50,
    current: +query.page || 1,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/school/problem?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/school/problem?` + urlEncode({...query, page: current})))
    }
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      let payload = values
      dispatch({type: 'joinedTeams/onFormSubmit', payload: payload})
      dispatch({type: `joinedTeams/${modal}`, payload: payload})
    })
  }
  const onClickCheck = () => {
    const payload = {
      ...status,
      modalTitle: '修改本校选题审核状态'
    }
    dispatch({type: 'adminContestRecord/updateModalContent', payload: payload})
    dispatch({type: 'adminContestRecord/showModal', payload: 'resultCheck'})
  }

  const columns = [
    {title: '#', dataIndex: 'fakeId', key: 'id', width: 50},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 200},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 80},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 80},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 80},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 200},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 150},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '报名状态', dataIndex: 'status', key: 'status', width: 80, fixed: 'right'},
    {
      title: '操作',
      render: (record) => {
        return (
          <a onClick={() => onMenuClick(record)}>
            编辑
          </a>
        )
      },
      width: 80,
      fixed: 'right',
      key: 'edit'
    }
  ]
  return (
    <div className='joined-teams'>
      <div className='joined-teams-header'>
        <Select
          showSearch
          style={{width: 250, marginRight: 10}}
          placeholder='选择竞赛'
          value={query.contest_id || undefined}
          onChange={(value) => dispatch(routerRedux.push(`/school/joinedTeams?` + urlEncode({
              ...query, contest_id: value
            })))}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.title}</Select.Option>)}
        </Select>
        <span> </span>
      </div>
      <div>
        <Alert
          message={(<span>本校选题审核情况：{status}</span>)}
          description={(<span><a onClick={onClickCheck}>点击修改</a> 本校选题审核情况，修改为审核通过后，本校学生将无法修改选题，也可不修改，保持系统默认</span>)}
          showIcon
        />
        <Table
          columns={columns} bordered
          dataSource={table} scroll={{x: 1200}}
          pagination={pagination} rowKey={record => record.id}
        />
      </div>
      <Modal
        title={modalContent.modalTitle || '编辑队伍选题'}
        visible={!!modal}
        onCancel={() => dispatch({type: 'schoolProblem/hideModal'})}
        onOk={onModalOk}
        key={modal}
      >
        <Form className='form-content'>
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({schoolProblem}) => ({schoolProblem}))(Form.create()(SchoolProblem))
