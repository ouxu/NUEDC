/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import './index.less'
import Header from './Header'
import Footer from './Footer'
const Layout = (props) => (
  <div
    className='layout'>
    <div className='layout-content'>
      <Header {...props} />
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout
