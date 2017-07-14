/**
 * Created by out_xu on 17/7/7.
 */
import React from 'react'
import menuConfig from './config/menu.json'
import { connect } from 'dva'
import Layout from '../../components/Layout'
const AdminPage = (props) => (
  <Layout {...props} menuConfig={menuConfig}>
    {props.children}
  </Layout>
)

export default connect(({app}) => ({app}))(AdminPage)
