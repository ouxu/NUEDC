import React from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'

import { Link } from 'dva/router'
import './index.less'
import showItemConfig from './showItem.json'

class ShowItems extends React.Component {
  render () {
    const {showItems = [], title, subTitle} = showItemConfig
    const demoToChildren = showItems.map((item, i) => {
      const {img, id, title, content} = item

      return (
        <li key={i}>
          <Link to={'/news/' + id}>
            <div className='home-anim-demo-img'><img src={img} width='100%' /></div>
            <h2>{title}</h2>
            <div className='home-anim-demo-text'>
              <p>{content}</p>
            </div>
          </Link>
        </li>
      )
    })

    return (
      <div
        className='home-content show-items'
      >
        <QueueAnim
          className='page-text'
          key='text'
          type='bottom'
          leaveReverse
          delay={[0, 100]}
        >
          <h1 key='h1'>{title}</h1>
          <p key='p'>
            {subTitle}
          </p>
        </QueueAnim>
        <TweenOne
          animation={{y: '+=30', opacity: 0, type: 'from'}}
          key='img'
          className='home-anim-demo'
        >
          <ul>
            {demoToChildren}
          </ul>
        </TweenOne>
      </div>
    )
  }
}

export default ShowItems
