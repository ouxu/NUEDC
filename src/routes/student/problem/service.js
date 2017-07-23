/**
 * Created by out_xu on 17/7/14.
 */
/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'
const fetchProblems = async (id) => request({
  url: API.getContestProblemList.replace(':id', id),
  method: 'get',
  token: true
})
export { fetchProblems }
