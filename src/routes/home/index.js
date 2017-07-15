import React from 'react'
import { Link } from 'dva/router'
import './index.less'
const HomePage = () => {
  return (
    <div className="home-page">
      <div className='home-content'>
        <Link to='/login'> login </Link>
        <Link to='/admin'> admin </Link>
        <Link to='/school'> school </Link>
        <Link to='/student'> student </Link>
      </div>
    </div>
  )
}

export default HomePage
