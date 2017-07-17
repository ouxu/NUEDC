/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Input, Modal, Select, Table } from 'antd'
import './index.less'
import formConfig from './formConfig'
import { connect } from 'dva'
import DropOption from '../../../components/DropOption/'
import FormItemRender from '../../../components/FormItemRender/'
const confirm = Modal.confirm
const StudentProblemManage = ({studentProfile, dispatch, form: {getFieldDecorator, validateFieldsAndScroll, fieldsValue}}) => {
  const {modal = false, table = []} = studentProfile
  console.log(studentProfile)
  const onMenuClick = (key, record) => {
    switch (key) {
      case 'edit':
        dispatch({type: 'studentProfile/updateModalContent', payload: record})
        dispatch({type: 'studentProfile/showModal', payload: 'edit'})
        break
      default:
        break
    }
  }
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {title, description, add_on, registerTimes, problemTimes} = values
      const payload = {
        title,
        description,
        add_on,
        register_start_time: registerTimes[0].format('YYYY-MM-DD HH:mm:ss'),
        register_end_time: registerTimes[1].format('YYYY-MM-DD HH:mm:ss'),
        problem_start_time: problemTimes[0].format('YYYY-MM-DD HH:mm:ss'),
        problem_end_time: problemTimes[1].format('YYYY-MM-DD HH:mm:ss')
      }
      dispatch({type: `studentProfile/${modal === 'edit' ? 'update' : 'create'}`, payload: payload})
    })
  }

  const columns = [
    {title: '序号', dataIndex: 'id', key: 'id', width: 50},
    {title: '学校', dataIndex: 'school', key: 'school', width: 200},
    {title: '队伍名称', dataIndex: 'groupName', key: 'groupName', width: 250},
    {title: '姓名', dataIndex: 'name', key: 'name', width: 100},
    {title: '手机号码', dataIndex: 'mobile', key: 'mobile', width: 150},
    {title: '专业', dataIndex: 'major', key: 'major', width: 150},
    {title: '状态', dataIndex: 'status', key: 'status', width: 150},
    {title: '指导教师', dataIndex: 'guide', key: 'guide', width: 150},
    {title: '备注', dataIndex: 'problem_start_time', key: 'problem_end_time'},
    {
      title: '操作',
      render: (record) => {
        return (
          <DropOption
            menuOptions={[{key: 'edit', name: '编辑'}]}
            buttonStyle={{border: 'solid 1px #eee', width: 60}}
            onMenuClick={({key}) => onMenuClick(key, record)}
          />
        )
      },
      fixed: 'right',
      width: 100,
      key: '9'
    }
  ]

  return (
    <div className='problem'>
      <div className='problem-header'>
        {/*<Select*/}
        {/*showSearch*/}
        {/*style={{width: 300}}*/}
        {/*placeholder='选择年份'*/}
        {/*// defaultValue={'' + table[0].id}*/}
        {/*>*/}
        {/*{table.map(item => <Select.Option key={'' + item} value={'' + item.id}>{item.title}</Select.Option>)}*/}
        {/*</Select>*/}
      </div>
      <Table
        columns={columns} bordered
        dataSource={table} scroll={{x: 1500}}
        pagination={false} rowKey={record => record.id}
        // expandedRowRender={record => (
        //   <div className='expanded-row'>
        //     <span>{record.description}</span>
        //     <span>{record.description}</span>
        //   </div>
        // )}
      />
      <Modal
        title='编辑个人信息'
        visible={modal === 'edit' || modal === 'create'}
        onCancel={() => dispatch({type: 'studentProfile/hideModal'})}
        onOk={onModalOk}
        key={modal}
      >
        <Form className='form-content'>
          {formConfig.map(config => FormItemRender(config, getFieldDecorator))}
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({app, loading, studentProfile}) => ({
  app,
  loading,
  studentProfile
}))(Form.create()(StudentProblemManage))
