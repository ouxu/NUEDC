// /**
//  * Created by Pororo on 17/7/17.
//  */
// import React from 'react'
// import './index.less'
// import config from './formConfig.json'
// import {Form, Input, Button} from 'antd'
// import { connect } from 'dva'
//
// const FormItem = Form.Item
// const SchoolInfoManage = (getFieldDecorator) => {
//   const formItemLayout = {
//     labelCol: {
//       xs: {span: 24},
//       sm: {span: 6}
//     },
//     wrapperCol: {
//       xs: {span: 24},
//       sm: {span: 16}
//     }
//   }
//   const {rules, initialValue} = config
//   return (
//     <div>
//       <FormItem
//         label={config.label}
//         {...formItemLayout}
//         hasFeedback={config.hasFeedback || false}
//         key={config.value}
//       >
//         {getFieldDecorator(config.value, {
//           rules: [{
//             pattern: rules.pattern || false, message: rules.patternMessage || ''
//           }, {
//             required: rules.required || false, message: rules.requiredMessage || ''
//           }],
//           initialValue: initialValue || ''
//         })(
//           <Input
//             className='form-content-input'
//             placeholder={config.placeholder || ''}
//             disabled={config.disabled || false}
//             type={config.type || 'input'}
//           />
//         )}
//       </FormItem>
//       <Button>你好</Button>
//     </div>
//   )
// }
//
// export default connect(({app, schoolInfo}) => ({app, schoolInfo}))(Form.create()(SchoolInfoManage))
