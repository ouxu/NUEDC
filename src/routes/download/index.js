/**
 * Created by out_xu on 17/7/19.
 */
import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd';
class Downlaod extends Component {
  render () {
    const props = {
      name: 'upload',
      action: 'http://nuedc.hrsoft.net/file/public/upload',

      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
      </div>
    )
  }
}

Downlaod.propTypes = {}
Downlaod.defaultProps = {}

export default Downlaod
