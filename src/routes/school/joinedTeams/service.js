/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchJoinedTable = async (data) => request({
  url: API.schoolJoinedTeams,
  method: 'get',
  token: true,
  data
})

const fetchSelectOption = async () => request({
  url: API.schoolAcquireId,
  method: 'get',
  token: true
})

const joinedExcelOut = async ({filename}, id) => request({
  url: API.schoolJoinedExcelOut + id,
  method: 'export',
  token: true,
  filename
})

const remove = async (data) => request({
  url: API.schoolDeleteTeam + data,
  method: 'delete',
  token: true
})

const update = async (data) => request({
  url: API.schoolUpdateTeamInfo + data[1],
  method: 'put',
  token: true,
  data: data[0]
})

const audit = async (data) => request({
  url: API.schoolCheckTeam + data,
  method: 'put',
  token: true
})

const add = async (data) => request({
  url: API.schoolAddTeam,
  method: 'post',
  token: true,
  data
})

const allChecked = async (data) => request({
  url: API.schoolChecked,
  method: 'put',
  token: true,
  data
})

export { remove, update, add, fetchJoinedTable, audit, joinedExcelOut, fetchSelectOption, allChecked }
