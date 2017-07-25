/**
 * Created by out_xu on 17/7/14.
 */
/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchTable = async (id) => request({
  url: API.getContestProblemList.replace(':id', id),
  method: 'get',
  token: true,
})

const update = async (data) => request({
  url: API.updateContestProblemSelect,
  method: 'get',
  token: true,
  data
})

export { update, fetchTable }