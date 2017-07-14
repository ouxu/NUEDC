/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'
const remove = async (data) => request({
  url: API.deleteCompetition,
  method: 'get',
  data
})

const edit = async (data) => request({
  url: API.deleteCompetition,
  method: 'post',
  data
})

const create = async (data) => request({
  url: API.deleteCompetition,
  method: 'post',
  data
})

export { remove, edit, create }