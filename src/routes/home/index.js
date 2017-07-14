import React, { Component } from 'react'
import {Link} from 'dva/router'
class index extends Component {
  render () {
    return (
      <div style={{display: "flex",justifyContent: "space-around",marginTop: "20vh"}}>
        <Link to="/login"> login </Link>
        <Link to="/admin"> admin </Link>
        <Link to="/school"> school </Link>
        <Link to="/student"> student </Link>
      </div>
    )
  }
}

index.propTypes = {}
index.defaultProps = {}

export default index
