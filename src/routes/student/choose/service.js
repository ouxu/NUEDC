/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchProblemTable = async (data) => request({
  url: API.deleteCompetition,
  method: 'get',
  token: true,
  data
})
const remove = async (data, id) => request({
  url: API.adminContestDelete.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const update = async (data, id) => request({
  url: API.adminContestUpdate.replace(':id', id),
  method: 'post',
  token: true,
  data
})

const create = async (data) => request({
  url: API.adminContestCreate,
  method: 'post',
  token: true,
  data
})

export { remove, update, create, fetchProblemTable }