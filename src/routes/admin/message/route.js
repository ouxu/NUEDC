/**
 * Created by out_xu on 17/7/13.
 */
import MessageModel from './model'
const MessageManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { MessageModel, MessageManage }