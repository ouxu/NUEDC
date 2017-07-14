import React from 'react'
import { Icon, Menu } from 'antd'
import { Link } from 'dva/router'

const {SubMenu} = Menu
const Sider = ({menuConfig, location}) => {
  const {menus = [], openKeys = []} = menuConfig
  const renderMenus = menus => (
    menus.map(item => {
      const {subMenus = []} = item
      if (subMenus.length > 0) {
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /> {item.value}</span>}>
            {renderMenus(subMenus)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key}>
          <Link to={item.key}><Icon type={item.icon} /> {item.value}</Link>
        </Menu.Item>
      )
    })
  )
  return (
    <div style={{marginTop: 10}}>
      <Menu
        mode='inline'
        defaultSelectedKeys={[menus[0].key + '']}
        defaultOpenKeys={openKeys}
        style={{height: '100%', borderRight: 0}}
      >
        {renderMenus(menus)}
      </Menu>
    </div>
  )
}

Sider.propTypes = {}
Sider.defaultProps = {}

export default Sider
