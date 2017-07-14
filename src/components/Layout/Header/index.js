/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Icon, Menu } from 'antd'
import { Link } from 'dva/router'
import './index.less'

const Header = ({user, dispatch, location}) => {
  let handleClickMenu = e => e.key === 'logout' && dispatch({type: 'app/logout'})
  return (
    <div className='header' id='navigation'>
      <Link to='/'>
        <div className='logo'>
          电子设计大赛
        </div>
      </Link>
      <div className='right-wrapper'>
        <Menu mode='horizontal' onClick={handleClickMenu} theme='dark'>
          <Menu.Item key='back-home'>
            <span> 首页</span>
          </Menu.Item>
          <Menu.Item key='user'>
            <span >
              <Icon type='user' />
              {user.username}
            </span>
          </Menu.Item>
          <Menu.Item key='message'>
            <Icon type='mail' />
          </Menu.Item>
          <Menu.Item key='logout'>
            <Icon type='logout' />
          </Menu.Item>

        </Menu>
      </div>
    </div>
  )
}

export default Header
