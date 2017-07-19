/**
 * Created by out_xu on 17/7/19.
 */
import React, { Component } from 'react'
import ReactPDF from 'react-pdf'
class ProblemItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageIndex: 1,
      pageNumber: 2,
      total: 3
    }
  }

  onDocumentLoad ({total}) {
    this.setState({total})
  }

  onPageLoad ({pageIndex, pageNumber}) {
    this.setState({pageIndex, pageNumber})
  }

  render () {
    return (
      <div>
        <ReactPDF
          file='http://nuedc.hrsoft.net/storage/upload/d6ce673adb3132cf3a0a8f00783b64af.pdf'
          pageIndex={2}
          onDocumentLoad={this.onDocumentLoad}
          onPageLoad={this.onPageLoad}
        />
        <p>Page {this.state.pageNumber} of {this.state.total}</p>
      </div>
    )
  }
}

export default ProblemItem
