/**
 * Created by out_xu on 17/7/14.
 */
import { API, request } from '../../../utils'

const fetchJoinedTable = async (data) => request({
  url: API.joinedTeams.replace('1', `${data}`),
  method: 'get',
  token: true
})

const fetchSelectOption = async () => request({
  url: API.acquireId,
  method: 'get',
  token: true
})

const joinedExcelOut = async (data) => request({
  url: API.joinedExcelOut + data,
  method: 'get',
  token: true
})

const remove = async (data) => request({
  url: API.deleteTeam + data,
  method: 'delete',
  token: true
})

const update = async (data) => request({
  url: API.updateTeamInfo + data[1],
  method: 'put',
  token: true,
  data: data[0]
})

const audit = async (data) => request({
  url: API.checkTeam + data,
  method: 'put',
  token: true
})

const add = async (data) => request({
  url: API.addTeam,
  method: 'post',
  token: true,
  data
})

export { remove, update, add, fetchJoinedTable, audit, joinedExcelOut, fetchSelectOption }
