/**
 * Created by Pororo on 17/7/14.
 */
import React from 'react'
import { Button, Form, Modal, Table } from 'antd'
import formConfig from './formConfig'
import './index.less'
import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'

const RecommendExpertsManage = ({recommendExperts, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {modal = false} = recommendExperts
  const onCreateClick = e => {
    e.preventDefault()
    dispatch({type: 'recommendExperts/showModal', payload: 'create'})
  }

  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: `recommendExperts/${modal === 'edit' ? 'edit' : 'create'}`, payload: values})
      dispatch({type: 'recommendExperts/hideModal'})
    })
  }

  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '赛事名称', dataIndex: 'title', key: 'title', width: 250},
    {title: '赛事状态', dataIndex: 'status', key: 'status', width: 100},
    {title: '报名', dataIndex: 'can_register', key: 'can_register', width: 50},
    {title: '选题', dataIndex: 'can_select_problem', key: 'can_select_problem', width: 50},
    {title: '报名开始时间', dataIndex: 'register_start_time', key: 'register_start_time', width: 150},
    {title: '报名结束时间', dataIndex: 'register_start_time', key: 'register_end_time', width: 150},
    {title: '选题时间', dataIndex: 'problem_start_time', key: 'problem_start_time', width: 150},
    {title: '附加', dataIndex: 'problem_start_time', key: 'problem_end_time'}
  ]

  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      title: `电子设计竞赛 ${i}`,
      description: `电子设计竞赛这里是描述！！！！ `,
      status: '未开始'
    })
  }
  return (
    <div className='recommend-experts'>
      <div className='recommend-experts-header'>
        <Button type='primary' onClick={onCreateClick}>推荐本校专家</Button>
      </div>

      <Table
        columns={columns} bordered
        dataSource={data} scroll={{x: 1500}}
        pagination={false} rowKey={record => record.id}
        expandedRowRender={record => <p>{record.description}</p>}
      />
      <Modal
        title={'推荐本校专家'}
        visible={recommendExperts.modal === 'create'}
        onCancel={() => dispatch({type: 'recommendExperts/hideModal'})}
        onOk={onModalOk}
        key={recommendExperts.modal}
      >
        <Form className='form-content'>
          {formConfig.map(config => FormItemRender(config, getFieldDecorator))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, recommendExperts}) => ({app, recommendExperts}))(Form.create()(RecommendExpertsManage))
