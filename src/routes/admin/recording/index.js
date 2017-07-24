import React from 'react'
import { Alert, Button, Form, Icon, message, Modal, Select, Table, Tooltip, Upload } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import recordConfig from './formConfig'
import { API, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'

const RecordingManage = ({location, recording, contest, adminContestRecord, login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, table, tableCount} = adminContestRecord

  const {table: tableContest = []} = contest
  const {query} = location
  const {table: schools = []} = login

  const props = {
    name: 'data',
    action: API.adminContestRecordExcelImport,
    headers: {
      token: window.localStorage.getItem('nuedcToken')
    },
    onChange (info) {
      const {response = {}} = info.file
      const {code = 1, data = []} = response
      if (code === 0) {
        const {fail = []} = data
        if (fail.length) {
        } else {
          dispatch({type: 'adminContestRecord/fetchTable', payload: query})
          message.success(`文件上传成功`)
          message.success('成绩已更新')
        }
        dispatch({type: 'adminContestRecord/fetchTable', payload: query})
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败，稍后再试。`)
      }
    },
    data: (file) => { // 支持自定义保存文件名、扩展名支持
      console.log('uploadProps data', file)
    }
  }
  const getExcel = () => {
    dispatch({type: 'recording/downloadExcel', payload: query})
  }
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        record.id = '' + record.id
        dispatch({type: 'adminContestRecord/updateModalContent', payload: record})
        dispatch({type: 'adminContestRecord/showModal', payload: 'edit'})
        break
      default:
        break
    }
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        const {result, result_info} = values
        const body = {
          results: [
            {
              record_id: modalContent.id,
              result,
              result_info
            }
          ]
        }
        dispatch({type: 'recording/checkRecording', payload: {body, query}})
        dispatch({type: 'recording/hideModal'})
      }
    })
  }
  const columns = [
    {title: '#', dataIndex: 'fakeId', key: 'id', width: 100},
    {title: '队名', dataIndex: 'team_name', key: 'team_name', width: 200},
    {title: '所属学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 100},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 200},
    {
      title: (
        <Tooltip title='-1 代表未选题'>
          <span> 选题情况 <Icon type="question-circle-o" /></span>
        </Tooltip>
      ),
      render: (record) => {
        if (record.problem_selected === -1) {
          return '未选题'
        } else {
          return problem_selected
        }
      },
      key: 'problem_selected',
      width: 200
    },
    {title: '比赛结果', dataIndex: 'result', key: 'result', width: 100, fixed: 'right'},
    {title: '成绩审核', dataIndex: 'result_info', key: 'result_info', width: 100, fixed: 'right'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{key: 'edit', name: '成绩录入'}]}
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
  const pagination = {
    pageSize: +query.size || 50,
    current: +query.page || 1,
    total: +tableCount,
    pageSizeOptions: ['20', '50', '100'],
    showSizeChanger: true,
    onShowSizeChange: (current, pageSize) => {
      dispatch(routerRedux.push(`/admin/recording?` + urlEncode({...query, page: current, size: pageSize})))
    },
    onChange: (current) => {
      dispatch(routerRedux.push(`/admin/recording?` + urlEncode({...query, page: current})))
    }
  }

  const dataFlag = !!JSON.stringify(query.contest_id)
  return (
    <div className='contest-record'>
      <div className='contest-record-header'>
        <div>
          <Select
            showSearch
            style={{width: 260}}
            placeholder='选择竞赛'
            onChange={(value) => {
              dispatch(routerRedux.push(`/admin/recording?` + urlEncode({
                  ...query,
                  contest_id: value || undefined
                })))
            }}
            value={query.contest_id}
          >
            {tableContest.map(item => (
              <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
            ))}
          </Select>
          <Select
            showSearch
            style={{width: 200}}
            placeholder='学校'
            onChange={(value) => {
              dispatch(routerRedux.push(`/admin/recording?` + urlEncode({...query, school_id: value || undefined})))
            }}
            allowClear
            value={query.school_id || undefined}
          >
            {schools.map(item => (
              <Select.Option key={'contest-school-' + item.id} value={item.id + ''}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button type='primary' onClick={() => dispatch(routerRedux.push('/admin/recording?' + urlEncode({
              ...query,
              contest_id: undefined,
              status: undefined,
              result: undefined,
              school_id: undefined
            })))}>
            重置筛选</Button>
        </div>
        <div>
          <Button type='primary' onClick={getExcel} disabled={!dataFlag}>获取导入模板</Button>
          <Upload {...props}>
            <Button>
              <Icon type='upload' /> 导入Excel
            </Button>
          </Upload>
        </div>
      </div>
      {
        dataFlag ? <Table
          columns={columns} bordered
          dataSource={table} scroll={{x: 1200}}
          pagination={pagination} rowKey={record => record.id}
        /> : <Alert
          message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
          description={(<span>请先在下拉选单里选择竞赛</span>)}
          showIcon
        />
      }
      <Modal
        title='录入成绩'
        visible={modal === 'edit'}
        onCancel={() => dispatch({type: 'recording/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'edit' && recordConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: modalContent[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, adminContestRecord, login, loading, contest, recording}) => ({
  app,
  adminContestRecord,
  loading,
  login,
  recording,
  contest
}))(Form.create()(RecordingManage))
