/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Form, Modal } from 'antd'
import { connect } from 'dva'
import './index.less'
import LzEditor from 'react-lz-editor'

const {confirm} = Modal
class Test extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.receiveHtml = this.receiveHtml.bind(this)
    this.onChange = this.onChange.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
  }

  receiveHtml (content) {
    console.log('Recieved content', content)
  }

  onChange (info) {
    console.log('onChange:', info)
  }

  beforeUpload (file) {
    console.log('beforeUpload:', file)
  }

  render () {
    // uploadProps 配置方法见 https://ant.design/components/upload-cn/
    const uploadProps = {
      action: '',
      onChange: this.onChange,
      listType: 'picture',
      fileList: [''],
      data: (file) => { // 支持自定义保存文件名、扩展名支持
        console.log('uploadProps data', file)
      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    }
    return <LzEditor
      active
      importContent={this.state.content}
      cbReceiver={this.receiveHtml}
      uploadProps={uploadProps}
      fullScreen={false}
      uploadConfig={false}
      color={false}
      video={false}
      convertFormat='html'
    />
  }
}
export default connect(({app, loading, contest, login, adminNews}) => ({
  app,
  loading,
  adminNews
}))(Form.create()(Test))
