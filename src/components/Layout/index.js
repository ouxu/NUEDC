/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import './index.less'
import Sider from './Sider'
import Header from './Header'
import Footer from './Footer'

const Layout = ({menuConfig, children, app, dispatch, location}) => (
  <div
    className='layout'>
    <Header {...app} dispatch={dispatch} />
    <aside className='sider light'>
      <Sider menuConfig={menuConfig} location={location} />
    </aside>
    <div className='main'>
      {/* <Bread location={location} /> */}
      <div className='container'>
        <div className='content'>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  </div>
)

Layout.propTypes = {}
Layout.defaultProps = {}

export default Layout
