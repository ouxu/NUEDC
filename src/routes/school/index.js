import React from 'react'
import menuConfig from './config/menu.json'
import { connect } from 'dva'
import Layout from '../../components/Layout'
const SchoolPage = (props) => (
  <Layout {...props} menuConfig={menuConfig}>
    {props.children}
  </Layout>
)

export default connect(({app}) => ({app}))(SchoolPage)
