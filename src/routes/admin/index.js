/**
 * Created by out_xu on 17/7/7.
 */
import React from 'react'
import menuConfig from './config/menu.json'
import { connect } from 'dva'

import Sider from '../../components/Layout/Sider'
const AdminPage = ({children, location}) => (
  <div className='main-wrapper'>
    <sider className='sider light'>
      <Sider menuConfig={menuConfig} location={location} />
    </sider>
    <div className='main-container'>
      {children}
    </div>
  </div>
)

export default connect(({app}) => ({app}))(AdminPage)
