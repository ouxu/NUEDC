/**
 * Created by out_xu on 17/7/13.
 */
import ChooseProblemModel from './model'
const ChooseProblemManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { ChooseProblemManage, ChooseProblemModel }