/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import './index.less'
import Header from './Header'
import Footer from './Footer'
import TweenOne from 'rc-tween-one'
const Layout = (props) => (
  <div
    className='layout'>
    <div className='layout-content'>
      <Header {...props} />
      <TweenOne
        animation={[{blur: '3px', type: 'from'}]}
        reverseDelay={10}
        className='anim'
        key={props.location.pathname}
      >
        {props.children}
      </TweenOne>
    </div>
    <Footer />
  </div>
)

export default Layout
