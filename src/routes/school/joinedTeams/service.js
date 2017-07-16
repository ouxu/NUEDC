/**
 * Created by Pororo on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchTable = async (data) => request({
  url: API.deleteCompetition,
  method: 'get',
  data
})
const remove = async (data) => request({
  url: API.deleteCompetition,
  method: 'get',
  data
})

const update = async (data) => request({
  url: API.deleteCompetition,
  method: 'post',
  data
})

const add = async (data) => request({
  url: API.deleteCompetition,
  method: 'post',
  data
})

export { remove, update, add, fetchTable }
