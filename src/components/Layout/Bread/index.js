import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import './index.less'
const Bread = () => {

  return (
    <div className="bread">
      <Breadcrumb>
        <Breadcrumb.Item key={12}>
          12321
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Application
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  menu: PropTypes.array,
}

export default Bread
