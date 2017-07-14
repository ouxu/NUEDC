/**
 * Created by out_xu on 17/7/13.
 */
import CompetitionModel from './model'
const CompetitionManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { CompetitionModel, CompetitionManage }