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

const remove = async (data) => request({
  url: API.adminContestRecordDelete,
  method: 'get',
  token: true,
  data
})

const update = async (data) => request({
  url: API.adminContestRecordsUpdate,
  method: 'post',
  token: true,
  data
})

export { remove, update, fetchTable }
