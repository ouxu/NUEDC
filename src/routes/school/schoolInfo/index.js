/**
 * Created by Pororo on 17/7/17.
 */
import React from 'react'
import { Button } from 'antd'
// import formConfig from './formConfig'
import './index.less'
// import FormItemRender from '../../../components/FormItemRender/'
import { connect } from 'dva'

const SchoolInfoManage = () => {
  return (
    <div>
      <Button>你好</Button>
    </div>
  )
}

export default connect(({app, schoolInfo}) => ({app, schoolInfo}))(SchoolInfoManage)
