/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Alert, Button, Form, Icon, message, Modal, Select, Table, Upload } from 'antd'
import formConfig from '../joinedTeams/formConfig'
import './index.less'
import { routerRedux } from 'dva/router'
import { API, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'
const Option = Select.Option
const confirm = Modal.confirm
const JoinedTeamsManage = ({location, joinedTeams, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, table, content, modalContent, contest = {}, tableSize, tableCount, tablePage, contestsId, alert} = joinedTeams
  const {contests = []} = contest
  const {school_team_ids = []} = modalContent
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
        confirm({
          title: '审核确认',
          content: (
            <p>确认审核队伍{record.team_name}吗？</p>
          ),
          onOk () {
            dispatch({type: 'joinedTeams/audit', payload: {query, record}})
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
      const {contest_id = query.contest_id, school_id, school_level, school_name} = modalContent
      values = {
        ...values,
        contest_id,
        school_id,
        school_level,
        school_name
      }
      dispatch({type: 'joinedTeams/onFormSubmit', payload: values})
      dispatch({type: `joinedTeams/${modal === 'edit' ? 'edit' : 'add'}`, payload: {query, values}})
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
    confirm({
      title: '评审确认',
      content: (
        <p>确认通过选中队伍的评审吗？</p>
      ),
      onOk () {
        dispatch({type: 'joinedTeams/resultUpdate'})
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
    {title: '队员1', dataIndex: 'member1', key: 'member1', width: 100},
    {title: '队员2', dataIndex: 'member2', key: 'member2', width: 100},
    {title: '队员3', dataIndex: 'member3', key: 'member3', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 100},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 170},
    {title: '联系邮箱', dataIndex: 'email', key: 'email', width: 200},
    {title: '报名状态', dataIndex: 'status', key: 'status', width: 100, fixed: 'right'},
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
        <div>
          <Select
            showSearch
            style={{width: 300, marginRight: 10}}
            placeholder='选择竞赛'
            value={query.contest_id || undefined}
            onChange={onOptionChange}
          >
            {contests.map(item => <Select.Option key={'' + item.id} value={'' + item.id}>{item.title}</Select.Option>)}
          </Select>
          <Select
            showSearch
            style={{width: 150, marginRight: 10}}
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
        </div>
        <div>
          <Button type='primary' onClick={onAddClick} style={{marginRight: 10}}>+ 增加队伍</Button>
          <Button type='primary' onClick={getExcel} style={{marginRight: 10}}>获取导入模板</Button>
          <Button type='primary' onClick={excelOut} style={{marginRight: 10}}>导出excel</Button>

          <Upload {...props}>
            <Button>
              <Icon type='upload' /> 导入Excel
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
      {
        dataFlag ? (
          <div>
            <Table
              columns={columns} bordered
              dataSource={table} scroll={{x: 1200}}
              rowSelection={rowSelection}
              pagination={pagination} rowKey={record => record.id}
            />
            <div className='joined-teams-check'>
              <span style={{marginRight: 10}}>已选中{school_team_ids.length}个</span>
              <Button type='primary' onClick={allChecked}>批量审核</Button>
            </div>
          </div>
        ) : (
          <Alert
            message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
            description={(<span>请先在下拉选单里选择竞赛</span>)}
            showIcon
          />
        )
      }
      <Modal
        title={`${modal === 'edit' ? '编辑队伍信息' : '增加比赛队伍'}`}
        visible={joinedTeams.modal === 'edit' || joinedTeams.modal === 'add'}
        onCancel={() => dispatch({type: 'joinedTeams/hideModal'})}
        onOk={onModalOk}
        key={joinedTeams.modal}
      >
        <Form className='form-content'>
          {modal === 'add' && formConfig.map(config => FormItemRender(config, getFieldDecorator))}
          {modal === 'edit' && formConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, joinedTeams}) => ({app, joinedTeams}))(Form.create()(JoinedTeamsManage))
