/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.adminContestRecords,
  method: 'get',
  token: true,
  data
})

const remove = async (id) => request({
  url: API.adminContestRecordDelete.replace(':id', id),
  method: 'get',
  token: true
})

const update = async (data, id) => request({
  url: API.adminContestRecordUpdate.replace(':id', id),
  method: 'post',
  token: true,
  data
})

export { remove, update, fetchTable }
