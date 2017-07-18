/**
 * Created by Pororo on 17/7/7.
 */
import React, { Component } from 'react'
import './index.less'
import ShowItems from './ShowItems'
class News extends Component {
  render () {
    return (
      <div className='news-wrapper'>
        {this.props.children ||
        <div className='newsCard'>
          <div className='news-content'>
            <ShowItems />
          </div>
        </div>
        }
      </div>
    )
  }
}

News.propTypes = {}
News.defaultProps = {}

export default News
