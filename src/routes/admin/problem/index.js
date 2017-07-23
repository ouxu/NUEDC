/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Alert, Button, Form, Icon, Modal, Select, Table, Upload } from 'antd'
import './index.less'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import FormItemRender from '../../../components/FormItemRender/'
import { commonConfig, extra } from './formConfig'
import { API } from '../../../utils'
const ProblemManage = ({app, dispatch, contest, location, adminProblems, form: {validateFieldsAndScroll, getFieldDecorator}}) => {
  const {query} = location
  const {contest_id = ''} = query
  const {table = [], modal, modalContent} = adminProblems
  const {table: contestTable = []} = contest
  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '题目标题', dataIndex: 'title', key: 'title', width: 250},
    {title: '附加信息', dataIndex: 'status', key: 'status'}
  ]
  const onAddClick = (e) => {
    e.preventDefault()
    dispatch({type: 'adminProblems/updateModalContent', payload: {modalTitle: '添加竞赛题目'}})
    dispatch({type: 'adminProblems/showModal', payload: 'add'})
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      console.log(values)
      dispatch({type: 'adminContestRecord/update', payload: values})
    })
  }
  const normFile = (e) => {
    return e && e.fileList
  }
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16}
    }
  }
  return (
    <div className='problem'>
      <div className='problem-header'>
        <Select
          showSearch
          style={{width: 260}}
          placeholder='选择竞赛'
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={(value) => {
            dispatch(routerRedux.push(`/admin/problem?contest_id=` + value))
          }}
          value={query.contest_id || undefined}
        >
          {contestTable.map(item => (
            <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
          ))}
        </Select>
        <Button type='primary' onClick={onAddClick}>添加题目</Button>
      </div>
      {
        contest_id.length > 0 ? (
          table.length > 0 ? (
            <Table
              columns={columns} bordered
              dataSource={table}
              pagination={false} rowKey={record => record.id}
              expandedRowRender={record => (
                <div className='expanded-row'>
                  <span>{record.content}</span>
                </div>
              )}
            />
          ) : (
            <Alert
              message={(<span>暂无题目，请添加</span>)}
              description='请点击右上角按钮添加题目'
              showIcon
            />
          )
        ) : (
          <Alert
            message={(<span>暂未选择竞赛，请先选择竞赛</span>)}
            description='请先在下拉选单中选择竞赛'
            showIcon
          />
        )
      }
      <Modal
        title={modalContent.modalTitle}
        visible={modal === 'add'}
        onCancel={() => dispatch({type: 'adminProblems/hideModal'})}
        onOk={onModalOk}
        key={'' + modal}
      >
        <Form className='form-content'>
          {modal === 'add' && commonConfig.map(config => FormItemRender(config, getFieldDecorator, {
            initialValue: modalContent[config.value] || '' + ''
          }))}
          <Form.Item
            {...formItemLayout}
            label='Upload'
            extra='附件上传，用于上传题目相关的附件或者pdf，一道题仅能上传一个附件，请勿上传多个'
          >
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: normFile
            })(
              <Upload
                name='upload' action={API.uploadPrivateFile}
                headers={{'token': window.localStorage.getItem('nuedcToken')}}
              >
                <Button>
                  <Icon type='upload' /> 点击上传附件
                </Button>
              </Upload>
            )}
          </Form.Item>
          {modal === 'add' && FormItemRender(extra, getFieldDecorator, {
            initialValue: modalContent[extra.value] || '' + ''
          })}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, contest, adminProblems}) => ({app, contest, adminProblems}))(Form.create()(ProblemManage))
