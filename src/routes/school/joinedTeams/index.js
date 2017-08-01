/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Alert, Button, Form, Icon, message, Modal, Select, Table, Upload } from 'antd'
import { editConfig, passConfig } from '../joinedTeams/formConfig'
import './index.less'
import { routerRedux } from 'dva/router'
import { API, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'
const confirm = Modal.confirm
const JoinedTeamsManage = ({location, app, joinedTeams, login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, table, content, modalContent, contests = [], tableCount, alert, selects = []} = joinedTeams
  const {query} = location
  const dataFlag = query.contest_id > 0
  const props = {
    name: 'file',
    action: API.schoolUploadExcel.replace(':id', query.contest_id),
    headers: {
      token: window.localStorage.getItem('nuedcToken')
    },
    showUploadList: true,
    onChange (info) {
      const {response = {}} = info.file
      const {code = 1, data = []} = response
      if (code === 0) {
        const {fail = []} = data
        if (fail.length) {
          dispatch({type: 'joinedTeams/saveSuccessExcel', payload: fail})
          dispatch({type: 'joinedTeams/showAlert'})
        } else {
          dispatch({type: 'joinedTeams/hideAlert'})
          message.success(`文件上传成功`)
        }
        dispatch(routerRedux.push(`/school/joinedTeams?` + urlEncode({...query})))
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败，稍后再试。`)
      }
    }
  }
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        const {
          contest_id,
          school_id
        } = record
        const payload = {
          ...record,
          school_id: school_id + '',
          contest_id: contest_id + ''
        }
        dispatch({type: 'joinedTeams/updateModalContent', payload: payload})
        dispatch({type: 'joinedTeams/showModal', payload: 'edit'})
        break
      case 'delete':
        confirm({
          title: '删除确认',
          content: (
            <p>确认删除队伍{record.team_name}吗？</p>
          ),
          onOk () {
            dispatch({type: 'joinedTeams/delete', payload: {record, query}})
          },
          onCancel () {}
        })
        break
      case 'audit':
        dispatch({type: 'joinedTeams/updateModalContent', payload: record})
        dispatch({type: 'joinedTeams/showModal', payload: 'audit'})
        break
      default:
        break
    }
  }
  const onAddClick = e => {
    e.preventDefault()
    let school_level = ''
    const {table: schools} = login
    const {user: {school_id = ''}} = app
    schools.forEach(item => {
      if (item.id === +school_id) {
        school_level = item.level
      }
    })
    const payload = {
      school_level,
      school_id,
      school_name: app.user.school_name,
      contest_id: query.contest_id
    }
    dispatch({type: 'joinedTeams/updateModalContent', payload: payload})
    dispatch({type: 'joinedTeams/showModal', payload: 'add'})
  }
  const pagination = {
    pageSize: +query.size || 50,
    current: +query.page || 1,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/school/joinedTeams?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/school/joinedTeams?` + urlEncode({...query, page: current})))
    },
    showTotal: () => (
      <div className='joined-teams-check'>
        <span style={{marginRight: 10}}>已选中 {selects.length} 支队伍</span>
        <Button type='primary' onClick={allChecked}>批量审核</Button>
      </div>
    )
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      let payload = {}
      if (modal === 'audit') {
        payload = {
          body: values,
          id: modalContent.id,
          query
        }
      } else {
        const {contest_id = query.contest_id, school_id, school_level, school_name} = modalContent
        payload = {
          ...values,
          contest_id,
          school_id,
          school_level,
          school_name
        }
      }
      dispatch({type: 'joinedTeams/onFormSubmit', payload: payload})
      dispatch({type: `joinedTeams/${modal}`, payload: payload})
    })
  }
  const excelOut = () => {
    dispatch({type: 'joinedTeams/joinedOut', payload: {...query, page: undefined, size: undefined}})
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let checks = selectedRows.map((item) => {
        return {
          record_id: item.id,
          record_check: '已通过'
        }
      })
      dispatch({type: 'joinedTeams/updateSelects', payload: checks})
    }
  }
  const allChecked = () => {
    confirm({
      title: '评审确认',
      content: (
        <p>确认通过选中队伍的评审吗？</p>
      ),
      onOk () {
        dispatch({type: 'joinedTeams/allChecked', payload: query})
      },
      onCancel () {}
    })
  }
  const getExcel = () => {
    dispatch({type: 'joinedTeams/downloadExcel'})
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
          <DropOption
            menuOptions={[{key: 'edit', name: '编辑'}, {key: 'audit', name: '审核'}, {key: 'delete', name: '删除'}]}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
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
        <div>
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
          <Select
            showSearch
            style={{width: 100, marginRight: 10}}
            placeholder='审核状态'
            value={query.status || undefined}
            onChange={(value) => {
              dispatch(routerRedux.push(`/school/joinedTeams?` + urlEncode({...query, status: value || undefined})))
            }}
            allowClear
          >
            <Select.Option key={'joined-result-' + 1} value='未审核'>
              未审核
            </Select.Option>
            <Select.Option key={'joined-result-' + 2} value='已通过'>
              已通过
            </Select.Option>
          </Select>
        </div>
        <div className='joined-teams-header-right'>
          <Button type='primary' onClick={onAddClick} disabled={!dataFlag} style={{marginRight: 10}}>+ 增加队伍</Button>
          <Button type='primary' onClick={excelOut} disabled={!dataFlag} style={{marginRight: 10}}>导出 Excel</Button>
          <Button type='primary' onClick={getExcel} disabled={!dataFlag} style={{marginRight: 10}}>获取导入模板</Button>

          <Upload {...props}>
            <Button disabled={!dataFlag}>
              <Icon type='upload' /> 导入 Excel
            </Button>
          </Upload>
        </div>
      </div>
      {alert && (
        <Alert
          message={(<span>以下队伍导入失败（手机号和已存在队伍重复）,请修改手机号后再导入以下队伍</span>)}
          description={(content.map((item, index) => <div key={index}><span>队伍名称:{item[0]} &nbsp; 手机号:{item[5]}</span>
          </div>))}
          type='error'
          showIcon
        />
      )}
      <div>
        <Table
          columns={columns} bordered
          dataSource={table} scroll={{x: 1200}}
          rowSelection={rowSelection}
          pagination={pagination} rowKey={record => record.id}
        />
      </div>
      <Modal
        title={`${modal === 'add' ? '增加比赛队伍' : '编辑队伍信息'}`}
        visible={!!modal}
        onCancel={() => dispatch({type: 'joinedTeams/hideModal'})}
        onOk={onModalOk}
        key={modal}
      >
        <Form className='form-content'>
          {modal === 'add' && editConfig.map(config => FormItemRender(config, getFieldDecorator))}
          {modal === 'edit' && editConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
          {modal === 'audit' && passConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent['status']})) }
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, joinedTeams, login}) => ({app, joinedTeams, login}))(Form.create()(JoinedTeamsManage))
