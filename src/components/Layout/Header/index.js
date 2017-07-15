/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Icon, Menu, Tooltip,Modal } from 'antd'
import { Link } from 'dva/router'
import './index.less'

const Header = ({user, dispatch, location}) => {
  let handleClickMenu = e => {
    if(e.key === 'logout') {
      Modal.confirm({
        title: '登出确认',
        content: '是否登出？登出后下次进入需要重新登录',
        onOk() {
          dispatch({type: 'login/logout'})
        },
        onCancel() {},
      });

    }
  }
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
            <Tooltip title='登出'>
              <Icon type='logout' />
            </Tooltip>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  )
}

export default Header
