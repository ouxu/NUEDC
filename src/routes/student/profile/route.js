/**
 * Created by out_xu on 17/7/13.
 */
import StudentProfileModel from './model'
const StudentProfileManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { StudentProfileManage, StudentProfileModel }