import React from 'react'
import { Alert, Button, Form, Icon, message, Modal, Select, Table, Upload } from 'antd'
import { connect } from 'dva'
import './index.less'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import recordConfig from './formConfig'
import { color, urlEncode } from '../../../utils'
import DropOption from '../../../components/DropOption'

const RecordingManage = ({location, recording, contest, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false, modalContent = {}, schools = [], table, tableSize, tableCount, tablePage} = recording
  const {table: tableContest = []} = contest
  const {query} = location

  const props = {
    name: 'data',
    action: 'http://nuedc.hrsoft.net/sysadmin/contest-record/import',
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
          message.success(`文件上传成功`)
        }
        dispatch({type: 'recording/fetchTable', payload: query})
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
        dispatch({type: 'recording/updateModalContent', payload: record})
        dispatch({type: 'recording/showModal', payload: 'edit'})
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
    {title: '#', dataIndex: 'id', key: 'id', width: 100},
    {title: '队名', dataIndex: 'team_name', key: 'team_name', width: 200},
    {title: '所属学校名称', dataIndex: 'school_name', key: 'school_name', width: 200},
    {title: '学校等级', dataIndex: 'school_level', key: 'school_level', width: 100},
    {title: '指导老师', dataIndex: 'teacher', key: 'teacher', width: 100},
    {title: '联系电话', dataIndex: 'contact_mobile', key: 'contact_mobile', width: 200},
    {title: '比赛结果', dataIndex: 'result', key: 'result', width: 100, fixed: 'right'},
    {title: '审核状态', dataIndex: 'result_info', key: 'result_info', width: 100, fixed: 'right'},
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
    pageSize: +tableSize || 50,
    current: +tablePage || 1,
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

  const statusArr = [
    {
      value: '未审核',
      label: '未审核',
      color: color.red
    },
    {
      value: '已审核',
      label: '已审核',
      color: color.blue
    }
  ]

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
                  contest_id: value || tableContest[tableContest.length - 1].contest_id
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

export default connect(({app, loading, contest, recording}) => ({
  app,
  loading,
  recording,
  contest
}))(Form.create()(RecordingManage))
