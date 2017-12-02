/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Icon, Input, Modal, Upload } from 'antd'
import { connect } from 'dva'
import './index.less'
import { API } from '../../../../utils'
import Editor from 'react-pell/plugins/markdown'
import '../../../../components/Markdown/index.less'
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

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = ({fileList}) => {
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url
      }
      return file
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
    const {location, dispatch, adminNewsEdit} = this.props
    const {pathname, query} = location
    const {previewVisible, previewImage,} = this.state

    const {content, input, modal} = adminNewsEdit
    const uploadProps = {
      action: API.filePublic,
      name: 'upload',
      listType: 'picture-card',
      headers: {
        'token': window.localStorage.getItem('nuedcToken')
      },
      onChange: this.handleChange,
      onPreview: this.handlePreview
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
            Modal.confirm({
              title: `上传文件`,
              content: (
                <Upload {...uploadProps}>
                  {fileList.length === 1 ? null : (
                    <div>
                      <Icon type='plus' />
                      <div className='ant-upload-text'>Upload</div>
                    </div>
                  )}
                </Upload>
              ),
              okText: '复制',
              onOk () {
                // const url = window.prompt('请输入图片 URL')
                const url = 'http://nuedc.hrsoft.net/storage/upload/093025a8340d8e30b0e536b843de94e7.jpeg'

                if (url) pell.exec('insertImage', ensureHTTP(url))
              },
              onCancel () {}
            })
            // const url = window.prompt('请输入图片 URL')
            //
            // if (url) pell.exec('insertImage', ensureHTTP(url))
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
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{width: '100%'}} src={previewImage} />
        </Modal>
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
