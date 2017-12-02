/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Icon, Input, message, Modal, Upload } from 'antd'
import { connect } from 'dva'
import './index.less'
import { API } from '../../../../utils'
import Editor from 'react-pell/plugins/markdown'
import '../../../../components/Markdown/index.less'
import copy from 'copy-to-clipboard'
const {confirm} = Modal

class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }

  receiveHtml = (content) => {
    this.props.dispatch({type: 'adminNewsEdit/contentChange', payload: content})
  }

  onChange (info) {
    let currFileList = info.fileList

    currFileList = currFileList.filter((f) => (!f.length))
    // 读取远程路径并显示链接
    currFileList = currFileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = file.response.url
      }
      if (!file.length) {
        return file
      }
    })
  }

  showInfo = () => {
    Modal.info({
      title: `图片文件上传说明`,
      content: (
        <div>
          先点击左上方的 上传文件 按钮，将附件或者图片上传到资源服务器，上传成功后将出现文件列表。
          <br />
          <br />
          点击文件列表中的文件将会出现链接复制确认框，点击确认复制后内容将复制到系统剪切板。
          <br />
          <br />
          图片上传：图片上传后点击编辑器图片按钮，在弹出框将链接粘贴后回车确认，图片将插入文章。
          <br />
          <br />
          附件上传：附件能以链接形式附加在文本上，选中文本后，点击编辑器链接按钮，按说明填写好内容，链接将插入文章。
        </div>
      )
    })
  }

  render () {
    const {location, dispatch} = this.props
    const {pathname, query} = location
    const {content, input, modal} = this.props.adminNewsEdit
    const uploadProps = {
      action: API.filePublic,
      name: 'upload',
      headers: {
        'token': window.localStorage.getItem('nuedcToken')
      },
      onChange: this.onChange,
      multiple: true,
      onPreview: (file) => {
        Modal.confirm({
          title: `复制文件链接`,
          content: (
            <div style={{wordBreak: 'break-all'}}>
              将文件在服务器的链接复制到剪切板，用于插入图片和附件，具体使用说明请点击查看上传说明
              <br />
              {file.url}
            </div>
          ),
          okText: '复制',
          onOk () {
            copy(file.url)
            message.success('复制成功')
          },
          onCancel () {}
        })
      }
    }
    const ensureHTTP = (str) => {
      return /^https?:\/\//.test(str) && str || `http://${str}`
    }
    const editorProps = {
      containerClass: 'new-edit-container markdown-body',
      defaultContent: content,
      actions: [
        'bold', 'italic', 'underline', 'strikethrough', 'heading1', 'heading2', 'olist', 'ulist', 'quote',
        {
          name: 'image',
          result: (pell) => {
            const url = window.prompt('请输入图片 URL')
            if (url) pell.exec('insertImage', ensureHTTP(url))
          }
        },
        {
          name: 'link',
          result: async (pell) => {
            const url = window.prompt('请输入文件 URL')
            if (url) pell.exec('createLink', ensureHTTP(url))
          }
        }
      ],
      onChange: this.receiveHtml
    }
    return (
      <div className='news-manage' key={query.id + 'news'}>
        <div className='news-manage-header'>
          <Upload {...uploadProps}>
            <Button>
              <Icon type='upload' /> 上传文件
            </Button>
          </Upload>
          <Button type='primary' onClick={this.showInfo}>
            查看图片文件上传说明
          </Button>

          <Button type='primary' onClick={() => dispatch({
            type: 'adminNewsEdit/update',
            payload: {pathname: pathname, id: query.id}
          })}>发布</Button>
        </div>
        <Input
          placeholder='请输入标题'
          style={{marginBottom: 10}}
          onChange={(e) => dispatch({type: 'adminNewsEdit/onInputChange', payload: e.target.value})}
          value={input}
        />
        {(content.length > 0 || !query.id) && (
          <Editor {...editorProps} />
        )}
        <Modal
          title='修改队伍信息'
          visible={!!modal}
          onCancel={() => dispatch({type: 'adminNewsEdit/hideModal'})}
          footer={null}
          key={'' + modal}
        >
          <Upload {...uploadProps}>
            <Button>
              <Icon type='upload' /> 上传文件
            </Button>
          </Upload>
        </Modal>
      </div>
    )
  }
}
export default connect(({app, loading, contest, login, adminNewsEdit}) => ({
  app,
  loading,
  adminNewsEdit
}))(Form.create()(Edit))
