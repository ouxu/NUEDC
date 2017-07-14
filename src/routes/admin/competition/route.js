/**
 * Created by out_xu on 17/7/13.
 */
import CompetitionModal from './model'
const CompetitionManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { CompetitionModal, CompetitionManage }