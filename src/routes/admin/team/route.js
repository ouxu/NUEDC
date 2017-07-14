/**
 * Created by out_xu on 17/7/13.
 */
import TeamModel from './model'
const TeamManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { TeamManage, TeamModel }