import React from 'react'
import TweenOne from 'rc-tween-one'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import './index.less'
import { enquireScreen } from '../../utils'
import footerConfig from './footer.json'
class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isMode: false
    }
  }

  componentDidMount () {
    enquireScreen((bool) => {
      this.setState({
        isMode: bool
      })
    })
  }

  getLiChildren = (data, i) => {
    const links = data.contentLink.split(/\n/).filter(item => item)
    const content = data.content.split(/\n/).filter(item => item)
      .map((item, ii) => {
        const cItem = item.trim()
        const isImg = cItem.match(/\.(jpg|png|svg|bmp|jpeg)$/i)
        return (<li className={isImg ? 'icon' : ''} key={ii}>
          <a href={links[ii]} target='_blank'>
            {isImg ? <img src={cItem} width='100%' /> : cItem}
          </a>
        </li>)
      })
    return (<li className={data.className} key={i} id={`${this.props.id}-block${i}`}>
      <h2>{data.title}</h2>
      <ul>
        {content}
      </ul>
    </li>)
  }

  render () {
    const props = {...this.props}
    const {isMode} = this.state
    const {dataSource, logoContent} = footerConfig
    const liChildrenToRender = dataSource.map(this.getLiChildren)
    return (
      <OverPack
        {...props}
        playScale={isMode ? 0.5 : 0.2}
      >
        <QueueAnim type='bottom' component='ul' key='ul'>
          <li key='logo' id={`${props.className}-logo`}>
            <p className='logo'>
              <img src={logoContent.img} width='100%' />
            </p>
            <p>{logoContent.content}</p>
          </li>
          {liChildrenToRender}
        </QueueAnim>

        <TweenOne
          animation={{y: '+=30', opacity: 0, type: 'from'}}
          key='copyright'
          className='copyright'
          id={`${props.className}-content`}
        >
          <span>
          Copyright © 2017 The Project by <a href='#'>Ant Motion</a>. All Rights Reserved
        </span>
          <p />
        </TweenOne>
      </OverPack>
    )
  }
}

Footer.defaultProps = {
  className: 'large-footer'
}

export default Footer
