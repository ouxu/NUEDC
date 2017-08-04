/**
 * Created by out_xu on 17/7/13.
 */
import React from 'react'
import { Button, Form, Icon, Input, Modal, Upload } from 'antd'
import { connect } from 'dva'
import './index.less'
import LzEditor from 'react-lz-editor'
import { config,API } from '../../../../utils'
const {confirm} = Modal
class Edit extends React.Component {
  constructor (props) {
    super(props)
    this.receiveHtml = this.receiveHtml.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  receiveHtml (content) {
    this.props.dispatch({type: 'adminNewsEdit/contentChange', payload: content})
  }

  onChange (info) {
    let currFileList = info.fileList

    currFileList = currFileList.filter((f) => (!f.length))
    let url = config.baseURL
    //读取远程路径并显示链接
    currFileList = currFileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = url + file.response.url
      }
      if (!file.length) {
        return file
      }
    })
    let _this = this
    //按照服务器返回信息筛选成功上传的文件
    currFileList = currFileList.filter((file) => {
      //根据多选选项更新添加内容

      if (!!_this.props.isMultiple == true) {
        _this.state.responseList.push(file)
      } else {
        _this.state.responseList = [file]
      }
      return !!file.response || (!!file.url && file.status == 'done') || file.status == 'uploading'
    })
    currFileList = uniqBy(currFileList, 'name')
    if (!!currFileList && currFileList.length != 0) {
      // console.log("upload set files as fileList", currFileList);
      this.setState({responseList: currFileList})
    }
    _this.forceUpdate()
  }

  render () {
    const uploadConfig = {}
    const {location, dispatch} = this.props
    const {pathname, query} = location
    const {content, input} = this.props.adminNewsEdit
    const uploadProps = {
      action: API.filePublic,
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

            <Button type='primary' onClick={() => dispatch({
              type: 'adminNewsEdit/update',
              payload: {pathname: pathname, id: query.id}
            })}>发布</Button>
          </div>
        </div>
        <Input
          placeholder='请输入标题'
          style={{marginBottom: 10}}
          onChange={(e) => dispatch({type: 'adminNewsEdit/onInputChange', payload: e.target.value})}
          value={input}
        />

        <LzEditor
          active={false}
          importContent={content}
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
export default connect(({app, loading, contest, login, adminNewsEdit}) => ({
  app,
  loading,
  adminNewsEdit
}))(Form.create()(Edit))
