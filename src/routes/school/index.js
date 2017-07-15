import React from 'react'
import menuConfig from './config/menu.json'
import Sider from '../../components/Layout/Sider'

import { connect } from 'dva'
const SchoolPage = (props) => (
  <div className='main-wrapper'>
    <sider className='sider light'>
      <Sider menuConfig={menuConfig} location={location} />
    </sider>
    <div className='main-container'>
      {props.children}
    </div>
  </div>
)

export default connect(({app}) => ({app}))(SchoolPage)
