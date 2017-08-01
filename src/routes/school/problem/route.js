/**
 * Created by Pororo on 17/7/14.
 */
import SchoolProblemModel from './model'
const SchoolProblem = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./index'))
  })
}
export { SchoolProblem, SchoolProblemModel }
