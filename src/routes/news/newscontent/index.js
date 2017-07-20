/**
 * Created by Pororo on 17/7/11.
 */
import React, { Component } from 'react'
import MarkDown from '../../../components/Markdown'
import './index.less'
import TweenOne from 'rc-tween-one'
import { Button, Card, Icon } from 'antd'
import NewsContentConfig from './newscontent.json'
import { Link } from 'dva/router'

class NewsPage extends Component {

  render () {
    console.log(this.props)
    const config = NewsContentConfig
    const img = '/assets/home/banner/1.jpg'
    const {title, time, content, prePassage, nextPassage, prePassageId, nextPassageId} = config
    return (
      <div>
        <div className='news-content-header' style={{
          backgroundImage: `url(${img})`
        }}>
          <TweenOne
            animation={{y: '+=30', opacity: 0, type: 'from'}}
            component='h1'
            key='h1'
            reverseDelay={200}
            className='news-content-title'
          >
            {title}
          </TweenOne>
          <TweenOne
            animation={{y: '+=30', opacity: 0, type: 'from', delay: 100}}
            component='p'
            key='p'
            reverseDelay={100}
            className='news-content-sub-title'
          >
            {time}
          </TweenOne>
        </div>
        <Card className='news-content-markdown'>
          <MarkDown content={content} />
          <div className='passage-footer'>
            <Link to={'/news/' + prePassageId}>
              <Button className='pre-passage-btn'><Icon type="arrow-left" />{prePassage}</Button>
            </Link>
            <Link to={'/news/' + nextPassageId}>
              <Button className='next-passage-btn'>{nextPassage}<Icon type="arrow-right" /></Button>
            </Link>
          </div>
        </Card>

      </div>
    )
  }
}

NewsPage.propTypes = {}
NewsPage.defaultProps = {}

export default NewsPage
