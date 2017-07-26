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
      <TweenOne
        animation={[{blur: '3px', type: 'from'}]}
        reverseDelay={10}
        className='anim'
        key={props.location.pathname}
      >
        <div className={(props.location.pathname === '/' || props.location.pathname === '/home') ? 'no-bg' : ''}>
          <Header {...props} />
        </div>
        {props.children}
      </TweenOne>
    </div>
    <Footer />
  </div>
)

export default Layout
