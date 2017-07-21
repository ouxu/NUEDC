/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Form, Modal, Select, Table, Upload, Icon, message, Alert } from 'antd'
import formConfig from '../joinedTeams/formConfig'
import './index.less'
import { routerRedux } from 'dva/router'
import { urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'

const Dragger = Upload.Dragger
const Option = Select.Option
const confirm = Modal.confirm
const JoinedTeamsManage = ({location, joinedTeams, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, table, content, modalContent, contest = {}, tableSize, tableCount, tablePage, contestsId, alert} = joinedTeams
  const {contests = []} = contest
  const {school_team_ids = []} = modalContent
  const {query} = location

  const props = {
    name: 'file',
    action: 'http://nuedc.hrsoft.net/school/admin/team/import' + `/${query.contest_id || contestsId}`,
    headers: {
      token: window.localStorage.getItem('nuedcToken')
    },
    showUploadList: false,
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
            dispatch({type: 'joinedTeams/delete', payload: record})
          },
          onCancel () {}
        })
        break
      case 'audit':
        confirm({
          title: '审核确认',
          content: (
            <p>确认审核队伍{record.team_name}吗？</p>
          ),
          onOk () {
            dispatch({type: 'joinedTeams/audit', payload: record.id})
          },
          onCancel () {}
        })
        break
      default:
        break
    }
  }
  // const onAddClick = e => {
  //   e.preventDefault()
  //   dispatch({type: 'joinedTeams/showModal', payload: 'add'})
  // }
  const pagination = {
    pageSize: +tableSize,
    current: +tablePage,
    total: +tableCount,
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/school/joinedTeams?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/school/joinedTeams?` + urlEncode({...query, page: current})))
    }
  }
  const onOptionChange = (value) => {
    dispatch(routerRedux.push(`/school/joinedTeams?` + urlEncode({...query, contest_id: value || undefined})))
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
    dispatch({type: 'joinedTeams/joinedOut', payload: {...query, page: undefined, size: undefined}})
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let selectedId = []
      selectedRows.map((item) => {
        selectedId.push(item.id)
      })
      dispatch({type: 'joinedTeams/updateModalContent', payload: {school_team_ids: selectedId}})
    }
  }
  const allChecked = () => {
    dispatch({type: 'joinedTeams/allChecked'})
  }
  const getExcel = () => {
    dispatch({type: 'joinedTeams/downloadExcel'})
  }

  const columns = [
    {title: '竞赛id', dataIndex: 'contest_id', key: 'contest_id', width: 100},
    {title: '队伍id', dataIndex: 'id', key: 'id', width: 100},
    {title: '队伍名称', dataIndex: 'team_name', key: 'team_name', width: 300},
    {title: '学校id', dataIndex: 'school_id', key: 'school_id', width: 100},
    {title: '学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 100},
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 200},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 200},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 200},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 200},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 200},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 300},
    {title: '参赛状态', dataIndex: 'status', key: 'status', width: 150, fixed: 'right'},
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
        <div className='joined-teams-select'>
          <Select
            showSearch
            style={{width: 300, marginRight: 10}}
            placeholder='竞赛名称'
            value={query.contest_id || undefined}
            onChange={onOptionChange}
          >
            {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.title}</Select.Option>)}
          </Select>
          <Select
            showSearch
            style={{width: 200, marginRight: 10}}
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
            <Select.Option key={'joined-result-' + 2} value='已审核'>
              已审核
            </Select.Option>
          </Select>
          <Button type='primary' onClick={() => dispatch(routerRedux.push('/school/joinedTeams?' + urlEncode({
            ...query,
            contest_id: undefined,
            status: undefined
          })))}>
            重置筛选</Button>
        </div>
        <Button type='primary' onClick={getExcel} style={{marginRight: 10}}>获取导入Excel模板</Button>
        <Upload {...props}>
          <Button>
            <Icon type='upload' /> 导入队伍Excel
          </Button>
        </Upload>
        <div>
          <Button type='primary' onClick={excelOut}>导出excel</Button>
          {/* <Button type='primary' onClick={onAddClick}>+ 增加比赛队伍</Button> */}
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
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 2000}}
        rowSelection={rowSelection}
        pagination={pagination} rowKey={record => record.id}
      />
      <Modal
        title={`${modal === 'edit' ? '编辑队伍信息' : '增加比赛队伍'}`}
        visible={joinedTeams.modal === 'edit' || joinedTeams.modal === 'add'}
        onCancel={() => dispatch({type: 'joinedTeams/hideModal'})}
        onOk={onModalOk}
        key={joinedTeams.modal}
      >
        <Form className='form-content'>
          {/* {modal === 'add' && formConfig.map(config => FormItemRender(config, getFieldDecorator))} */}
          {modal === 'edit' && formConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
      <div className='joined-teams-check'>
        <span style={{marginRight: 10}}>已选中{school_team_ids.length}个</span>
        <Button type='primary' onClick={allChecked}>批量审核</Button>
      </div>
    </div>
  )
}

export default connect(({app, joinedTeams}) => ({app, joinedTeams}))(Form.create()(JoinedTeamsManage))
