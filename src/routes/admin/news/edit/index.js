/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Icon, message, Modal, Select, Upload } from 'antd'
import { connect } from 'dva'
import './index.less'
import LzEditor from 'react-lz-editor'
import { routerRedux } from 'dva/router'

const {confirm} = Modal
class Test extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      copied: false
    }
    this.receiveHtml = this.receiveHtml.bind(this)
    this.onChange = this.onChange.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }

  receiveHtml (content) {
    console.log('Recieved content', content)
  }

  onChange (info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  beforeUpload (file) {
    console.log('beforeUpload:', file)
  }

  render () {
    const uploadConfig = {}
    const {location: {query}, dispatch} = this.props
    const uploadProps = {
      action: 'http://nuedc.hrsoft.net/file/public/upload',
      name: 'upload',
      headers: {
        'token': window.localStorage.getItem('nuedcToken')
      },
      onChange: this.onChange,
      multiple: true,
      data: (file) => { // 支持自定义保存文件名、扩展名支持
        console.log('uploadProps data', file)
      },
      onPreview: (file) => {
        document.execCommand('Copy')
      }
    }
    // TODO 上传文件后复制
    return (
      <div className='news-manage'>
        <div className='news-manage-header'>
          <div>
            <Upload {...uploadProps}>
              <Button>
                <Icon type='upload' /> 上传文件
              </Button>
            </Upload>
          </div>
          <div>
            <Select
              showSearch
              style={{width: 100}}
              onChange={(value) => dispatch(routerRedux.push(`/admin/news/edit?type=` + value))}
              value={query.type || 'news'}
            >
              <Select.Option key='news-select-news' value='news'>新闻管理</Select.Option>
              <Select.Option key='news-select-news' value='notices'>通知管理</Select.Option>
            </Select>
            <Button type='primary' onClick={() => document.execCommand('Copy',true,'1231')}>发布新闻</Button>
          </div>
        </div>
        <LzEditor
          active
          importContent={this.state.content}
          cbReceiver={this.receiveHtml}
          uploadProps={uploadProps}
          fullScreen={false}
          uploadConfig={uploadConfig}
          color={false}
          video={false}
          audio={false}
          convertFormat='html'
        />
      </div>
    )
  }
}
export default connect(({app, loading, contest, login, adminNews}) => ({
  app,
  loading,
  adminNews
}))(Form.create()(Test))
